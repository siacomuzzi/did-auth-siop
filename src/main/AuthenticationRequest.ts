import { PEX } from '@sphereon/pex';
import Ajv from 'ajv';
import { JWTHeader } from 'did-jwt';

import { assertValidRequestRegistrationOpts, createRequestRegistration } from './AuthenticationRequestRegistration';
import { PresentationExchange } from './PresentationExchange';
import {
  decodeUriAsJson,
  encodeJsonAsURI,
  getAudience,
  getNonce,
  getResolver,
  getState,
  getWithUrl,
  parseJWT,
  signDidJwtPayload,
  validateLinkedDomainWithDid,
  verifyDidJWT,
} from './functions';
import { authenticationRequestVersionDiscovery } from './functions/SIOPVersionDiscovery';
import { RPRegistrationMetadataPayloadSchema } from './schemas';
import {
  AuthenticationRequestOpts,
  AuthenticationRequestPayload,
  AuthenticationRequestURI,
  AuthenticationRequestWithJWT,
  CheckLinkedDomain,
  ClaimOpts,
  ClaimPayload,
  isExternalVerification,
  isInternalVerification,
  JWTPayload,
  PassBy,
  ResponseMode,
  ResponseType,
  RPRegistrationMetadataPayload,
  Scope,
  SIOPErrors,
  UrlEncodingFormat,
  VerifiedAuthenticationRequestWithJWT,
  VerifyAuthenticationRequestOpts,
} from './types';

const ajv = new Ajv({ allowUnionTypes: true });
const validateRPRegistrationMetadata = ajv.compile(RPRegistrationMetadataPayloadSchema);

export default class AuthenticationRequest {
  /**
   * Create a signed URL encoded URI with a signed SIOP request token on RP side
   *
   * @param opts Request input data to build a  SIOP Request Token
   * @remarks This method is used to generate a SIOP request with info provided by the RP.
   * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
   *
   * Normally you will want to use this method to create the request.
   */
  static async createURI(opts: AuthenticationRequestOpts): Promise<AuthenticationRequestURI> {
    const { jwt, payload } = await AuthenticationRequest.createJWT(opts);
    return createURIFromJWT(opts, payload, jwt);
  }

  /**
   * Create a Authentication Request Payload from a URI string
   *
   * @param uri
   */
  static parseURI(uri: string): AuthenticationRequestPayload {
    // We strip the uri scheme before passing it to the decode function
    return decodeUriAsJson(uri.replace(/^.*:\/\/\?/, '')) as AuthenticationRequestPayload;
  }

  /**
   * Create a signed SIOP request as JWT on RP side, typically you will want to use the createURI version!
   *
   * @param opts Request input data to build a SIOP Request as JWT
   * @remarks This method is used to generate a SIOP request with info provided by the RP.
   * First it generates the request payload and then it creates the signed JWT.
   *
   * Normally you will want to use the createURI version. That creates a URI that includes the JWT from this method in the URI
   * If you do use this method, you can call the wrapInUri afterwards to get the URI
   */
  static async createJWT(opts: AuthenticationRequestOpts): Promise<AuthenticationRequestWithJWT> {
    const siopRequestPayload = await createAuthenticationRequestPayload(opts);
    const { nonce, state } = siopRequestPayload;
    const jwt = await signDidJwtPayload(siopRequestPayload, opts);

    return {
      jwt,
      nonce,
      state,
      payload: siopRequestPayload,
      opts: opts,
    };
  }

  static async wrapAsURI(request: AuthenticationRequestWithJWT): Promise<AuthenticationRequestURI> {
    return await createURIFromJWT(request.opts, request.payload, request.jwt);
  }

