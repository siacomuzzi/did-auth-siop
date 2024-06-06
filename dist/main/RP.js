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
exports.RP = void 0;
const ajv_1 = __importDefault(require("ajv"));
const functions_1 = require("./functions");
const schemas_1 = require("./schemas");
const types_1 = require("./types");
const _1 = require("./");
const ajv = new ajv_1.default({ allowUnionTypes: true });
const validate = ajv.compile(schemas_1.AuthenticationRequestOptsSchema);
class RP {
    constructor(opts) {
        var _a;
        const claims = (_a = opts.builder) === null || _a === void 0 ? void 0 : _a.claims;
        this._authRequestOpts = Object.assign({ claims }, createRequestOptsFromBuilderOrExistingOpts(opts));
        this._verifyAuthResponseOpts = Object.assign({ claims }, createVerifyResponseOptsFromBuilderOrExistingOpts(opts));
    }
    get authRequestOpts() {
        return this._authRequestOpts;
    }
    get verifyAuthResponseOpts() {
        return this._verifyAuthResponseOpts;
    }
    createAuthenticationRequest(opts) {
        return _1.AuthenticationRequest.createURI(this.newAuthenticationRequestOpts(opts));
    }
    verifyAuthenticationResponse(authenticationResponseWithJWT, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification = this._verifyAuthResponseOpts.verification;
            const verifyCallback = verification.verifyCallback || this._verifyAuthResponseOpts.verifyCallback;
            const presentationVerificationCallback = verification.presentationVerificationCallback || this.verifyAuthResponseOpts.presentationVerificationCallback;
            const verifyAuthenticationResponseOpts = this.newVerifyAuthenticationResponseOpts(Object.assign(Object.assign({}, opts), { verifyCallback, presentationVerificationCallback }));
            _1.AuthenticationResponse.verifyVPs(authenticationResponseWithJWT.payload, verifyAuthenticationResponseOpts);
            return _1.AuthenticationResponse.verifyJWT(authenticationResponseWithJWT.jwt, verifyAuthenticationResponseOpts);
        });
    }
    newAuthenticationRequestOpts(opts) {
        const state = (opts === null || opts === void 0 ? void 0 : opts.state) || (0, functions_1.getState)(opts === null || opts === void 0 ? void 0 : opts.state);
        const nonce = (opts === null || opts === void 0 ? void 0 : opts.nonce) || (0, functions_1.getNonce)(state, opts === null || opts === void 0 ? void 0 : opts.nonce);
        return Object.assign(Object.assign({}, this._authRequestOpts), { state,
            nonce });
    }
    newVerifyAuthenticationResponseOpts(opts) {
        return Object.assign(Object.assign({}, this._verifyAuthResponseOpts), { audience: opts.audience, state: (opts === null || opts === void 0 ? void 0 : opts.state) || this._verifyAuthResponseOpts.state, nonce: (opts === null || opts === void 0 ? void 0 : opts.nonce) || this._verifyAuthResponseOpts.nonce, claims: Object.assign(Object.assign({}, this._verifyAuthResponseOpts.claims), opts.claims), verification: (opts === null || opts === void 0 ? void 0 : opts.verification) || this._verifyAuthResponseOpts.verification, verifyCallback: opts === null || opts === void 0 ? void 0 : opts.verifyCallback, presentationVerificationCallback: opts === null || opts === void 0 ? void 0 : opts.presentationVerificationCallback });
    }
    static fromRequestOpts(opts) {
        return new RP({ requestOpts: opts });
    }
    static builder() {
        return new _1.RPBuilder();
    }
}
exports.RP = RP;
function createRequestOptsFromBuilderOrExistingOpts(opts) {
    const requestOpts = opts.builder
        ? {
            authorizationEndpoint: opts.builder.authorizationEndpoint,
            registration: opts.builder.requestRegistration,
            redirectUri: opts.builder.redirectUri,
            requestBy: opts.builder.requestObjectBy,
            responseTypesSupported: opts.builder.requestRegistration.responseTypesSupported,
            scopesSupported: opts.builder.requestRegistration.scopesSupported,
            signatureType: opts.builder.signatureType,
            subjectTypesSupported: opts.builder.requestRegistration.subjectTypesSupported,
            requestObjectSigningAlgValuesSupported: opts.builder.requestRegistration.requestObjectSigningAlgValuesSupported,
            responseMode: opts.builder.responseMode,
            responseContext: opts.builder.responseContext,
            claims: opts.builder.claims,
            scope: opts.builder.scope,
            responseType: opts.builder.responseType,
            clientId: opts.builder.clientId,
        }
        : opts.requestOpts;
    const valid = validate(requestOpts);
    if (!valid) {
        throw new Error('RP builder validation error: ' + JSON.stringify(validate.errors));
    }
    return requestOpts;
}
function createVerifyResponseOptsFromBuilderOrExistingOpts(opts) {
    var _a, _b;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_b = opts.builder) === null || _b === void 0 ? void 0 : _b.requestRegistration)) {
        opts.builder.requestRegistration.subjectSyntaxTypesSupported = (0, functions_1.mergeAllDidMethods)(opts.builder.requestRegistration.subjectSyntaxTypesSupported, opts.builder.resolvers);
    }
    let resolver;
    if (opts.builder) {
        resolver = (0, functions_1.getResolverUnion)(opts.builder.customResolver, opts.builder.requestRegistration.subjectSyntaxTypesSupported, opts.builder.resolvers);
    }
    return opts.builder
        ? {
            verification: {
                mode: types_1.VerificationMode.INTERNAL,
                checkLinkedDomain: opts.builder.checkLinkedDomain,
                verifyCallback: opts.builder.verifyCallback,
                presentationVerificationCallback: opts.builder.presentationVerificationCallback,
                resolveOpts: {
                    subjectSyntaxTypesSupported: opts.builder.requestRegistration.subjectSyntaxTypesSupported,
                    resolver: resolver,
                },
                supportedVersions: opts.builder.supportedVersions,
                revocationOpts: {
                    revocationVerification: opts.builder.revocationVerification,
                    revocationVerificationCallback: opts.builder.revocationVerificationCallback,
                },
            },
        }
        : opts.verifyOpts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9SUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBc0I7QUFHdEIsMkNBQXVGO0FBQ3ZGLHVDQUE0RDtBQUM1RCxtQ0FjaUI7QUFFakIseUJBQThFO0FBRTlFLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0MsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyx5Q0FBK0IsQ0FBQyxDQUFDO0FBRTlELE1BQWEsRUFBRTtJQUliLFlBQW1CLElBQXFIOztRQUN0SSxNQUFNLE1BQU0sR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLG1CQUFLLE1BQU0sSUFBSywwQ0FBMEMsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBQ3hGLElBQUksQ0FBQyx1QkFBdUIsbUJBQUssTUFBTSxJQUFLLGlEQUFpRCxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7SUFDeEcsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxzQkFBc0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUM7SUFDdEMsQ0FBQztJQUVNLDJCQUEyQixDQUFDLElBQXlDO1FBQzFFLE9BQU8sd0JBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFWSw0QkFBNEIsQ0FDdkMsNkJBQTRELEVBQzVELElBT0M7O1lBRUQsTUFBTSxZQUFZLEdBQWlCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUM7WUFDN0UsTUFBTSxjQUFjLEdBQUcsWUFBWSxD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