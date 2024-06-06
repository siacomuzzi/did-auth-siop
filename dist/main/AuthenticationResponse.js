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
const AuthenticationRequest_1 = __importDefault(require("./AuthenticationRequest"));
const PresentationExchange_1 = require("./PresentationExchange");
const functions_1 = require("./functions");
const types_1 = require("./types");
class AuthenticationResponse {
    /**
     * Creates a SIOP Response Object
     *
     * @param requestJwt
     * @param responseOpts
     * @param verifyOpts
     */
    static createJWTFromRequestJWT(requestJwt, responseOpts, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            assertValidResponseOpts(responseOpts);
            if (!requestJwt || !requestJwt.startsWith('ey')) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const verifiedJWT = yield AuthenticationRequest_1.default.verifyJWT(requestJwt, verifyOpts);
            return AuthenticationResponse.createAuthenticationResponseFromVerifiedRequest(verifiedJWT, responseOpts);
        });
    }
    // TODO SK Can you please put some documentation on it?
    static createAuthenticationResponseFromVerifiedRequest(verifiedJwt, responseOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield createSIOPResponsePayload(verifiedJwt, responseOpts);
            // review: add presentation_submission as part of `id_token._vp_token`
            const presentation = Array.isArray(payload.vp_token) ? payload.vp_token[0].presentation : payload.vp_token.presentation;
            if (!responseOpts._vp_token && presentation && presentation.presentation_submission) {
                responseOpts._vp_token = { presentation_submission: presentation.presentation_submission };
            }
            const idToken = yield createSIOPIDToken(verifiedJwt, responseOpts);
            payload.id_token = yield (0, functions_1.signDidJwtPayload)(idToken, responseOpts);
            yield assertValidVerifiablePresentations({
                definitions: verifiedJwt.presentationDefinitions,
                vps: payload.vp_token,
                presentationVerificationCallback: responseOpts.presentationVerificationCallback,
            });
            // review: generate jwt vp token
            const vpTokenPayload = {
                nonce: idToken.nonce,
                aud: idToken.aud,
                iss: responseOpts.did,
                iat: Date.now() / 1000,
                exp: Date.now() / 1000 + (responseOpts.expiresIn || 600),
                vp: {
                    '@context': ['https://www.w3.org/2018/credentials/v1'],
                    type: ['VerifiablePresentation'],
                    verifiableCredential: presentation.verifiableCredential,
                }
            };
            if (!(0, types_1.isInternalSignature)(responseOpts.signatureType)) {
                throw new Error('missing internal singature');
            }
            const vpTokenJwt = yield (0, functions_1.signDidJwtInternal)(vpTokenPayload, responseOpts.signatureType.did, responseOpts.signatureType.hexPrivateKey, responseOpts.signatureType.kid);
            return {
                redirectUri: verifiedJwt.payload.redirect_uri,
                jwt: payload.id_token,
                vpTokenJwt,
                state: payload.state,
                nonce: idToken.nonce,
                idToken,
                payload,
                responseOpts,
            };
            // todo add uri generation support in separate method, like in the AuthRequest class
        });
    }
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param jwt ID token to be validated
     * @param verifyOpts
     */
    static verifyJWT(jwt, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!jwt) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            assertValidVerifyOpts(verifyOpts);
            const { header, payload } = (0, functions_1.parseJWT)(jwt);
            assertValidResponseJWT({ header, payload });
            const verifiedJWT = yield (0, functions_1.verifyDidJWT)(jwt, (0, functions_1.getResolver)(verifyOpts.verification.resolveOpts), {
                audience: verifyOpts.audience,
            });
            if (payload.sub !== verifiedJWT.didResolutionResult.didDocument.id) {
                throw new Error('The ID Token sub claim must be equal to the value of the id property in the DID Document');
            }
            const issuerDid = (0, functions_1.getSubDidFromPayload)(payload);
            if (verifyOpts.verification.checkLinkedDomain && verifyOpts.verification.checkLinkedDomain !== types_1.CheckLinkedDomain.NEVER) {
                yield (0, functions_1.validateLinkedDomainWithDid)(issuerDid, verifyOpts.verifyCallback, verifyOpts.verification.checkLinkedDomain, verifyOpts.verification.resolveOpts);
            }
            else if (!verifyOpts.verification.checkLinkedDomain) {
                yield (0, functions_1.validateLinkedDomainWithDid)(issuerDid, verifyOpts.verifyCallback, types_1.CheckLinkedDomain.IF_PRESENT, verifyOpts.verification.resolveOpts);
            }
            const verPayload = verifiedJWT.payload;
            assertValidResponseJWT({ header, verPayload: verPayload, audience: verifyOpts.audience });
            // Enforces verifyPresentationCallback function on the RP side,
            if (!(verifyOpts === null || verifyOpts === void 0 ? void 0 : verifyOpts.presentationVerificationCallback)) {
                throw new Error(types_1.SIOPErrors.VERIFIABLE_PRESENTATION_VERIFICATION_FUNCTION_MISSING);
            }
            return {
                signer: verifiedJWT.signer,
                didResolutionResult: verifiedJWT.didResolutionResult,
                jwt,
                verifyOpts,
                issuer: issuerDid,
                payload: Object.assign({}, verPayload),
            };
        });
    }
    static verifyVPs(payload, verifyOpts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield assertValidVerifiablePresentations({
                definitions: [{ definition: (_a = verifyOpts === null || verifyOpts === void 0 ? void 0 : verifyOpts.claims.vpToken) === null || _a === void 0 ? void 0 : _a.presentationDefinition, location: types_1.PresentationLocation.VP_TOKEN }],
                vps: payload.vp_token,
                presentationVerificationCallback: verifyOpts === null || verifyOpts === void 0 ? void 0 : verifyOpts.presentationVerificationCallback,
            });
            const revocationVerification = verifyOpts.verification.revocationOpts
                ? verifyOpts.verification.revocationOpts.revocationVerification
                : types_1.RevocationVerification.IF_PRESENT;
            if (revocationVerification !== types_1.RevocationVerification.NEVER) {
                if (Array.isArray(payload.vp_token)) {
                    payload.vp_token.forEach((p) => __awaiter(this, void 0, void 0, function* () { return yield (0, functions_1.verifyRevocation)(p, verifyOpts.verification.revocationOpts.revocationVerificationCallback, revocationVerification); }));
                }
                else {
                    yield (0, functions_1.verifyRevocation)(payload.vp_token, verifyOpts.verification.revocationOpts.revocationVerificationCallback, revocationVerification);
                }
            }
        });
    }
}
exports.default = AuthenticationResponse;
function assertValidResponseJWT(opts) {
    var _a;
    if (!opts.header) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    if (opts.payload) {
        if (opts.payload.iss !== types_1.ResponseIss.SELF_ISSUED_V2 && opts.payload.iss !== types_1.ResponseIss.SELF_ISSUED_V2_VC_INTEROP) {
            throw new Error(`${types_1.SIOPErrors.NO_SELFISSUED_ISS}, got: ${opts.payload.iss}`);
        }
        if (opts.payload.sub !== opts.header.kid.split('#')[0]) {
            throw new Error('DID value in the ID Token kid and sub claims must exactly match');
        }
    }
    if (opts.verPayload) {
        if (!opts.verPayload.nonce) {
            throw Error(types_1.SIOPErrors.NO_NONCE);
        }
        else if (!opts.verPayload.exp || opts.verPayload.exp < Date.now() / 1000) {
            throw Error(types_1.SIOPErrors.EXPIRED);
            /*} else if (!opts.verPayload.iat || opts.verPayload.iat > (Date.now() / 1000)) {
                              throw Error(SIOPErrors.EXPIRED);*/
            // todo: Add iat check
        }
        if ((opts.verPayload.aud && !opts.audience) || (!opts.verPayload.aud && opts.audience)) {
            throw Error(types_1.SIOPErrors.BAD_PARAMS);
        }
        else if (opts.audience && opts.audience != opts.verPayload.aud) {
            throw Error(types_1.SIOPErrors.INVALID_AUDIENCE);
        }
        if (!((_a = opts.verPayload._vp_token) === null || _a === void 0 ? void 0 : _a.presentation_submission)) {
            throw Error('ID Token _vp_token claim must contain a presentation_submission with a valid descriptor map');
        }
    }
}
function createThumbprintAndJWK(resOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        let thumbprint;
        let subJwk;
        if ((0, types_1.isInternalSignature)(resOpts.signatureType)) {
            thumbprint = yield (0, functions_1.getThumbprint)(resOpts.signatureType.hexPrivateKey, resOpts.did);
            subJwk = (0, functions_1.getPublicJWKFromHexPrivateKey)(resOpts.signatureType.hexPrivateKey, resOpts.signatureType.kid || `${resOpts.signatureType.did}#key-1`, resOpts.did);
        }
        else if ((0, types_1.isSuppliedSignature)(resOpts.signatureType)) {
            // fixme: These are uninitialized. Probably we have to extend the supplied signature to provide these.
            return { thumbprint, subJwk };
        }
        else {
            throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
        }
        return { thumbprint, subJwk };
    });
}
function extractPresentations(resOpts) {
    const presentationPayloads = resOpts.vp && resOpts.vp.length > 0
        ? resOpts.vp
            .filter((vp) => vp.location === types_1.PresentationLocation.ID_TOKEN)
            .map((vp) => vp)
        : undefined;
    const vp_tokens = resOpts.vp && resOpts.vp.length > 0
        ? resOpts.vp
            .filter((vp) => vp.location === types_1.PresentationLocation.VP_TOKEN)
            .map((vp) => vp)
        : undefined;
    let vp_token;
    if (vp_tokens) {
        if (vp_tokens.length == 1) {
            vp_token = vp_tokens[0];
        }
        else if (vp_tokens.length > 1) {
            throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
        }
    }
    const verifiable_presentations = presentationPayloads && presentationPayloads.length > 0 ? presentationPayloads : undefined;
    return {
        verifiable_presentations,
        vp_token,
    };
}
function createSIOPIDToken(verifiedJwt, resOpts) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        assertValidResponseOpts(resOpts);
        if (!verifiedJwt || !verifiedJwt.jwt) {
            throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
        }
        const supportedDidMethods = (_b = (_a = verifiedJwt.payload['registration']) === null || _a === void 0 ? void 0 : _a.subject_syntax_types_supported) === null || _b === void 0 ? void 0 : _b.filter((sst) => sst.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()));
        const state = resOpts.state || (0, functions_1.getState)(verifiedJwt.payload.state);
        const nonce = verifiedJwt.payload.nonce || resOpts.nonce || (0, functions_1.getNonce)(state);
        const idToken = Object.assign({ iss: resOpts.registration.issuer || types_1.ResponseIss.SELF_ISSUED_V2, aud: verifiedJwt.issuer, iat: Date.now() / 1000, exp: Date.now() / 1000 + (resOpts.expiresIn || 600), sub: resOpts.did, auth_time: verifiedJwt.payload.auth_time, nonce }, (resOpts._vp_token ? { _vp_token: resOpts._vp_token } : {}));
        if (supportedDidMethods.indexOf(types_1.SubjectSyntaxTypesSupportedValues.JWK_THUMBPRINT) != -1 && !resOpts.did) {
            const { thumbprint, subJwk } = yield createThumbprintAndJWK(resOpts);
            idToken['sub_jwk'] = subJwk;
            idToken.sub = thumbprint;
        }
        return idToken;
    });
}
function createSIOPResponsePayload(verifiedJwt, resOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        assertValidResponseOpts(resOpts);
        if (!verifiedJwt || !verifiedJwt.jwt) {
            throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
        }
        const state = resOpts.state || (0, functions_1.getState)(verifiedJwt.payload.state);
        const { vp_token, verifiable_presentations } = extractPresentations(resOpts);
        const authenticationResponsePayload = {
            access_token: resOpts.accessToken,
            token_type: resOpts.tokenType,
            refresh_token: resOpts.refreshToken,
            expires_in: resOpts.expiresIn,
            vp_token: vp_token || verifiable_presentations,
            state,
        };
        return authenticationResponsePayload;
    });
}
function assertValidResponseOpts(opts) {
    if (!opts /*|| !opts.redirectUri*/ || !opts.signatureType /*|| !opts.nonce*/ || !opts.did) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (!((0, types_1.isInternalSignature)(opts.signatureType) || (0, types_1.isExternalSignature)(opts.signatureType) || (0, types_1.isSuppliedSignature)(opts.signatureType))) {
        throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
    }
}
function assertValidVerifyOpts(opts) {
    if (!opts || !opts.verification || (!(0, types_1.isExternalVerification)(opts.verification) && !(0, types_1.isInternalVerification)(opts.verification))) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
}
function assertValidVerifiablePresentations(args) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((!args.definitions || args.definitions.filter((a) => a.definition).length === 0) &&
            (!args.vps || (Array.isArray(args.vps) && args.vps.filter((vp) => vp.presentation).length === 0))) {
            return;
        }
        PresentationExchange_1.PresentationExchange.assertValidPresentationDefinitionWithLocations(args.definitions);
        const presentationPayloads = [];
        let presentationSubmission;
        if (args.vps && Array.isArray(args.vps) && args.vps.length > 0) {
            presentationPayloads.push(...args.vps);
            // TODO check how to handle multiple VPs
            if ((_a = args.vps[0].presentation) === null || _a === void 0 ? void 0 : _a.presentation_submission) {
                presentationSubmission = args.vps[0].presentation.presentation_submission;
            }
        }
        else if (args.vps && !Array.isArray(args.vps)) {
            presentationPayloads.push(args.vps);
            if ((_b = args.vps.presentation) === null || _b === void 0 ? void 0 : _b.presentation_submission) {
                presentationSubmission = args.vps.presentation.presentation_submission;
            }
        }
        if (args.definitions && args.definitions.length && (!presentationPayloads || presentationPayloads.length === 0)) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
        }
        else if ((!args.definitions || args.definitions.length === 0) && (presentationPayloads || presentationPayloads.length > 0)) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_DOESNT_EXPECT_VP);
        }
        else if (args.definitions && presentationPayloads && args.definitions.length != presentationPayloads.length) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
        }
        else if (args.definitions && presentationPayloads) {
            yield PresentationExchange_1.PresentationExchange.validatePayloadsAgainstDefinitions(args.definitions, presentationPayloads, presentationSubmission, args.presentationVerificationCallback);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL0F1dGhlbnRpY2F0aW9uUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxvRkFBNEQ7QUFDNUQsaUVBQThEO0FBQzlELDJDQWFxQjtBQUNyQixtQ0F3QmlCO0FBRWpCLE1BQXFCLHNCQUFzQjtJQUN6Qzs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQU8sdUJBQXVCLENBQ2xDLFVBQWtCLEVBQ2xCLFlBQXdDLEVBQ3hDLFVBQTJDOztZQUUzQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xGLE9BQU8sc0JBQXNCLENBQUMsK0NBQStDLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNHLENBQUM7S0FBQTtJQUVELHVEQUF1RDtJQUN2RCxNQUFNLENBQU8sK0NBQStDLENBQzFELFdBQWlELEVBQ2pELFlBQXdDOztZQUV4QyxNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUUzRSxzRUFBc0U7WUFDdEUsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVks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