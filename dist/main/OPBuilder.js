"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const OP_1 = require("./OP");
const functions_1 = require("./functions");
const types_1 = require("./types");
class OPBuilder {
    constructor() {
        this.resolvers = new Map();
        this.responseRegistration = {};
    }
    addDidMethod(didMethod, opts) {
        const method = didMethod.startsWith('did:') ? (0, functions_1.getMethodFromDid)(didMethod) : didMethod;
        if (method === types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) {
            opts ? this.addResolver('', new did_uni_client_1.UniResolver(Object.assign({}, opts))) : this.addResolver('', null);
        }
        opts ? this.addResolver(method, new did_resolver_1.Resolver((0, did_uni_client_1.getUniResolver)(method, Object.assign({}, opts)))) : this.addResolver(method, null);
        return this;
    }
    addIssuer(issuer) {
        this.issuer = issuer;
        return this;
    }
    withCustomResolver(resolver) {
        this.customResolver = resolver;
        return this;
    }
    addResolver(didMethod, resolver) {
        const qualifiedDidMethod = didMethod.startsWith('did:') ? (0, functions_1.getMethodFromDid)(didMethod) : didMethod;
        this.resolvers.set(qualifiedDidMethod, resolver);
        return this;
    }
    /*withDid(did: string): OPBuilder {
      this.did = did;
      return this;
    }
  */
    withExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
    withCheckLinkedDomain(mode) {
        this.checkLinkedDomain = mode;
        return this;
    }
    response(responseMode) {
        this.responseMode = responseMode;
        return this;
    }
    registrationBy(responseRegistration) {
        this.responseRegistration = Object.assign({}, responseRegistration);
        return this;
    }
    /*//TODO registration object creation
    authorizationEndpoint?: Schema.OPENID | string;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: KeyAlgo[] | KeyAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
  */
    // Only internal | supplied supported for now
    signature(signatureType) {
        this.signatureType = signatureType;
        return this;
    }
    internalSignature(hexPrivateKey, did, kid) {
        this.signature({ hexPrivateKey, did, kid });
        return this;
    }
    suppliedSignature(signature, did, kid) {
        this.signature({ signature, did, kid });
        return this;
    }
    addVerifyCallback(verifyCallback) {
        this.verifyCallback = verifyCallback;
        return this;
    }
    initSupportedVersions() {
        if (!this.supportedVersions) {
            this.supportedVersions = [];
        }
    }
    withSupportedVersions(supportedVersion) {
        this.initSupportedVersions();
        if (Array.isArray(supportedVersion)) {
            this.supportedVersions.push(...supportedVersion);
        }
        else {
            this.supportedVersions.push(supportedVersion);
        }
        return this;
    }
    addSupportedVersion(supportedVersion) {
        this.initSupportedVersions();
        if (typeof supportedVersion === 'string') {
            this.supportedVersions.push(types_1.SupportedVersion[supportedVersion]);
        }
        else if (Array.isArray(supportedVersion)) {
            this.supportedVersions.push(supportedVersion);
        }
        return this;
    }
    withPresentationSignCallback(presentationSignCallback) {
        this.presentationSignCallback = presentationSignCallback;
        return this;
    }
    build() {
        // this.responseRegistration.didMethodsSupported = this.didMethods;
        // this.responseRegistration.subjectIdentifiersSupported = this.subjectIdentifierTypes;
        // this.responseRegistration.credentialFormatsSupported = this.credentialFormats;
        return new OP_1.OP({ builder: this });
    }
}
exports.default = OPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1BCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vT1BCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQStFO0FBRS9FLCtDQUFvRDtBQUVwRCw2QkFBMEI7QUFDMUIsMkNBQStDO0FBQy9DLG1DQVlpQjtBQUVqQixNQUFxQixTQUFTO0lBQTlCO1FBR0UsY0FBUyxHQUE0QixJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUVuRSx5QkFBb0IsR0FBc0MsRUFBRSxDQUFDO0lBNkgvRCxDQUFDO0lBckhDLFlBQVksQ0FBQyxTQUFpQixFQUFFLElBQWdEO1FBQzlFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUEsNEJBQWdCLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN0RixJQUFJLE1BQU0sS0FBSyx5Q0FBaUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLDRCQUFXLENBQUMsa0JBQUssSUFBSSxDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsRztRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSx1QkFBUSxDQUFDLElBQUEsK0JBQWMsRUFBQyxNQUFNLG9CQUFPLElBQUksRUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEgsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQW1CO1FBQzNCLElBQUksQ0FB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