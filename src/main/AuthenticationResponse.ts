import { JWTHeader } from 'did-jwt';
import { JWK } from 'jose';

import AuthenticationRequest from './AuthenticationRequest';
//import { createDiscoveryMetadataPayload } from './AuthenticationResponseRegistration';
//import { PresentationExchange } from './PresentationExchange';
import {
  getIssuerDidFromPayload,
  getNonce,
  getPublicJWKFromHexPrivateKey,
  getResolver,
  getState,
  getThumbprint,
  parseJWT,
  signDidJwtPayload,
  validateLinkedDomainWithDid,
  verifyDidJWT,
  verifyRevocation,
} from './functions';
import {
  AuthenticationResponseOpts,
  AuthenticationResponsePayload,
  AuthenticationResponseWithJWT,
  CheckLinkedDomain,
  isExternalSignature,
  isExternalVerification,
  isInternalSignature,
  isInternalVerification,
  isSuppliedSignature,
  JWTPayload,
  //PresentationDefinitionWithLocation,
  PresentationLocation,
  ResponseIss,
  RevocationVerification,
  SIOPErrors,
  //SubjectIdentifierType,
  SubjectSyntaxTypesSupportedValues,
  VerifiablePresentationPayload,
  VerifiedAuthenticationRequestWithJWT,
  VerifiedAuthenticationResponseWithJWT,
  VerifyAuthenticationRequestOpts,
  VerifyAuthenticationResponseOpts,
} from './types';

export default class AuthenticationResponse {
  /**
   * Creates a SIOP Response Object
   *
   * @param requestJwt
   * @param responseOpts
   * @param verifyOpts
   */
  static async createJWTFromRequestJWT(
    requestJwt: string,
    responseOpts: AuthenticationResponseOpts,
    verifyOpts: VerifyAuthenticationRequestOpts
  ): Promise<AuthenticationResponseWithJWT> {
    assertValidResponseOpts(responseOpts);
    if (!requestJwt || !requestJwt.startsWith('ey')) {
      throw new Error(SIOPErrors.NO_JWT);
    }
    const verifiedJWT = await AuthenticationRequest.verifyJWT(requestJwt, verifyOpts);
    return AuthenticationResponse.createJWTFromVerifiedRequest(verifiedJWT, responseOpts);
  }

  // TODO SK Can you please put some documentation on it?
  static async createJWTFromVerifiedRequest(
    verifiedJwt: VerifiedAuthenticationRequestWithJWT,
    responseOpts: AuthenticationResponseOpts
  ): Promise<AuthenticationResponseWithJWT | any> {
    const payload = await createSIOPResponsePayload(verifiedJwt, responseOpts);
    //await assertValidVerifiablePresentations(verifiedJwt.presentationDefinitions, payload);
    const jwt = await signDidJwtPayload(payload, responseOpts);
    const vp_token = await signDidJwtPayload({
      iss: responseOpts.did,
      aud: verifiedJwt.payload.client_id,
      nonce: verifiedJwt.payload.nonce,
      vp: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation'],
          verifiableCredential: responseOpts.vp[0].presentation.verifiableCredential,
      },
    }, {
        signatureType: responseOpts.signatureType,
    });
    return {
      jwt,
      state: verifiedJwt.payload.state,
      nonce: payload.nonce,
      payload,
      responseOpts,
      url: verifiedJwt.payload.redirect_uri,
      vp_token,
    };

    // todo add uri generation support in separate method, like in the AuthRequest class