  /**
   * Verifies a SIOP Request JWT on OP side
   *
   * @param jwt
   * @param opts
   */
  static async verifyJWT(jwt: string, opts: VerifyAuthenticationRequestOpts): Promise<VerifiedAuthenticationRequestWithJWT> {
    assertValidVerifyOpts(opts);
    if (!jwt) {
      throw new Error(SIOPErrors.NO_JWT);
    }

    const { header, payload } = parseJWT(jwt);
    assertValidRequestJWT(header, payload);

    const options = {
      audience: getAudience(jwt),
    };

    const verPayload = payload as AuthenticationRequestPayload;
    const version = authenticationRequestVersionDiscovery(verPayload);
    if (!opts.verification.supportedVersions?.includes(version)) {
      throw new Error(SIOPErrors.SIOP_VERSION_NOT_SUPPORTED);
    }
    if (opts.nonce && verPayload.nonce !== opts.nonce) {
      throw new Error(`${SIOPErrors.BAD_NONCE} payload: ${payload.nonce}, supplied: ${opts.nonce}`);
    }

    AuthenticationRequest.assertValidRequestObject(verPayload);
    const registrationMetadata = await AuthenticationRequest.getRegistrationObj(verPayload['registration_uri'], verPayload['registration']);
    AuthenticationRequest.assertValidRegistrationObject(registrationMetadata);

    const verifiedJWT = await verifyDidJWT(jwt, getResolver(opts.verification.resolveOpts), options);
    if (!verifiedJWT || !verifiedJWT.payload) {
      throw Error(SIOPErrors.ERROR_VERIFYING_SIGNATURE);
    }
    if (verPayload.client_id.startsWith('did:')) {
      if (opts.verification.checkLinkedDomain && opts.verification.checkLinkedDomain != CheckLinkedDomain.NEVER) {
        await validateLinkedDomainWithDid(verPayload.client_id, opts.verifyCallback, opts.verification.checkLinkedDomain);
      } else if (!opts.verification.checkLinkedDomain) {
        await validateLinkedDomainWithDid(verPayload.client_id, opts.verifyCallback, CheckLinkedDomain.IF_PRESENT);
      }
    }
    const presentationDefinitions = await PresentationExchange.findValidPresentationDefinitions(payload);
    return {
      ...verifiedJWT,
      verifyOpts: opts,
      presentationDefinitions,
      payload: verifiedJWT.payload as AuthenticationRequestPayload,
    };
  }

  public static assertValidRegistrationObject(regObj: RPRegistrationMetadataPayload) {
    if (regObj && !validateRPRegistrationMetadata(regObj)) {
      throw new Error('Registration data validation error: ' + JSON.stringify(validateRPRegistrationMetadata.errors));
    } else if (regObj?.subject_syntax_types_supported && regObj.subject_syntax_types_supported.length == 0) {
      throw new Error(`${SIOPErrors.VERIFY_BAD_PARAMS}`);
    }
  }

  public static assertValidRequestObject(verPayload: AuthenticationRequestPayload): void {
    if (verPayload['registration_uri'] && verPayload['registration']) {
      throw new Error(`${SIOPErrors.REG_OBJ_N_REG_URI_CANT_BE_SET_SIMULTANEOUSLY}`);
    }
  }

  public static async getRegistrationObj(
    registrationUri: string,
    registrationObject: RPRegistrationMetadataPayload
  ): Promise<RPRegistrationMetadataPayload> {
    let response: RPRegistrationMetadataPayload = registrationObject;
    if (registrationUri) {
      try {
        response = (await getWithUrl(registrationUri)) as unknown as RPRegistrationMetadataPayload;
      } catch (e) {
        throw new Error(`${SIOPErrors.REG_PASS_BY_REFERENCE_INCORRECTLY}`);
      }
    }

    return response;
  }
}

/***************************************
 *
 * Helper functions are down below
 *
 ***************************************/

/**
 * Creates an URI Request
 * @param requestOpts Options to define the Uri Request
 * @param requestPayload
 * @param jwt
 * @param requestPayload
 * @param jwt
 */
