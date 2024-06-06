import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import { AuthenticationRequestOpts, AuthenticationRequestURI, AuthenticationResponseWithJWT, CheckLinkedDomain, ClaimOpts, ExternalVerification, InternalVerification, PresentationVerificationCallback, VerifiedAuthenticationResponseWithJWT, VerifyAuthenticationResponseOpts } from './types';
import { RPBuilder } from './';
export declare class RP {
    private readonly _authRequestOpts;
    private readonly _verifyAuthResponseOpts;
    constructor(opts: {
        builder?: RPBuilder;
        requestOpts?: AuthenticationRequestOpts;
        verifyOpts?: VerifyAuthenticationResponseOpts;
    });
    get authRequestOpts(): AuthenticationRequestOpts;
    get verifyAuthResponseOpts(): Partial<VerifyAuthenticationResponseOpts>;
    createAuthenticationRequest(opts?: {
        nonce?: string;
        state?: string;
    }): Promise<AuthenticationRequestURI>;
    verifyAuthenticationResponse(authenticationResponseWithJWT: AuthenticationResponseWithJWT, opts?: {
        audience: string;
        state?: string;
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        claims?: ClaimOpts;
        checkLinkedDomain?: CheckLinkedDomain;
    }): Promise<VerifiedAuthenticationResponseWithJWT>;
    newAuthenticationRequestOpts(opts?: {
        nonce?: string;
        state?: string;
    }): AuthenticationRequestOpts;
    newVerifyAuthenticationResponseOpts(opts?: {
        state?: string;
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        claims?: ClaimOpts;
        audience: string;
        checkLinkedDomain?: CheckLinkedDomain;
        verifyCallback?: VerifyCallback;
        presentationVerificationCallback?: PresentationVerificationCallback;
    }): VerifyAuthenticationResponseOpts;
    static fromRequestOpts(opts: AuthenticationRequestOpts): RP;
    static builder(): RPBuilder;
}