    /*if (isInternalSignature(responseOpts.signatureType)) {
                                                    return DIDJwt.signDidJwtInternal(payload, ResponseIss.SELF_ISSUED_V2, responseOpts.signatureType.hexPrivateKey, responseOpts.signatureType.kid);
                                                } else if (isExternalSignature(responseOpts.signatureType)) {
                                                    return DIDJwt.signDidJwtExternal(payload, responseOpts.signatureType.signatureUri, responseOpts.signatureType.authZToken, responseOpts.signatureType.kid);
                                                } else {
                                                    throw new Error("INVALID_SIGNATURE_TYPE");
                                                }*/
    /*const params = `id_token=${JWT}`;
                                                const uriResponse = {
                                                    encodedUri: "",
                                                    bodyEncoded: "",
                                                    encodingFormat: UrlEncodingFormat.FORM_URL_ENCODED,
                                                    responseMode: didAuthResponseCall.responseMode
                                                        ? didAuthResponseCall.responseMode
                                                        : ResponseMode.FRAGMENT, // FRAGMENT is the default
                                                };

                                                if (didAuthResponseCall.responseMode === ResponseMode.FORM_POST) {
                                                    uriResponse.encodedUri = encodeURI(didAuthResponseCall.redirectUri);
                                                    uriResponse.bodyEncoded = encodeURI(params);
                                                } else if (didAuthResponseCall.responseMode === ResponseMode.QUERY) {
                                                    uriResponse.encodedUri = encodeURI(`${didAuthResponseCall.redirectUri}?${params}`);
                                                } else {
                                                    uriResponse.responseMode = ResponseMode.FRAGMENT;
                                                    uriResponse.encodedUri = encodeURI(`${didAuthResponseCall.redirectUri}#${params}`);
                                                }
                                                return uriResponse;*/
  }

  /**
   * Verifies a SIOP ID Response JWT on the RP Side
   *
   * @param jwt ID token to be validated
   * @param verifyOpts
   */
  static async verifyJWT(jwt: string, verifyOpts: VerifyAuthenticationResponseOpts): Promise<VerifiedAuthenticationResponseWithJWT> {
    if (!jwt) {
      throw new Error(SIOPErrors.NO_JWT);
    }
    assertValidVerifyOpts(verifyOpts);

    const { header, payload } = parseJWT(jwt);
    assertValidResponseJWT({ header, payload });

    const verifiedJWT = await verifyDidJWT(jwt, getResolver(verifyOpts.verification.resolveOpts), {
      audience: verifyOpts.audience,
    });

    const issuerDid = getIssuerDidFromPayload(payload, header);
    if (verifyOpts.verification.checkLinkedDomain && verifyOpts.verification.checkLinkedDomain !== CheckLinkedDomain.NEVER) {
      await validateLinkedDomainWithDid(issuerDid, verifyOpts.verifyCallback, verifyOpts.verification.checkLinkedDomain);
    } else if (!verifyOpts.verification.checkLinkedDomain) {
      await validateLinkedDomainWithDid(issuerDid, verifyOpts.verifyCallback, CheckLinkedDomain.IF_PRESENT);
    }
    const verPayload = verifiedJWT.payload as AuthenticationResponsePayload;
    assertValidResponseJWT({ header, verPayload: verPayload, audience: verifyOpts.audience });
    
    // FIXME: comment this part until we figure out how to validate vp_token (see https://identity.foundation/jwt-vc-presentation-profile/#structure-of-authentication-response)
    //await assertValidVerifiablePresentations(verifyOpts?.claims?.presentationDefinitions, verPayload);

    const revocationVerification = verifyOpts.verification.revocationOpts
      ? verifyOpts.verification.revocationOpts.revocationVerification
      : RevocationVerification.IF_PRESENT;
    if (revocationVerification !== RevocationVerification.NEVER) {
      await verifyRevocation(verPayload.vp_token, verifyOpts.verification.revocationOpts.revocationVerificationCallback, revocationVerification);
    }

    return {
      signer: verifiedJWT.signer,
      didResolutionResult: verifiedJWT.didResolutionResult,
      jwt,
      verifyOpts,
      issuer: issuerDid,
      payload: {
        ...verPayload,
      },
    };
  }
}

