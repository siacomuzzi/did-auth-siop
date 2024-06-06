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
exports.OP = void 0;
const ajv_1 = __importDefault(require("ajv"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const AuthenticationRequest_1 = __importDefault(require("./AuthenticationRequest"));
const AuthenticationResponse_1 = __importDefault(require("./AuthenticationResponse"));
const OPBuilder_1 = __importDefault(require("./OPBuilder"));
const functions_1 = require("./functions");
const SIOPVersionDiscovery_1 = require("./functions/SIOPVersionDiscovery");
const schemas_1 = require("./schemas");
const types_1 = require("./types");
const ajv = new ajv_1.default({ allowUnionTypes: true });
const validate = ajv.compile(schemas_1.AuthenticationResponseOptsSchema);
// The OP publishes the formats it supports using the vp_formats_supported metadata parameter as defined above in its "openid-configuration".
class OP {
    constructor(opts) {
        this._authResponseOpts = Object.assign({}, createResponseOptsFromBuilderOrExistingOpts(opts));
        this._verifyAuthRequestOpts = Object.assign({}, createVerifyRequestOptsFromBuilderOrExistingOpts(opts));
    }
    get authResponseOpts() {
        return this._authResponseOpts;
    }
    get verifyAuthRequestOpts() {
        return this._verifyAuthRequestOpts;
    }
    // TODO SK Can you please put some documentation on it?
    postAuthenticationResponse(authenticationResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, functions_1.postAuthenticationResponse)(authenticationResponse.payload.idToken.aud, authenticationResponse);
        });
    }
    /**
     * This method tries to infer the SIOP specs version based on the request payload.
     * If the version cannot be inferred or is not supported it throws an exception.
     * This method needs to be called to ensure the OP can handle the request
     * @param payload is the authentication request payload
     */
    checkSIOPSpecVersionSupported(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = (0, SIOPVersionDiscovery_1.authenticationRequestVersionDiscovery)(payload);
            if (!this._verifyAuthRequestOpts.verification.supportedVersions.includes(version)) {
                throw new Error(`SIOP ${version} is not supported`);
            }
            return version;
        });
    }
    verifyAuthenticationRequest(requestJwtOrUri, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyCallback = this._verifyAuthRequestOpts.verification.verifyCallback || this._verifyAuthRequestOpts.verifyCallback;
            const jwt = requestJwtOrUri.startsWith('ey') ? requestJwtOrUri : (yield parseAndResolveRequestUri(requestJwtOrUri)).jwt;
            return AuthenticationRequest_1.default.verifyJWT(jwt, this.newVerifyAuthenticationRequestOpts(Object.assign(Object.assign({}, opts), { verifyCallback })));
        });
    }
    createAuthenticationResponse(verifiedJwt, responseOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthenticationResponse_1.default.createAuthenticationResponseFromVerifiedRequest(verifiedJwt, this.newAuthenticationResponseOpts(responseOpts));
        });
    }
    // TODO SK Can you please put some documentation on it?
    submitAuthenticationResponse(verifiedJwt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!verifiedJwt ||
                (verifiedJwt.responseOpts.responseMode &&
                    !(verifiedJwt.responseOpts.responseMode == types_1.ResponseMode.POST || verifiedJwt.responseOpts.responseMode == types_1.ResponseMode.FORM_POST))) {
                throw new Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            return (0, functions_1.postAuthenticationResponseJwt)(verifiedJwt.redirectUri, verifiedJwt.jwt, verifiedJwt.vpTokenJwt, verifiedJwt.state);
        });
    }
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthenticationRequestURI(encodedUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestPayload, jwt, registrationMetadata } = yield parseAndResolveUri(encodedUri);
            return {
                encodedUri,
                encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                jwt,
                requestPayload,
                registration: registrationMetadata,
            };
        });
    }
    newAuthenticationResponseOpts(opts) {
        const state = opts === null || opts === void 0 ? void 0 : opts.state;
        const nonce = opts === null || opts === void 0 ? void 0 : opts.nonce;
        const vp = opts === null || opts === void 0 ? void 0 : opts.vp;
        const audience = opts === null || opts === void 0 ? void 0 : opts.audience;
        return Object.assign(Object.assign({ redirectUri: audience }, this._authResponseOpts), { nonce,
            state,
            vp });
    }
    newVerifyAuthenticationRequestOpts(opts) {
        return Object.assign(Object.assign({}, this._verifyAuthRequestOpts), { nonce: (opts === null || opts === void 0 ? void 0 : opts.nonce) || this._verifyAuthRequestOpts.nonce, verification: (opts === null || opts === void 0 ? void 0 : opts.verification) || this._verifyAuthRequestOpts.verification, verifyCallback: opts === null || opts === void 0 ? void 0 : opts.verifyCallback });
    }
    static fromOpts(responseOpts, verifyOpts) {
        return new OP({ responseOpts, verifyOpts });
    }
    static builder() {
        return new OPBuilder_1.default();
    }
}
exports.OP = OP;
function parseAndResolveRequestUri(encodedUri) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestPayload = AuthenticationRequest_1.default.parseURI(encodedUri);
        const jwt = requestPayload.request || (yield (yield (0, cross_fetch_1.default)(requestPayload.request_uri)).text());
        return { requestPayload, jwt };
    });
}
function parseAndResolveUri(encodedUri) {
    return __awaiter(this, void 0, void 0, function* () {
        const { requestPayload, jwt } = yield parseAndResolveRequestUri(encodedUri);
        AuthenticationRequest_1.default.assertValidRequestObject(requestPayload);
        const registrationMetadata = yield AuthenticationRequest_1.default.getRegistrationObj(requestPayload['registration_uri'], requestPayload['registration']);
        AuthenticationRequest_1.default.assertValidRegistrationObject(registrationMetadata);
        return { requestPayload, jwt, registrationMetadata };
    });
}
function createResponseOptsFromBuilderOrExistingOpts(opts) {
    var _a, _b, _c;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_c = (_b = opts.builder) === null || _b === void 0 ? void 0 : _b.responseRegistration) === null || _c === void 0 ? void 0 : _c.subjectSyntaxTypesSupported)) {
        opts.builder.responseRegistration.subjectSyntaxTypesSupported = (0, functions_1.mergeAllDidMethods)(opts.builder.responseRegistration.subjectSyntaxTypesSupported, opts.builder.resolvers);
    }
    let responseOpts;
    if (opts.builder) {
        responseOpts = {
            registration: {
                issuer: opts.builder.issuer,
                authorizationEndpoint: opts.builder.responseRegistration.authorizationEndpoint,
                tokenEndpoint: opts.builder.responseRegistration.tokenEndpoint,
                userinfoEndpoint: opts.builder.responseRegistration.userinfoEndpoint,
                jwksUri: opts.builder.responseRegistration.jwksUri,
                registrationEndpoint: opts.builder.responseRegistration.registrationEndpoint,
                scopesSupported: opts.builder.responseRegistration.scopesSupported,
                responseTypesSupported: opts.builder.responseRegistration.responseTypesSupported,
                responseModesSupported: opts.builder.responseRegistration.responseModesSupported,
                grantTypesSupported: opts.builder.responseRegistration.grantTypesSupported,
                acrValuesSupported: opts.builder.responseRegistration.acrValuesSupported,
                subjectTypesSupported: opts.builder.responseRegistration.subjectTypesSupported,
                idTokenSigningAlgValuesSupported: opts.builder.responseRegistration.idTokenSigningAlgValuesSupported,
                idTokenEncryptionAlgValuesSupported: opts.builder.responseRegistration.idTokenEncryptionAlgValuesSupported,
                idTokenEncryptionEncValuesSupported: opts.builder.responseRegistration.idTokenEncryptionEncValuesSupported,
                userinfoSigningAlgValuesSupported: opts.builder.responseRegistration.userinfoSigningAlgValuesSupported,
                userinfoEncryptionAlgValuesSupported: opts.builder.responseRegistration.userinfoEncryptionAlgValuesSupported,
                userinfoEncryptionEncValuesSupported: opts.builder.responseRegistration.userinfoEncryptionEncValuesSupported,
                requestObjectSigningAlgValuesSupported: opts.builder.responseRegistration.requestObjectSigningAlgValuesSupported,
                requestObjectEncryptionAlgValuesSupported: opts.builder.responseRegistration.requestObjectEncryptionAlgValuesSupported,
                requestObjectEncryptionEncValuesSupported: opts.builder.responseRegistration.requestObjectEncryptionEncValuesSupported,
                tokenEndpointAuthMethodsSupported: opts.builder.responseRegistration.tokenEndpointAuthMethodsSupported,
                tokenEndpointAuthSigningAlgValuesSupported: opts.builder.responseRegistration.tokenEndpointAuthSigningAlgValuesSupported,
                displayValuesSupported: opts.builder.responseRegistration.displayValuesSupported,
                claimTypesSupported: opts.builder.responseRegistration.claimTypesSupported,
                claimsSupported: opts.builder.responseRegistration.claimsSupported,
                serviceDocumentation: opts.builder.responseRegistration.serviceDocumentation,
                claimsLocalesSupported: opts.builder.responseRegistration.claimsLocalesSupported,
                uiLocalesSupported: opts.builder.responseRegistration.uiLocalesSupported,
                claimsParameterSupported: opts.builder.responseRegistration.claimsParameterSupported,
                requestParameterSupported: opts.builder.responseRegistration.requestParameterSupported,
                requestUriParameterSupported: opts.builder.responseRegistration.requestUriParameterSupported,
                requireRequestUriRegistration: opts.builder.responseRegistration.requireRequestUriRegistration,
                opPolicyUri: opts.builder.responseRegistration.opPolicyUri,
                opTosUri: opts.builder.responseRegistration.opTosUri,
                registrationBy: opts.builder.responseRegistration.registrationBy,
                subjectSyntaxTypesSupported: opts.builder.responseRegistration.subjectSyntaxTypesSupported,
                vpFormats: opts.builder.responseRegistration.vpFormats,
                clientName: opts.builder.responseRegistration.clientName,
                clientId: opts.builder.responseRegistration.clientId,
                applicationType: opts.builder.responseRegistration.applicationType,
                grantTypes: opts.builder.responseRegistration.grantTypes,
                responseTypes: opts.builder.responseRegistration.responseTypes,
                redirectUris: opts.builder.responseRegistration.redirectUris,
                tokenEndpointAuthMethod: opts.builder.responseRegistration.tokenEndpointAuthMethod,
                logoUri: opts.builder.responseRegistration.logoUri,
                clientPurpose: opts.builder.responseRegistration.clientPurpose,
                idTokenTypesSupported: opts.builder.responseRegistration.idTokenTypesSupported,
            },
            did: opts.builder.signatureType.did,
            expiresIn: opts.builder.expiresIn,
            signatureType: opts.builder.signatureType,
            responseMode: opts.builder.responseMode,
            presentationSignCallback: opts.builder.presentationSignCallback,
        };
        const languageTagEnabledFieldsNames = ['clientName', 'clientPurpose'];
        const languageTaggedFields = functions_1.LanguageTagUtils.getLanguageTaggedProperties(opts.builder.responseRegistration, languageTagEnabledFieldsNames);
        languageTaggedFields.forEach((value, key) => {
            responseOpts.registration[key] = value;
        });
    }
    else {
        responseOpts = Object.assign({}, opts.responseOpts);
    }
    const valid = validate(responseOpts);
    if (!valid) {
        throw new Error('OP builder validation error: ' + JSON.stringify(validate.errors));
    }
    return responseOpts;
}
function createVerifyRequestOptsFromBuilderOrExistingOpts(opts) {
    var _a, _b;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_b = opts.builder) === null || _b === void 0 ? void 0 : _b.responseRegistration)) {
        opts.builder.responseRegistration.subjectSyntaxTypesSupported = (0, functions_1.mergeAllDidMethods)(opts.builder.responseRegistration.subjectSyntaxTypesSupported, opts.builder.resolvers);
    }
    let resolver;
    if (opts.builder) {
        resolver = (0, functions_1.getResolverUnion)(opts.builder.customResolver, opts.builder.responseRegistration.subjectSyntaxTypesSupported, opts.builder.resolvers);
    }
    return opts.builder
        ? {
            verification: {
                mode: types_1.VerificationMode.INTERNAL,
                checkLinkedDomain: opts.builder.checkLinkedDomain,
                verifyCallback: opts.builder.verifyCallback,
                resolveOpts: {
                    subjectSyntaxTypesSupported: opts.builder.responseRegistration.subjectSyntaxTypesSupported,
                    resolver: resolver,
                },
                supportedVersions: opts.builder.supportedVersions,
            },
        }
        : opts.verifyOpts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9PUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBc0I7QUFDdEIsOERBQWdDO0FBR2hDLG9GQUE0RDtBQUM1RCxzRkFBOEQ7QUFDOUQsNERBQW9DO0FBQ3BDLDJDQUFnSjtBQUNoSiwyRUFBeUY7QUFDekYsdUNBQTZEO0FBQzdELG1DQWdCaUI7QUFFakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUvQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLDBDQUFnQyxDQUFDLENBQUM7QUFFL0QsNklBQTZJO0FBQzdJLE1BQWEsRUFBRTtJQUliLFlBQW1CLElBQXNIO1FBQ3ZJLElBQUksQ0FBQyxpQkFBaUIscUJBQVEsMkNBQTJDLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztRQUNsRixJQUFJLENBQUMsc0JBQXNCLHFCQUFRLGdEQUFnRCxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7SUFDOUYsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLHFCQUFxQjtRQUN2QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQsdURBQXVEO0lBQzFDLDBCQUEwQixDQUFDLHNCQUFxRDs7WUFDM0YsT0FBTyxJQUFBLHNDQUEwQixFQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDeEcsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSw2QkFBNkIsQ0FBQyxPQUFxQzs7WUFDOUUsTUFBTSxPQUFPLEdBQXFCLElBQUEsNERBQXFDLEVBQUMsT0FBTyxDQUFDLENBQUM7WUFD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