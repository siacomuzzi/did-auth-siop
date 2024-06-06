import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import OPBuilder from './OPBuilder';
import { AuthenticationRequestPayload, AuthenticationResponseOpts, AuthenticationResponseWithJWT, ExternalVerification, InternalVerification, ParsedAuthenticationRequestURI, SupportedVersion, VerifiablePresentationResponseOpts, VerifiedAuthenticationRequestWithJWT, VerifyAuthenticationRequestOpts } from './types';
export declare class OP {
    private readonly _authResponseOpts;
    private readonly _verifyAuthRequestOpts;
    constructor(opts: {
        builder?: OPBuilder;
        responseOpts?: AuthenticationResponseOpts;
        verifyOpts?: VerifyAuthenticationRequestOpts;
    });
    get authResponseOpts(): AuthenticationResponseOpts;
    get verifyAuthRequestOpts(): Partial<VerifyAuthenticationRequestOpts>;
    postAuthenticationResponse(authenticationResponse: AuthenticationResponseWithJWT): Promise<Response>;
    /**
     * This method tries to infer the SIOP specs version based on the request payload.
     * If the version cannot be inferred or is not supported it throws an exception.
     * This method needs to be called to ensure the OP can handle the request
     * @param payload is the authentication request payload
     */
    checkSIOPSpecVersionSupported(payload: AuthenticationRequestPayload): Promise<SupportedVersion>;
    verifyAuthenticationRequest(requestJwtOrUri: string, opts?: {
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
    }): Promise<VerifiedAuthenticationRequestWithJWT>;
    createAuthenticationResponse(verifiedJwt: VerifiedAuthenticationRequestWithJWT, responseOpts?: {
        nonce?: string;
        state?: string;
        audience?: string;
        verification?: InternalVerification | ExternalVerification;
        vp?: VerifiablePresentationResponseOpts[];
    }): Promise<AuthenticationResponseWithJWT>;
    submitAuthenticationResponse(verifiedJwt: AuthenticationResponseWithJWT): Promise<Response>;
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthenticationRequestURI(encodedUri: string): Promise<ParsedAuthenticationRequestURI>;
    newAuthenticationResponseOpts(opts?: {
        nonce?: string;
        state?: string;
        audience?: string;
        vp?: VerifiablePresentationResponseOpts[];
    }): AuthenticationResponseOpts;
    newVerifyAuthenticationRequestOpts(opts?: {
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        verifyCallback?: VerifyCallback;
    }): VerifyAuthenticationRequestOpts;
    static fromOpts(responseOpts: AuthenticationResponseOpts, verifyOpts: VerifyAuthenticationRequestOpts): OP;
    static builder(): OPBuilder;
}
