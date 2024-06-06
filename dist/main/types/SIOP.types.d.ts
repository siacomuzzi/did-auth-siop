import { PresentationSignCallBackParams } from '@sphereon/pex';
import { Format, PresentationDefinitionV1, PresentationDefinitionV2 } from '@sphereon/pex-models';
import { IPresentation as PEPresentation, IVerifiablePresentation as PEVerifiablePresentation, PresentationSubmission, W3CVerifiableCredential, W3CVerifiablePresentation } from '@sphereon/ssi-types';
import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import { DIDDocument as DIFDIDDocument, VerificationMethod } from 'did-resolver';
import { EcdsaSignature, JWTPayload, LinkedDataProof, ResolveOpts, VerifiedJWT } from './';
export declare const expirationTime: number;
interface AuthenticationRequestCommonOpts {
    scope: string;
    responseType: string;
    clientId: string;
    redirectUri: string;
    idTokenHint?: string;
    claims?: ClaimOpts;
    request?: string;
    requestUri?: string;
    nonce?: string;
    state?: string;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature;
    authorizationEndpoint?: string;
    requestBy: ObjectBy;
    checkLinkedDomain?: CheckLinkedDomain;
    responseMode?: ResponseMode;
    responseContext?: ResponseContext;
    responseTypesSupported?: ResponseType[] | ResponseType;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    revocationVerificationCallback?: RevocationVerificationCallback;
}
export interface AuthenticationRequestOptsVD1 extends AuthenticationRequestCommonOpts {
    registration?: RequestRegistrationOpts;
    registrationUri?: string;
}
export interface AuthenticationRequestOptsVD11 extends AuthenticationRequestCommonOpts {
    clientMetadata?: object;
    clientMetadataUri?: string;
    idTokenType?: string;
}
export declare type AuthenticationRequestOpts = AuthenticationRequestOptsVD1 | AuthenticationRequestOptsVD11;
export interface AuthenticationRequestCommonPayload extends JWTPayload {
    scope: string;
    response_type: ResponseType;
    client_id: string;
    response_mode?: string;
    redirect_uri: string;
    id_token_hint?: string;
    claims?: ClaimPayload;
    request?: string;
    request_uri?: string;
    nonce: string;
    state: string;
}
export declare type AuthenticationRequestPayloadVID1 = AuthenticationRequestCommonPayload & RequestRegistrationPayload;
export interface AuthenticationRequestPayloadVD11 extends AuthenticationRequestCommonPayload {
    client_metadata?: unknown;
    client_metadata_uri?: string;
    id_token_type?: string;
}
export interface JWTVcPresentationProfileAuthenticationRequestPayload {
    /**
     * Space-separated string that specifies the types of ID token the RP wants to obtain, with the values appearing in order of preference. The allowed
     * individual values are subject_signed and attester_signed (see Section 8.2). The default value is attester_signed. The RP determines the type if
     * ID token returned based on the comparison of the iss and subclaims values (see Section 12.1). In order to preserve compatibility with
     * existing OpenID Connect deployments, the OP MAY return an ID token that does not fulfill the requirements as expressed in this parameter. So the
     * RP SHOULD be prepared to reliably handle such an outcome.
     */
    id_token_type?: string;
}
export declare type AuthenticationRequestPayload = AuthenticationRequestPayloadVID1 | AuthenticationRequestPayloadVD11;
export interface RequestRegistrationPayload {
    registration?: RPRegistrationMetadataPayload;
    registration_uri?: string;
}
export interface VerifiedAuthenticationRequestWithJWT extends VerifiedJWT {
    payload: AuthenticationRequestPayload;
    presentationDefinitions?: PresentationDefinitionWithLocation[];
    verifyOpts: VerifyAuthenticationRequestOpts;
}
/**
 *
 */
