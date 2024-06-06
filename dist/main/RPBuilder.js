"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const RP_1 = require("./RP");
const functions_1 = require("./functions");
const types_1 = require("./types");
class RPBuilder {
    constructor() {
        this.resolvers = new Map();
        this.requestRegistration = {};
    }
    addScope(scope) {
        this.scope = scope;
        return this;
    }
    addResponseType(responseType) {
        this.responseType = responseType;
        return this;
    }
    addClientId(clientId) {
        this.clientId = clientId;
        return this;
    }
    addIssuer(issuer) {
        this.issuer = issuer;
        return this;
    }
    withPresentationVerification(presentationVerificationCallback) {
        this.presentationVerificationCallback = presentationVerificationCallback;
        return this;
    }
    withRevocationVerification(mode) {
        this.revocationVerification = mode;
        return this;
    }
    withRevocationVerificationCallback(callback) {
        this.revocationVerificationCallback = callback;
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
    withAuthorizationEndpoint(authorizationEndpoint) {
        this.authorizationEndpoint = authorizationEndpoint;
        return this;
    }
    withCheckLinkedDomain(mode) {
        this.checkLinkedDomain = mode;
        return this;
    }
    addDidMethod(didMethod, opts) {
        const method = didMethod.startsWith('did:') ? (0, functions_1.getMethodFromDid)(didMethod) : didMethod;
        if (method === types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) {
            opts ? this.addResolver('', new did_uni_client_1.UniResolver(Object.assign({}, opts))) : this.addResolver('', null);
        }
        opts ? this.addResolver(method, new did_resolver_1.Resolver((0, did_uni_client_1.getUniResolver)(method, Object.assign({}, opts)))) : this.addResolver(method, null);
        return this;
    }
    redirect(redirectUri) {
        this.redirectUri = redirectUri;
        return this;
    }
    requestBy(type, referenceUri) {
        this.requestObjectBy = {
            type,
            referenceUri,
        };
        return this;
    }
    response(responseMode) {
        this.responseMode = responseMode;
        return this;
    }
    registrationBy(requestRegistration) {
        this.requestRegistration = Object.assign({}, requestRegistration);
        return this;
    }
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
    addPresentationDefinitionClaim(definitionOpt) {
        if (!this.claims || !this.claims.vpToken) {
            this.claims = {
                vpToken: {
                    presentationDefinition: definitionOpt,
                },
            };
        }
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
    build() {
        return new RP_1.RP({ builder: this });
    }
}
exports.default = RPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlBCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vUlBCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQStFO0FBRy9FLCtDQUFvRDtBQUVwRCw2QkFBMEI7QUFDMUIsMkNBQStDO0FBQy9DLG1DQW1CaUI7QUFFakIsTUFBcUIsU0FBUztJQUE5QjtRQUdFLGNBQVMsR0FBNEIsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFFbkUsd0JBQW1CLEdBQXFDLEVBQUUsQ0FBQztJQStKN0QsQ0FBQztJQTdJQyxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxlQUFlLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFtQjtRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxnQ0FBa0U7UUFDN0YsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLGdDQUFnQyxDQUFDO1FBQ3pFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDBCQUEwQixDQUFDLElBQTRCO1FBQ3JELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsa0NBQWtDLENBQUMsUUFBd0M7UUFDekUsSUFBSSxDQUFDLDhCQUE4QixHQUFHLFFBQVEsQ0FBQztRQUMvQyxPQUFPLElBQUks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