async function createURIFromJWT(
  requestOpts: AuthenticationRequestOpts,
  requestPayload: AuthenticationRequestPayload,
  jwt: string
): Promise<AuthenticationRequestURI> {
  const schema = 'openid://';
  // Only used to validate if it contains a definition
  await PresentationExchange.findValidPresentationDefinitions(requestPayload);
  const query = encodeJsonAsURI(requestPayload);

  AuthenticationRequest.assertValidRequestObject(requestPayload);
  const registrationMetadata = await AuthenticationRequest.getRegistrationObj(requestPayload['registration_uri'], requestPayload['registration']);
  AuthenticationRequest.assertValidRegistrationObject(registrationMetadata);
  switch (requestOpts.requestBy?.type) {
    case PassBy.REFERENCE:
      return {
        encodedUri: `${schema}?${query}&request_uri=${encodeURIComponent(requestOpts.requestBy.referenceUri)}`,
        encodingFormat: UrlEncodingFormat.FORM_URL_ENCODED,
        requestOpts,
        requestPayload,
        jwt,
      };
    case PassBy.VALUE:
      return {
        encodedUri: `${schema}?${query}&request=${jwt}`,
        encodingFormat: UrlEncodingFormat.FORM_URL_ENCODED,
        requestOpts,
        requestPayload,
        jwt,
      };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertValidRequestJWT(_header: JWTHeader, _payload: JWTPayload) {
  /*console.log(_header);
    console.log(_payload);*/
}

function assertValidVerifyOpts(opts: VerifyAuthenticationRequestOpts) {
  if (!opts || !opts.verification || (!isExternalVerification(opts.verification) && !isInternalVerification(opts.verification))) {
    throw new Error(SIOPErrors.VERIFY_BAD_PARAMS);
  }
}

function assertValidRequestOpts(opts: AuthenticationRequestOpts) {
  if (!opts || !opts.redirectUri) {
    throw new Error(SIOPErrors.BAD_PARAMS);
  } else if (!opts.requestBy) {
    throw new Error(SIOPErrors.BAD_PARAMS);
  } else if (opts.requestBy.type !== PassBy.REFERENCE && opts.requestBy.type !== PassBy.VALUE) {
    throw new Error(SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
  } else if (opts.requestBy.type === PassBy.REFERENCE && !opts.requestBy.referenceUri) {
    throw new Error(SIOPErrors.NO_REFERENCE_URI);
  }
  assertValidRequestRegistrationOpts(opts['registration']);
}

function createClaimsPayload(opts: ClaimOpts): ClaimPayload {
  if (!opts || !opts.vpToken || (!opts.vpToken.presentationDefinition && !opts.vpToken.presentationDefinitionUri)) {
    return undefined;
  }
  const pex: PEX = new PEX();
  const discoveryResult = pex.definitionVersionDiscovery(opts.vpToken.presentationDefinition);
  if (discoveryResult.error) {
    throw new Error(SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
  }

  return {
    ...(opts.idToken ? { id_token: opts.idToken } : {}),
    ...(opts.vpToken.presentationDefinition || opts.vpToken.presentationDefinitionUri
      ? {
          vp_token: {
            ...(opts.vpToken.presentationDefinition ? { presentation_definition: opts.vpToken.presentationDefinition } : {}),
            ...(opts.vpToken.presentationDefinitionUri ? { presentation_definition_uri: opts.vpToken.presentationDefinitionUri } : {}),
          },
        }
      : {}),
  };
}

async function createAuthenticationRequestPayload(opts: AuthenticationRequestOpts): Promise<AuthenticationRequestPayload> {
  assertValidRequestOpts(opts);
  const state = getState(opts.state);
  const registration = await createRequestRegistration(opts['registration']);
  const claims = createClaimsPayload(opts.claims);
  const clientId = registration.requestRegistrationPayload.registration.client_id;
  return {
    response_type: ResponseType.ID_TOKEN,
    scope: Scope.OPENID,
    //TODO implement /.well-known/openid-federation support in the OP side to resolve the client_id (URL) and retrieve the metadata
    client_id: clientId ? clientId : opts.signatureType.did,
    redirect_uri: opts.redirectUri,
    response_mode: opts.responseMode || ResponseMode.POST,
    id_token_hint: opts.idTokenHint,
    registration_uri: opts['registrationUri'],
    request: opts.request,
    request_uri: opts.requestUri,
    nonce: getNonce(state, opts.nonce),
    state,
    ...registration.requestRegistrationPayload,
    claims,
  };
}
