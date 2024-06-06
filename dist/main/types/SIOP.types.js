"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedVersion = exports.RevocationVerification = exports.RevocationStatus = exports.isPresentation = exports.isVP = exports.isExternalVerification = exports.isInternalVerification = exports.isResponsePayload = exports.isRequestPayload = exports.isResponseOpts = exports.isRequestOpts = exports.isNoSignature = exports.isSuppliedSignature = exports.isExternalSignature = exports.isInternalSignature = exports.ResponseIss = exports.Schema = exports.SubjectType = exports.CredentialFormat = exports.SubjectSyntaxTypesSupportedValues = exports.SubjectIdentifierType = exports.ResponseType = exports.Scope = exports.KeyAlgo = exports.SigningAlgo = exports.TokenEndpointAuthMethod = exports.KeyCurve = exports.KeyType = exports.UrlEncodingFormat = exports.ResponseMode = exports.GrantType = exports.VerificationMode = exports.CheckLinkedDomain = exports.ResponseContext = exports.PassBy = exports.EncKeyAlgorithm = exports.EncSymmetricAlgorithmCode = exports.VerifiableCredentialTypeFormat = exports.VerifiablePresentationTypeFormat = exports.IdTokenType = exports.ClaimType = exports.AuthenticationContextReferences = exports.PresentationLocation = exports.expirationTime = void 0;
exports.expirationTime = 10 * 60;
var PresentationLocation;
(function (PresentationLocation) {
    PresentationLocation["VP_TOKEN"] = "vp_token";
    PresentationLocation["ID_TOKEN"] = "id_token";
})(PresentationLocation = exports.PresentationLocation || (exports.PresentationLocation = {}));
var AuthenticationContextReferences;
(function (AuthenticationContextReferences) {
    AuthenticationContextReferences["PHR"] = "phr";
    AuthenticationContextReferences["PHRH"] = "phrh";
})(AuthenticationContextReferences = exports.AuthenticationContextReferences || (exports.AuthenticationContextReferences = {}));
var ClaimType;
(function (ClaimType) {
    ClaimType["NORMAL"] = "normal";
    ClaimType["AGGREGATED"] = "aggregated";
    ClaimType["DISTRIBUTED"] = "distributed";
})(ClaimType = exports.ClaimType || (exports.ClaimType = {}));
var IdTokenType;
(function (IdTokenType) {
    IdTokenType["SUBJECT_SIGNED"] = "subject_signed";
    IdTokenType["ATTESTER_SIGNED"] = "attester_signed";
})(IdTokenType = exports.IdTokenType || (exports.IdTokenType = {}));
var VerifiablePresentationTypeFormat;
(function (VerifiablePresentationTypeFormat) {
    VerifiablePresentationTypeFormat["JWT_VP"] = "jwt_vp";
    VerifiablePresentationTypeFormat["LDP_VP"] = "ldp_vp";
})(VerifiablePresentationTypeFormat = exports.VerifiablePresentationTypeFormat || (exports.VerifiablePresentationTypeFormat = {}));
var VerifiableCredentialTypeFormat;
(function (VerifiableCredentialTypeFormat) {
    VerifiableCredentialTypeFormat["LDP_VC"] = "ldp_vc";
    VerifiableCredentialTypeFormat["JWT_VC"] = "jwt_vc";
})(VerifiableCredentialTypeFormat = exports.VerifiableCredentialTypeFormat || (exports.VerifiableCredentialTypeFormat = {}));
var EncSymmetricAlgorithmCode;
(function (EncSymmetricAlgorithmCode) {
    EncSymmetricAlgorithmCode["XC20P"] = "XC20P";
})(EncSymmetricAlgorithmCode = exports.EncSymmetricAlgorithmCode || (exports.EncSymmetricAlgorithmCode = {}));
var EncKeyAlgorithm;
(function (EncKeyAlgorithm) {
    EncKeyAlgorithm["ECDH_ES"] = "ECDH-ES";
})(EncKeyAlgorithm = exports.EncKeyAlgorithm || (exports.EncKeyAlgorithm = {}));
var PassBy;
(function (PassBy) {
    PassBy["REFERENCE"] = "REFERENCE";
    PassBy["VALUE"] = "VALUE";
})(PassBy = exports.PassBy || (exports.PassBy = {}));
var ResponseContext;
(function (ResponseContext) {
    ResponseContext["RP"] = "rp";
    ResponseContext["OP"] = "op";
})(ResponseContext = exports.ResponseContext || (exports.ResponseContext = {}));
var CheckLinkedDomain;
(function (CheckLinkedDomain) {
    CheckLinkedDomain["NEVER"] = "never";
    CheckLinkedDomain["IF_PRESENT"] = "if_present";
    CheckLinkedDomain["ALWAYS"] = "always";
})(CheckLinkedDomain = exports.CheckLinkedDomain || (exports.CheckLinkedDomain = {}));
var VerificationMode;
(function (VerificationMode) {
    VerificationMode[VerificationMode["INTERNAL"] = 0] = "INTERNAL";
    VerificationMode[VerificationMode["EXTERNAL"] = 1] = "EXTERNAL";
})(VerificationMode = exports.VerificationMode || (exports.VerificationMode = {}));
var GrantType;
(function (GrantType) {
    GrantType["AUTHORIZATION_CODE"] = "authorization_code";
    GrantType["IMPLICIT"] = "implicit";
})(GrantType = exports.GrantType || (exports.GrantType = {}));
var ResponseMode;
(function (ResponseMode) {
    ResponseMode["FRAGMENT"] = "fragment";
    ResponseMode["FORM_POST"] = "form_post";
    ResponseMode["POST"] = "post";
    ResponseMode["QUERY"] = "query";
})(ResponseMode = exports.ResponseMode || (exports.ResponseMode = {}));
var UrlEncodingFormat;
(function (UrlEncodingFormat) {
    UrlEncodingFormat["FORM_URL_ENCODED"] = "application/x-www-form-urlencoded";
})(UrlEncodingFormat = exports.UrlEncodingFormat || (exports.UrlEncodingFormat = {}));
var KeyType;
(function (KeyType) {
    KeyType["EC"] = "EC";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
var KeyCurve;
(function (KeyCurve) {
    KeyCurve["SECP256k1"] = "secp256k1";
    KeyCurve["ED25519"] = "ed25519";
})(KeyCurve = exports.KeyCurve || (exports.KeyCurve = {}));
var TokenEndpointAuthMethod;
(function (TokenEndpointAuthMethod) {
    TokenEndpointAuthMethod["CLIENT_SECRET_POST"] = "client_secret_post";
    TokenEndpointAuthMethod["CLIENT_SECRET_BASIC"] = "client_secret_basic";
    TokenEndpointAuthMethod["CLIENT_SECRET_JWT"] = "client_secret_jwt";
    TokenEndpointAuthMethod["PRIVATE_KEY_JWT"] = "private_key_jwt";
})(TokenEndpointAuthMethod = exports.TokenEndpointAuthMethod || (exports.TokenEndpointAuthMethod = {}));
var SigningAlgo;
(function (SigningAlgo) {
    SigningAlgo["EDDSA"] = "EdDSA";
    SigningAlgo["RS256"] = "RS256";
    SigningAlgo["ES256"] = "ES256";
    SigningAlgo["ES256K"] = "ES256K";
    SigningAlgo["NONE"] = "none";
})(SigningAlgo = exports.SigningAlgo || (exports.SigningAlgo = {}));
var KeyAlgo;
(function (KeyAlgo) {
    // ES256KR = "ES256K-R",
    KeyAlgo["EDDSA"] = "EdDSA";
    KeyAlgo["RS256"] = "RS256";
    KeyAlgo["ES256"] = "ES256";
    KeyAlgo["ES256K"] = "ES256K";
})(KeyAlgo = exports.KeyAlgo || (exports.KeyAlgo = {}));
var Scope;
(function (Scope) {
    Scope["OPENID"] = "openid";
    Scope["OPENID_DIDAUTHN"] = "openid did_authn";
    //added based on the https://openid.net/specs/openid-connect-implicit-1_0.html#SelfIssuedDiscovery
    Scope["PROFILE"] = "profile";
    Scope["EMAIL"] = "email";
    Scope["ADDRESS"] = "address";
    Scope["PHONE"] = "phone";
})(Scope = exports.Scope || (exports.Scope = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["ID_TOKEN"] = "id_token";
    ResponseType["VP_TOKEN"] = "vp_token";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
var SubjectIdentifierType;
(function (SubjectIdentifierType) {
    SubjectIdentifierType["JKT"] = "jkt";
    SubjectIdentifierType["DID"] = "did";
})(SubjectIdentifierType = exports.SubjectIdentifierType || (exports.SubjectIdentifierType = {}));
var SubjectSyntaxTypesSupportedValues;
(function (SubjectSyntaxTypesSupportedValues) {
    SubjectSyntaxTypesSupportedValues["DID"] = "did";
    SubjectSyntaxTypesSupportedValues["JWK_THUMBPRINT"] = "urn:ietf:params:oauth:jwk-thumbprint";
})(SubjectSyntaxTypesSupportedValues = exports.SubjectSyntaxTypesSupportedValues || (exports.SubjectSyntaxTypesSupportedValues = {}));
var CredentialFormat;
(function (CredentialFormat) {
    CredentialFormat["JSON_LD"] = "w3cvc-jsonld";
    CredentialFormat["JWT"] = "jwt";
})(CredentialFormat = exports.CredentialFormat || (exports.CredentialFormat = {}));
var SubjectType;
(function (SubjectType) {
    SubjectType["PUBLIC"] = "public";
    SubjectType["PAIRWISE"] = "pairwise";
})(SubjectType = exports.SubjectType || (exports.SubjectType = {}));
var Schema;
(function (Schema) {
    Schema["OPENID"] = "openid:";
    Schema["OPENID_VC"] = "openid-vc:";
})(Schema = exports.Schema || (exports.Schema = {}));
var ResponseIss;
(function (ResponseIss) {
    ResponseIss["SELF_ISSUED_V1"] = "https://self-issued.me";
    ResponseIss["SELF_ISSUED_V2"] = "https://self-issued.me/v2";
    ResponseIss["SELF_ISSUED_V2_VC_INTEROP"] = "https://self-issued.me/v2/openid-vc";
})(ResponseIss = exports.ResponseIss || (exports.ResponseIss = {}));
const isInternalSignature = (object) => 'hexPrivateKey' in object && 'did' in object;
exports.isInternalSignature = isInternalSignature;
const isExternalSignature = (object) => 'signatureUri' in object && 'did' in object;
exports.isExternalSignature = isExternalSignature;
const isSuppliedSignature = (object) => 'signature' in object;
exports.isSuppliedSignature = isSuppliedSignature;
const isNoSignature = (object) => 'hexPublicKey' in object && 'did' in object;
exports.isNoSignature = isNoSignature;
const isRequestOpts = (object) => 'requestBy' in object;
exports.isRequestOpts = isRequestOpts;
const isResponseOpts = (object) => 'did' in object;
exports.isResponseOpts = isResponseOpts;
const isRequestPayload = (object) => 'response_mode' in object && 'response_type' in object;
exports.isRequestPayload = isRequestPayload;
const isResponsePayload = (object) => 'iss' in object && 'aud' in object;
exports.isResponsePayload = isResponsePayload;
const isInternalVerification = (object) => object.mode === VerificationMode.INTERNAL; /* && !isExternalVerification(object)*/
exports.isInternalVerification = isInternalVerification;
const isExternalVerification = (object) => object.mode === VerificationMode.EXTERNAL; /*&& 'verifyUri' in object || 'authZToken' in object*/
exports.isExternalVerification = isExternalVerification;
const isVP = (object) => 'presentation' in object;
exports.isVP = isVP;
const isPresentation = (object) => 'presentation_submission' in object;
exports.isPresentation = isPresentation;
var RevocationStatus;
(function (RevocationStatus) {
    RevocationStatus["VALID"] = "valid";
    RevocationStatus["INVALID"] = "invalid";
})(RevocationStatus = exports.RevocationStatus || (exports.RevocationStatus = {}));
var RevocationVerification;
(function (RevocationVerification) {
    RevocationVerification["NEVER"] = "never";
    RevocationVerification["IF_PRESENT"] = "if_present";
    RevocationVerification["ALWAYS"] = "always";
})(RevocationVerification = exports.RevocationVerification || (exports.RevocationVerification = {}));
var SupportedVersion;
(function (SupportedVersion) {
    SupportedVersion["SIOPv2_ID1"] = "SIOPv2_ID1";
    SupportedVersion["SIOPv2_D11"] = "SIOPv2_D11";
    SupportedVersion["JWT_VC_PRESENTATION_PROFILE_v1"] = "JWT_VC_PRESENTATION_PROFILE_v1";
})(SupportedVersion = exports.SupportedVersion || (exports.SupportedVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lPUC50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3R5cGVzL1NJT1AudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFxQzs7O0FBZ0J4QixRQUFBLGNBQWMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBMk10QyxJQUFZLG9CQUdYO0FBSEQsV0FBWSxvQkFBb0I7SUFDOUIsNkNBQXFCLENBQUE7SUFDckIsNkNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBRy9CO0FBeU9ELElBQVksK0JBR1g7QUFIRCxXQUFZLCtCQUErQjtJQUN6Qyw4Q0FBVyxDQUFBO0lBQ1gsZ0RBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVywrQkFBK0IsR0FBL0IsdUNBQStCLEtBQS9CLHVDQUErQixRQUcxQztBQUVELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw4QkFBaUIsQ0FBQTtJQUNqQixzQ0FBeUIsQ0FBQTtJQUN6Qix3Q0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLFdBR1g7QUFIRCxXQUFZLFdBQVc7SUFDckIsZ0RBQWlDLENBQUE7SUFDakMsa0RBQW1DLENBQUE7QUFDckMsQ0FBQyxFQUhXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBR3RCO0FBT0QsSUFBWSxnQ0FHWDtBQUhELFdBQVksZ0NBQWdDO0lBQzFDLHFEQUFpQixDQUFBO0lBQ2pCLHFEQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxnQ0FBZ0MsR0FBaEMsd0NBQWdDLEtBQWhDLHdDQUFnQyxRQUczQztBQUVELElBQVksOEJBR1g7QUFIRCxXQUFZLDhCQUE4QjtJQUN4QyxtREFBaUIsQ0FBQTtJQUNqQixtREFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsOEJBQThCLEdBQTlC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