function assertValidResponseJWT(opts: { header: JWTHeader; payload?: JWTPayload; verPayload?: AuthenticationResponsePayload; audience?: string }) {
  if (!opts.header) {
    throw new Error(SIOPErrors.BAD_PARAMS);
  }
  if (opts.payload) {
    if (opts.payload.iss !== ResponseIss.SELF_ISSUED_V2 && opts.payload.iss !== ResponseIss.SELF_ISSUED_V2_OIDC_VC) {
      throw new Error(`${SIOPErrors.NO_SELFISSUED_ISS}, got: ${opts.payload.iss}`);
    }
  }

  if (opts.verPayload) {
    if (!opts.verPayload.nonce) {
      throw Error(SIOPErrors.NO_NONCE);
    } else if (!opts.verPayload.sub_type && opts.verPayload.iss !== ResponseIss.SELF_ISSUED_V2_OIDC_VC) {
      throw Error(SIOPErrors.NO_SUB_TYPE);
    } else if (!opts.verPayload.exp || opts.verPayload.exp < Date.now() / 1000) {
      throw Error(SIOPErrors.EXPIRED);
      /*} else if (!opts.verPayload.iat || opts.verPayload.iat > (Date.now() / 1000)) {
                  throw Error(SIOPErrors.EXPIRED);*/
      // todo: Add iat check
    }
    if ((opts.verPayload.aud && !opts.audience) || (!opts.verPayload.aud && opts.audience)) {
      throw Error(SIOPErrors.BAD_PARAMS);
    } else if (opts.audience && opts.audience != opts.verPayload.aud) {
      throw Error(SIOPErrors.INVALID_AUDIENCE);
    }
  }
}