export interface AuthenticationRequestWithJWT {
    jwt: string;
    nonce: string;
    state: string;
    payload: AuthenticationRequestPayload;
    opts: AuthenticationRequestOpts;
}
export declare type PresentationVerificationResult = {
    verified: boolean;
};
export declare type PresentationVerificationCallback = (args: VerifiablePresentationPayload) => Promise<PresentationVerificationResult>;
export declare type PresentationSignCallback = (args: PresentationSignCallBackParams) => Promise<W3CVerifiablePresentation>;
export interface AuthenticationResponseOpts {
    redirectUri?: string;
    registration: ResponseRegistrationOpts;
    checkLinkedDomain?: CheckLinkedDomain;
    presentationVerificationCallback?: PresentationVerificationCallback;
    presentationSignCallback?: PresentationSignCallback;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature;
    nonce?: string;
    state?: string;
    responseMode?: ResponseMode;
    did: string;
    vp?: VerifiablePresentationResponseOpts[];
    expiresIn?: number;
    accessToken?: string;
    tokenType?: string;
    refreshToken?: string;
    _vp_token?: {
        presentation_submission: PresentationSubmission;
    };
}
export interface IdTokenPayload extends JWTPayload {
    iss?: ResponseIss.SELF_ISSUED_V2 | string;
    sub?: string;
    aud?: string;
    iat?: number;
    exp?: number;
    auth_time?: number;
    nonce?: string;
    _vp_token?: {
        presentation_submission: PresentationSubmission;
    };
}
export interface AuthenticationResponsePayload {
    access_token?: ResponseIss.SELF_ISSUED_V2 | string;
    token_type?: string;
    refresh_token?: string;
    expires_in: number;
    state: string;
    id_token: string;
    vp_token?: VerifiablePresentationPayload[] | VerifiablePresentationPayload;
    [x: string]: any;
}
export interface VerifiablePresentationsPayload {
    presentation_definition: PresentationDefinitionV1 | PresentationDefinitionV2;
}
export interface IdTokenClaimPayload {
    verifiable_presentations?: VerifiablePresentationsPayload[];
    [x: string]: unknown;
}
export interface VpTokenClaimPayload {
    response_type?: string;
    presentation_definition?: PresentationDefinitionV1 | PresentationDefinitionV2;
    presentation_definition_uri?: string;
    nonce?: string;
    [x: string]: unknown;
}
export interface VpTokenClaimOpts {
    presentationDefinition?: PresentationDefinitionV1 | PresentationDefinitionV2;
    presentationDefinitionUri?: string;
}
export interface ClaimOpts {
    idToken?: IdTokenPayload;
    vpToken?: VpTokenClaimOpts;
}
export interface ClaimPayload {
    id_token?: IdTokenPayload;
    vp_token?: VpTokenClaimPayload;
}
export interface DIDDocument extends DIFDIDDocument {
    owner?: string;
    created?: string;
    updated?: string;
    proof?: LinkedDataProof;
}
export interface PresentationDefinitionWithLocation {
    location: PresentationLocation;
    definition: PresentationDefinitionV1 | PresentationDefinitionV2;
}
export interface VerifiablePresentationResponseOpts extends VerifiablePresentationPayload {
    location: PresentationLocation;
}
export declare enum PresentationLocation {
    VP_TOKEN = "vp_token",
    ID_TOKEN = "id_token"
}
/**
 * A wrapper for verifiablePresentation
 *
 */
export interface VerifiablePresentationPayload {
    format: VerifiablePresentationTypeFormat;
    presentation: PEVerifiablePresentation;
}
/**
 *
 */
