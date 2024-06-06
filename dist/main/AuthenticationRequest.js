"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pex_1 = require("@sphereon/pex");
const ajv_1 = __importDefault(require("ajv"));
const AuthenticationRequestRegistration_1 = require("./AuthenticationRequestRegistration");
const PresentationExchange_1 = require("./PresentationExchange");
const functions_1 = require("./functions");
const SIOPVersionDiscovery_1 = require("./functions/SIOPVersionDiscovery");
const schemas_1 = require("./schemas");
const types_1 = require("./types");
const ajv = new ajv_1.default({ allowUnionTypes: true });
const validateRPRegistrationMetadata = ajv.compile(schemas_1.RPRegistrationMetadataPayloadSchema);
class AuthenticationRequest {
    /**
     * Create a signed URL encoded URI with a signed SIOP request token on RP side
     *
     * @param opts Request input data to build a  SIOP Request Token
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
     *
     * Normally you will want to use this method to create the request.
     */
    static createURI(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { jwt, payload } = yield AuthenticationRequest.createJWT(opts);
            return createURIFromJWT(opts, payload, jwt);
        });
    }
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param uri
     */
    static parseURI(uri) {
        // We strip the uri scheme before passing it to the decode function
        return (0, functions_1.decodeUriAsJson)(uri.replace(/^.*:\/\/\?/, ''));
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
    static createJWT(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const siopRequestPayload = yield createAuthenticationRequestPayload(opts);
            const { nonce, state } = siopRequestPayload;
            const jwt = yield (0, functions_1.signDidJwtPayload)(siopRequestPayload, opts);
            return {
                jwt,
                nonce,
                state,
                payload: siopRequestPayload,
                opts: opts,
            };
        });
    }
    static wrapAsURI(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield createURIFromJWT(request.opts, request.payload, request.jwt);
        });
    }
    /**
     * Verifies a SIOP Request JWT on OP side
     *
     * @param jwt
     * @param opts
     */
    static verifyJWT(jwt, opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            assertValidVerifyOpts(opts);
            if (!jwt) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const { header, payload } = (0, functions_1.parseJWT)(jwt);
            assertValidRequestJWT(header, payload);
            const options = {
                audience: (0, functions_1.getAudience)(jwt),
            };
            const verPayload = payload;
            const version = (0, SIOPVersionDiscovery_1.authenticationRequestVersionDiscovery)(verPayload);
            if (!((_a = opts.verification.supportedVersions) === null || _a === void 0 ? void 0 : _a.includes(version))) {
                throw new Error(types_1.SIOPErrors.SIOP_VERSION_NOT_SUPPORTED);
            }
            if (opts.nonce && verPayload.nonce !== opts.nonce) {
                throw new Error(`${types_1.SIOPErrors.BAD_NONCE} payload: ${payload.nonce}, supplied: ${opts.nonce}`);
            }
            AuthenticationRequest.assertValidRequestObject(verPayload);
            const registrationMetadata = yield AuthenticationRequest.getRegistrationObj(verPayload['registration_uri'], verPayload['registration']);
            AuthenticationRequest.assertValidRegistrationObject(registrationMetadata);
            const verifiedJWT = yield (0, functions_1.verifyDidJWT)(jwt, (0, functions_1.getResolver)(opts.verification.resolveOpts), options);
            if (!verifiedJWT || !verifiedJWT.payload) {
                throw Error(types_1.SIOPErrors.ERROR_VERIFYING_SIGNATURE);
            }
            if (verPayload.client_id.startsWith('did:')) {
                if (opts.verification.checkLinkedDomain && opts.verification.checkLinkedDomain != types_1.CheckLinkedDomain.NEVER) {
                    yield (0, functions_1.validateLinkedDomainWithDid)(verPayload.client_id, opts.verifyCallback, opts.verification.checkLinkedDomain, opts.verification.resolveOpts);
                }
                else if (!opts.verification.checkLinkedDomain) {
                    yield (0, functions_1.validateLinkedDomainWithDid)(verPayload.client_id, opts.verifyCallback, types_1.CheckLinkedDomain.IF_PRESENT, opts.verification.resolveOpts);
                }
            }
            const presentationDefinitions = yield PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(payload);
            return Object.assign(Object.assign({}, verifiedJWT), { verifyOpts: opts, presentationDefinitions, payload: verifiedJWT.payload });
        });
    }
    static assertValidRegistrationObject(regObj) {
        if (regObj && !validateRPRegistrationMetadata(regObj)) {
            throw new Error('Registration data validation error: ' + JSON.stringify(validateRPRegistrationMetadata.errors));
        }
        else if ((regObj === null || regObj === void 0 ? void 0 : regObj.subject_syntax_types_supported) && regObj.subject_syntax_types_supported.length == 0) {
            throw new Error(`${types_1.SIOPErrors.VERIFY_BAD_PARAMS}`);
        }
    }
    static assertValidRequestObject(verPayload) {
        if (verPayload['registration_uri'] && verPayload['registration']) {
            throw new Error(`${types_1.SIOPErrors.REG_OBJ_N_REG_URI_CANT_BE_SET_SIMULTANEOUSLY}`);
        }
    }
    static getRegistrationObj(registrationUri, registrationObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = registrationObject;
            if (registrationUri) {
                try {
                    response = (yield (0, functions_1.getWithUrl)(registrationUri));
                }
                catch (e) {
                    throw new Error(`${types_1.SIOPErrors.REG_PASS_BY_REFERENCE_INCORRECTLY}`);
                }
            }
            return response;
        });
    }
}
exports.default = AuthenticationRequest;
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
function createURIFromJWT(requestOpts, requestPayload, jwt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const schema = 'openid://';
        // Only used to validate if it contains a definition
        yield PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(requestPayload);
        const query = (0, functions_1.encodeJsonAsURI)(requestPayload);
        AuthenticationRequest.assertValidRequestObject(requestPayload);
        const registrationMetadata = yield AuthenticationRequest.getRegistrationObj(requestPayload['registration_uri'], requestPayload['registration']);
        AuthenticationRequest.assertValidRegistrationObject(registrationMetadata);
        switch ((_a = requestOpts.requestBy) === null || _a === void 0 ? void 0 : _a.type) {
            case types_1.PassBy.REFERENCE:
                return {
                    encodedUri: `${schema}?${query}&request_uri=${encodeURIComponent(requestOpts.requestBy.referenceUri)}`,
                    encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                    requestOpts,
                    requestPayload,
                    jwt,
                };
            case types_1.PassBy.VALUE:
                return {
                    encodedUri: `${schema}?${query}&request=${jwt}`,
                    encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                    requestOpts,
                    requestPayload,
                    jwt,
                };
        }
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertValidRequestJWT(_header, _payload) {
    /*console.log(_header);
      console.log(_payload);*/
}
function assertValidVerifyOpts(opts) {
    if (!opts || !opts.verification || (!(0, types_1.isExternalVerification)(opts.verification) && !(0, types_1.isInternalVerification)(opts.verification))) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
}
function assertValidRequestOpts(opts) {
    if (!opts || !opts.redirectUri) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (!opts.requestBy) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (opts.requestBy.type !== types_1.PassBy.REFERENCE && opts.requestBy.type !== types_1.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.requestBy.type === types_1.PassBy.REFERENCE && !opts.requestBy.referenceUri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
    (0, AuthenticationRequestRegistration_1.assertValidRequestRegistrationOpts)(opts['registration']);
}
function createClaimsPayload(opts) {
    if (!opts || !opts.vpToken || (!opts.vpToken.presentationDefinition && !opts.vpToken.presentationDefinitionUri)) {
        return undefined;
    }
    const pex = new pex_1.PEX();
    const discoveryResult = pex.definitionVersionDiscovery(opts.vpToken.presentationDefinition);
    if (discoveryResult.error) {
        throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
    }
    return Object.assign(Object.assign({}, (opts.idToken ? { id_token: opts.idToken } : {})), (opts.vpToken.presentationDefinition || opts.vpToken.presentationDefinitionUri
        ? {
            vp_token: Object.assign(Object.assign({}, (opts.vpToken.presentationDefinition ? { presentation_definition: opts.vpToken.presentationDefinition } : {})), (opts.vpToken.presentationDefinitionUri ? { presentation_definition_uri: opts.vpToken.presentationDefinitionUri } : {})),
        }
        : {}));
}
function createAuthenticationRequestPayload(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        assertValidRequestOpts(opts);
        const state = (0, functions_1.getState)(opts.state);
        const registration = yield (0, AuthenticationRequestRegistration_1.createRequestRegistration)(opts['registration']);
        const claims = createClaimsPayload(opts.claims);
        const clientId = registration.requestRegistrationPayload.registration.client_id;
        return Object.assign(Object.assign({ response_type: types_1.ResponseType.ID_TOKEN, scope: types_1.Scope.OPENID, 
            //TODO implement /.well-known/openid-federation support in the OP side to resolve the client_id (URL) and retrieve the metadata
            client_id: clientId ? clientId : opts.signatureType.did, redirect_uri: opts.redirectUri, response_mode: opts.responseMode || types_1.ResponseMode.POST, id_token_hint: opts.idTokenHint, registration_uri: opts['registrationUri'], request: opts.request, request_uri: opts.requestUri, nonce: (0, functions_1.getNonce)(state, opts.nonce), state }, registration.requestRegistrationPayload), { claims });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vQXV0aGVudGljYXRpb25SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW9DO0FBQ3BDLDhDQUFzQjtBQUd0QiwyRkFBb0g7QUFDcEgsaUVBQThEO0FBQzlELDJDQVlxQjtBQUNyQiwyRUFBeUY7QUFDekYsdUNBQWdFO0FBQ2hFLG1DQW9CaUI7QUFFakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMvQyxNQUFNLDhCQUE4QixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsNkNBQW1DLENBQUMsQ0FBQztBQUV4RixNQUFxQixxQkFBcUI7SUFDeEM7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQU8sU0FBUyxDQUFDLElBQStCOztZQUNwRCxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0scUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFXO1FBQ3pCLG1FQUFtRTtRQUNuRSxPQUFPLElBQUEsMkJBQWUsRUFBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBaUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFPLFNBQVMsQ0FBQyxJQUErQjs7WUFDcEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFF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