async function createThumbprintAndJWK(resOpts: AuthenticationResponseOpts): Promise<{ thumbprint: string; subJwk: JWK }> {
  let thumbprint;
  let subJwk;
  if (isInternalSignature(resOpts.signatureType)) {
    thumbprint = await getThumbprint(resOpts.signatureType.hexPrivateKey, resOpts.did);
    subJwk = getPublicJWKFromHexPrivateKey(
      resOpts.signatureType.hexPrivateKey,
      resOpts.signatureType.kid || `${resOpts.signatureType.did}#key-1`,
      resOpts.did
    );
    /*  } else if (isExternalSignature(resOpts.signatureType)) {
                    const didDocument = await fetchDidDocument(resOpts.registration.registrationBy.referenceUri as string);
                    if (!didDocument.verificationMethod || didDocument.verificationMethod.length == 0) {
                      throw Error(SIOPErrors.VERIFY_BAD_PARAMS);
                    }
                    thumbprint = getThumbprintFromJwk(didDocument.verificationMethod[0].publicKeyJwk as JWK, resOpts.did);
                    subJwk = didDocument.verificationMethod[0].publicKeyJwk as JWK;*/
  } else if (isSuppliedSignature(resOpts.signatureType)) {
    // fixme: These are uninitialized. Probably we have to extend the supplied signature to provide these.
    return { thumbprint, subJwk };
  } else {
    throw new Error(SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
  }
  return { thumbprint, subJwk };
}

function extractPresentations(resOpts: AuthenticationResponseOpts) {
  const presentationPayloads =
    resOpts.vp && resOpts.vp.length > 0
      ? resOpts.vp
          .filter((vp) => vp.location === PresentationLocation.ID_TOKEN)
          .map<VerifiablePresentationPayload>((vp) => vp as VerifiablePresentationPayload)
      : undefined;
  const vp_tokens =
    resOpts.vp && resOpts.vp.length > 0
      ? resOpts.vp
          .filter((vp) => vp.location === PresentationLocation.VP_TOKEN)
          .map<VerifiablePresentationPayload>((vp) => vp as VerifiablePresentationPayload)
      : undefined;
  let vp_token;
  if (vp_tokens) {
    if (vp_tokens.length == 1) {
      vp_token = vp_tokens[0];
    } else if (vp_tokens.length > 1) {
      throw new Error(SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
    }
  }
  const verifiable_presentations = presentationPayloads && presentationPayloads.length > 0 ? presentationPayloads : undefined;
  return {
    verifiable_presentations,
    vp_token,
  };
}

async function createSIOPResponsePayload(
  verifiedJwt: VerifiedAuthenticationRequestWithJWT,
  resOpts: AuthenticationResponseOpts
): Promise<AuthenticationResponsePayload | any> {
  assertValidResponseOpts(resOpts);
  if (!verifiedJwt || !verifiedJwt.jwt) {
    throw new Error(SIOPErrors.VERIFY_BAD_PARAMS);
  }
  const supportedDidMethods = verifiedJwt.payload.registration?.subject_syntax_types_supported?.filter((sst) =>
    sst.includes(SubjectSyntaxTypesSupportedValues.DID.valueOf())
  );

  const state = resOpts.state || getState(verifiedJwt.payload.state);
  const nonce = verifiedJwt.payload.nonce || resOpts.nonce || getNonce(state);
  //const registration = createDiscoveryMetadataPayload(resOpts.registration);

  //https://sphereon.atlassian.net/browse/VDX-140
  // *********************************************************************************
  // todo We are missing a wrapper object. Actually the current object is the id_token
  // *********************************************************************************

  const { /*verifiable_presentations, */vp_token } = extractPresentations(resOpts);
  const presentation_submission = {
    ...vp_token.presentation.presentation_submission,
    descriptor_map: [{
        path: '$',
        id: vp_token.presentation.presentation_submission.descriptor_map[0].id,
        format: 'jwt_vp',
        path_nested: {
            path: '$.verifiableCredential[0]',
            id: vp_token.presentation.presentation_submission.descriptor_map[0].id,
            format: 'jwt_vc',
        }
    }],
};
  const authenticationResponsePayload = {
    iss: ResponseIss.SELF_ISSUED_V2_OIDC_VC,
    sub: resOpts.did,
    //aud: verifiedJwt.payload.redirect_uri,
    aud: verifiedJwt.payload.client_id,
    //did: resOpts.did,
    //sub_type: supportedDidMethods.length && resOpts.did ? SubjectIdentifierType.DID : SubjectIdentifierType.JKT,
    //state,
    nonce,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + (resOpts.expiresIn || 600)),
    //registration,
    //vp_token,
    _vp_token: { presentation_submission },
    //verifiable_presentations,
    sub_jwk: undefined,
  };
  if (supportedDidMethods.indexOf(SubjectSyntaxTypesSupportedValues.JWK_THUMBPRINT) != -1 && !resOpts.did) {
    const { thumbprint, subJwk } = await createThumbprintAndJWK(resOpts);
    authenticationResponsePayload.sub_jwk = subJwk;
    authenticationResponsePayload.sub = thumbprint;
  }
  return authenticationResponsePayload;
}

function assertValidResponseOpts(opts: AuthenticationResponseOpts) {
  if (!opts /*|| !opts.redirectUri*/ || !opts.signatureType /*|| !opts.nonce*/ || !opts.did) {
    throw new Error(SIOPErrors.BAD_PARAMS);
  } else if (!(isInternalSignature(opts.signatureType) || isExternalSignature(opts.signatureType) || isSuppliedSignature(opts.signatureType))) {
    throw new Error(SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
  }
}

function assertValidVerifyOpts(opts: VerifyAuthenticationResponseOpts) {
  if (!opts || !opts.verification || (!isExternalVerification(opts.verification) && !isInternalVerification(opts.verification))) {
    throw new Error(SIOPErrors.VERIFY_BAD_PARAMS);
  }
}

// async function assertValidVerifiablePresentations(definitions: PresentationDefinitionWithLocation[], verPayload: AuthenticationResponsePayload) {
//   if ((!definitions || definitions.length == 0) && !verPayload) {
//     return;
//   }

//   // const definitions: PresentationDefinitionWithLocation[] = verifyOpts?.claims?.presentationDefinitions;
//   PresentationExchange.assertValidPresentationDefinitionWithLocations(definitions);
//   let presentationPayloads: VerifiablePresentationPayload[];

//   if (verPayload.verifiable_presentations && verPayload.verifiable_presentations.length > 0) {
//     presentationPayloads = verPayload.verifiable_presentations;
//   }
//   if (verPayload.vp_token) {
//     if (!presentationPayloads) {
//       presentationPayloads = [verPayload.vp_token];
//     } else {
//       presentationPayloads.push(verPayload.vp_token);
//     }
//   }

//   /*console.log('pd:', JSON.stringify(definitions));
//   console.log('vps:', JSON.stringify(presentationPayloads));*/
//   if (definitions && definitions.length && !presentationPayloads) {
//     throw new Error(SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
//   } else if (!definitions && presentationPayloads) {
//     throw new Error(SIOPErrors.AUTH_REQUEST_DOESNT_EXPECT_VP);
//   } else if (definitions && presentationPayloads && definitions.length != presentationPayloads.length) {
//     throw new Error(SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
//   } else if (definitions && presentationPayloads) {
//     await PresentationExchange.validatePayloadsAgainstDefinitions(definitions, presentationPayloads);
//   }
// }