export interface AuthenticationResponseWithJWT {
    jwt: string;
    nonce: string;
    state: string;
    idToken: IdTokenPayload;
    payload: AuthenticationResponsePayload;
    verifyOpts?: VerifyAuthenticationRequestOpts;
    responseOpts: AuthenticationResponseOpts;
    [x: string]: any;
}
interface DiscoveryMetadataCommonOpts {
    authorizationEndpoint?: Schema | string;
    issuer?: ResponseIss | string;
    responseTypesSupported?: ResponseType[] | ResponseType;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    subjectSyntaxTypesSupported?: string[];
    tokenEndpoint?: string;
    userinfoEndpoint?: string;
    jwksUri?: string;
    registrationEndpoint?: string;
    responseModesSupported?: ResponseMode[] | ResponseMode;
    grantTypesSupported?: GrantType[] | GrantType;
    acrValuesSupported?: AuthenticationContextReferences[] | AuthenticationContextReferences;
    idTokenEncryptionAlgValuesSupported?: KeyAlgo[] | KeyAlgo;
    idTokenEncryptionEncValuesSupported?: string[] | string;
    userinfoSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    userinfoEncryptionAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    userinfoEncryptionEncValuesSupported?: string[] | string;
    requestObjectEncryptionAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    requestObjectEncryptionEncValuesSupported?: string[] | string;
    tokenEndpointAuthMethodsSupported?: TokenEndpointAuthMethod[] | TokenEndpointAuthMethod;
    tokenEndpointAuthSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    displayValuesSupported?: string[] | string;
    claimTypesSupported?: ClaimType[] | ClaimType;
    claimsSupported?: string[] | string;
    serviceDocumentation?: string;
    claimsLocalesSupported?: string[] | string;
    uiLocalesSupported?: string[] | string;
    claimsParameterSupported?: boolean;
    requestParameterSupported?: boolean;
    requestUriParameterSupported?: boolean;
    requireRequestUriRegistration?: boolean;
    opPolicyUri?: string;
    opTosUri?: string;
    [x: string]: any;
}
interface DiscoveryMetadataOptsVID1 extends DiscoveryMetadataCommonOpts {
    clientId?: string;
    redirectUris?: string[] | string;
    clientName?: string;
    tokenEndpointAuthMethod?: string;
    applicationType?: string;
    responseTypes?: string;
    grantTypes?: string;
    vpFormats?: Format;
}
interface JWT_VCDiscoveryMetadataOpts extends DiscoveryMetadataOptsVID1 {
    logoUri?: string;
    clientPurpose?: string;
}
interface DiscoveryMetadataOptsVD11 extends DiscoveryMetadataCommonOpts {
    idTokenTypesSupported?: IdTokenType[] | IdTokenType;
    vpFormatsSupported?: Format;
}
interface GeneralDiscovertMetadataPayload {
    authorization_endpoint: Schema | string;
    issuer: ResponseIss;
    response_types_supported: ResponseType[] | ResponseType;
    scopes_supported: Scope[] | Scope;
    subject_types_supported: SubjectType[] | SubjectType;
    id_token_signing_alg_values_supported: SigningAlgo[] | SigningAlgo;
    request_object_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    subject_syntax_types_supported: string[];
    token_endpoint?: string;
    userinfo_endpoint?: string;
    jwks_uri?: string;
    registration_endpoint?: string;
    response_modes_supported?: ResponseMode[] | ResponseMode;
    grant_types_supported?: GrantType[] | GrantType;
    acr_values_supported?: AuthenticationContextReferences[] | AuthenticationContextReferences;
    id_token_encryption_alg_values_supported?: KeyAlgo[] | KeyAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT].
     */
    id_token_encryption_enc_values_supported?: string[] | string;
    userinfo_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    userinfo_encryption_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT].
     */
    userinfo_encryption_enc_values_supported?: string[] | string;
    request_object_encryption_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.
     */
    request_object_encryption_enc_values_supported?: string[] | string;
    token_endpoint_auth_methods_supported?: TokenEndpointAuthMethod[] | TokenEndpointAuthMethod;
    token_endpoint_auth_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core].
     */
    display_values_supported?: unknown[] | unknown;
    /**
     * OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims.
     */
    claim_types_supported?: ClaimType[] | ClaimType;
    /**
     * RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list.
     */
    claims_supported?: string[] | string;
    service_documentation?: string;
    claims_locales_supported?: string[] | string;
    ui_locales_supported?: string[] | string;
    claims_parameter_supported?: boolean;
    request_parameter_supported?: boolean;
    request_uri_parameter_supported?: boolean;
    require_request_uri_registration?: boolean;
    op_policy_uri?: string;
    op_tos_uri?: string;
    [x: string]: any;
}
interface DiscoveryMetadataPayloadVID1 extends GeneralDiscovertMetadataPayload {
    client_id: string;
    redirectUris: string[];
    client_name?: string;
    token_endpoint_auth_method: string;
    application_type: string;
    response_types: string;
    grant_types: string;
    vp_formats: Format;
}
interface JWT_VCDiscoveryMetadataPayload extends DiscoveryMetadataPayloadVID1 {
    logo_uri?: string;
    client_purpose?: string;
}
interface DiscoveryMetadataPayloadVD11 extends GeneralDiscovertMetadataPayload {
    id_token_types_supported?: IdTokenType[] | IdTokenType;
    vp_formats_supported?: Format;
}
export declare type DiscoveryMetadataPayload = DiscoveryMetadataPayloadVID1 | JWT_VCDiscoveryMetadataPayload | DiscoveryMetadataPayloadVD11;
export declare type DiscoveryMetadataOpts = JWT_VCDiscoveryMetadataOpts | DiscoveryMetadataOptsVID1 | DiscoveryMetadataOptsVD11;
export declare type RequestRegistrationOpts = RPRegistrationMetadataOpts & {
    registrationBy: RegistrationType;
};
export declare type ResponseRegistrationOpts = DiscoveryMetadataOpts & {
    registrationBy: RegistrationType;
};
export declare type RPRegistrationMetadataOpts = Pick<DiscoveryMetadataOpts, 'clientId' | 'idTokenSigningAlgValuesSupported' | 'requestObjectSigningAlgValuesSupported' | 'responseTypesSupported' | 'scopesSupported' | 'subjectTypesSupported' | 'subjectSyntaxTypesSupported' | 'vpFormatsSupported' | 'clientName' | 'logoUri' | 'clientPurpose'> & {
    [x: string]: any;
};
export declare type RPRegistrationMetadataPayload = Pick<DiscoveryMetadataPayload, 'subject_syntax_types_supported' | 'vp_formats'> & Partial<Pick<DiscoveryMetadataPayload, 'client_id' | 'id_token_signing_alg_values_supported' | 'request_object_signing_alg_values_supported' | 'response_types_supported' | 'scopes_supported' | 'subject_types_supported' | 'client_name' | 'logo_uri' | 'client_purpose'>> & {
    [x: string]: any;
};
export interface CommonSupportedMetadata {
    subject_syntax_types_supported?: string[];
    vp_formats: Format;
}
export declare type ObjectBy = {
    type: PassBy.REFERENCE | PassBy.VALUE;
    referenceUri?: string;
};
export declare enum AuthenticationContextReferences {
    PHR = "phr",
    PHRH = "phrh"
}
export declare enum ClaimType {
    NORMAL = "normal",
    AGGREGATED = "aggregated",
    DISTRIBUTED = "distributed"
}
export declare enum IdTokenType {
    SUBJECT_SIGNED = "subject_signed",
    ATTESTER_SIGNED = "attester_signed"
}
export interface RegistrationType extends ObjectBy {
    id_token_encrypted_response_alg?: EncKeyAlgorithm;
    id_token_encrypted_response_enc?: EncSymmetricAlgorithmCode;
}
export declare enum VerifiablePresentationTypeFormat {
    JWT_VP = "jwt_vp",
    LDP_VP = "ldp_vp"
}
export declare enum VerifiableCredentialTypeFormat {
    LDP_VC = "ldp_vc",
    JWT_VC = "jwt_vc"
}
export declare enum EncSymmetricAlgorithmCode {
    XC20P = "XC20P"
}
export declare enum EncKeyAlgorithm {
    ECDH_ES = "ECDH-ES"
}
export declare enum PassBy {
    REFERENCE = "REFERENCE",
    VALUE = "VALUE"
}
export declare enum ResponseContext {
    RP = "rp",
    OP = "op"
}
export declare enum CheckLinkedDomain {
    NEVER = "never",
    IF_PRESENT = "if_present",
    ALWAYS = "always"
}
export interface InternalSignature {
    hexPrivateKey: string;
    did: string;
    kid?: string;
}
export interface SuppliedSignature {
    signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>;
    did: string;
    kid: string;
}
export interface NoSignature {
    hexPublicKey: string;
    did: string;
    kid?: string;
}
export interface ExternalSignature {
    signatureUri: string;
    did: string;
    authZToken?: string;
    hexPublicKey?: string;
    kid?: string;
}
export declare enum VerificationMode {
    INTERNAL = 0,
    EXTERNAL = 1
}
export interface Verification {
    checkLinkedDomain?: CheckLinkedDomain;
    verifyCallback?: VerifyCallback;
    presentationVerificationCallback?: PresentationVerificationCallback;
    mode: VerificationMode;
    resolveOpts: ResolveOpts;
    revocationOpts?: RevocationOpts;
    supportedVersions?: SupportedVersion[];
}
export declare type InternalVerification = Verification;
export interface ExternalVerification extends Verification {
    verifyUri: string;
    authZToken?: string;
}
export interface VerifyAuthenticationRequestOpts {
    verification: InternalVerification | ExternalVerification;
    nonce?: string;
    verifyCallback?: VerifyCallback;
}
export interface VerifyAuthenticationResponseOpts {
    verification: InternalVerification | ExternalVerification;
    nonce?: string;
    state?: string;
    audience: string;
    claims?: ClaimOpts;
    verifyCallback?: VerifyCallback;
    presentationVerificationCallback?: PresentationVerificationCallback;
}
export interface ResponseClaims {
    verified_claims?: string;
    encryption_key?: JsonWebKey;
}
export interface DidAuthValidationResponse {
    signatureValidation: boolean;
    signer: VerificationMethod;
    payload: JWTPayload;
}
export interface VerifiedAuthenticationResponseWithJWT extends VerifiedJWT {
    payload: IdTokenPayload;
    verifyOpts: VerifyAuthenticationResponseOpts;
}
export declare enum GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    IMPLICIT = "implicit"
}
export declare enum ResponseMode {
    FRAGMENT = "fragment",
    FORM_POST = "form_post",
    POST = "post",
    QUERY = "query"
}
export interface SignatureResponse {
    jws: string;
}
export declare enum UrlEncodingFormat {
    FORM_URL_ENCODED = "application/x-www-form-urlencoded"
}
export declare type SIOPURI = {
    encodedUri: string;
    encodingFormat: UrlEncodingFormat;
};
export interface UriResponse extends SIOPURI {
    responseMode?: ResponseMode;
    bodyEncoded?: string;
}
export interface AuthenticationRequestURI extends SIOPURI {
    jwt?: string;
    requestOpts: AuthenticationRequestOpts;
    requestPayload: AuthenticationRequestPayload;
}
export interface ParsedAuthenticationRequestURI extends SIOPURI {
    jwt: string;
    requestPayload: AuthenticationRequestPayload;
    registration: RPRegistrationMetadataPayload;
}
export declare enum KeyType {
    EC = "EC"
}
export declare enum KeyCurve {
    SECP256k1 = "secp256k1",
    ED25519 = "ed25519"
}
export declare enum TokenEndpointAuthMethod {
    CLIENT_SECRET_POST = "client_secret_post",
    CLIENT_SECRET_BASIC = "client_secret_basic",
    CLIENT_SECRET_JWT = "client_secret_jwt",
    PRIVATE_KEY_JWT = "private_key_jwt"
}
export declare enum SigningAlgo {
    EDDSA = "EdDSA",
    RS256 = "RS256",
    ES256 = "ES256",
    ES256K = "ES256K",
    NONE = "none"
}
export declare enum KeyAlgo {
    EDDSA = "EdDSA",
    RS256 = "RS256",
    ES256 = "ES256",
    ES256K = "ES256K"
}
export declare enum Scope {
    OPENID = "openid",
    OPENID_DIDAUTHN = "openid did_authn",
    PROFILE = "profile",
    EMAIL = "email",
    ADDRESS = "address",
    PHONE = "phone"
}
export declare enum ResponseType {
    ID_TOKEN = "id_token",
    VP_TOKEN = "vp_token"
}
export declare enum SubjectIdentifierType {
    JKT = "jkt",
    DID = "did"
}
export declare enum SubjectSyntaxTypesSupportedValues {
    DID = "did",
    JWK_THUMBPRINT = "urn:ietf:params:oauth:jwk-thumbprint"
}
export declare enum CredentialFormat {
    JSON_LD = "w3cvc-jsonld",
    JWT = "jwt"
}
export declare enum SubjectType {
    PUBLIC = "public",
    PAIRWISE = "pairwise"
}
export declare enum Schema {
    OPENID = "openid:",
    OPENID_VC = "openid-vc:"
}
export declare enum ResponseIss {
    SELF_ISSUED_V1 = "https://self-issued.me",
    SELF_ISSUED_V2 = "https://self-issued.me/v2",
    SELF_ISSUED_V2_VC_INTEROP = "https://self-issued.me/v2/openid-vc"
}
export declare const isInternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is InternalSignature;
export declare const isExternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is ExternalSignature;
export declare const isSuppliedSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is SuppliedSignature;
export declare const isNoSignature: (object: InternalSignature | ExternalSignature | NoSignature) => object is NoSignature;
export declare const isRequestOpts: (object: AuthenticationRequestOpts | AuthenticationResponseOpts) => object is AuthenticationRequestOpts;
export declare const isResponseOpts: (object: AuthenticationRequestOpts | AuthenticationResponseOpts) => object is AuthenticationResponseOpts;
export declare const isRequestPayload: (object: AuthenticationRequestPayload | AuthenticationResponsePayload | IdTokenPayload) => object is AuthenticationRequestPayload;
export declare const isResponsePayload: (object: AuthenticationRequestPayload | AuthenticationResponsePayload | IdTokenPayload) => object is AuthenticationResponsePayload;
export declare const isInternalVerification: (object: InternalVerification | ExternalVerification) => object is Verification;
export declare const isExternalVerification: (object: InternalVerification | ExternalVerification) => object is ExternalVerification;
export declare const isVP: (object: PEVerifiablePresentation | PEPresentation) => object is PEVerifiablePresentation;
export declare const isPresentation: (object: PEVerifiablePresentation | PEPresentation) => object is PEPresentation;
export declare enum RevocationStatus {
    VALID = "valid",
    INVALID = "invalid"
}
export interface IRevocationVerificationStatus {
    status: RevocationStatus;
    error?: string;
}
export declare type RevocationVerificationCallback = (vc: W3CVerifiableCredential, type: VerifiableCredentialTypeFormat) => Promise<IRevocationVerificationStatus>;
export declare enum RevocationVerification {
    NEVER = "never",
    IF_PRESENT = "if_present",
    ALWAYS = "always"
}
export interface RevocationOpts {
    revocationVerification: RevocationVerification;
    revocationVerificationCallback?: RevocationVerificationCallback;
}
export declare enum SupportedVersion {
    SIOPv2_ID1 = "SIOPv2_ID1",
    SIOPv2_D11 = "SIOPv2_D11",
    JWT_VC_PRESENTATION_PROFILE_v1 = "JWT_VC_PRESENTATION_PROFILE_v1"
}
export {};
