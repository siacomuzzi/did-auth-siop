import { AuthenticationResponseOpts, AuthenticationResponsePayload, AuthenticationResponseWithJWT, VerifiedAuthenticationRequestWithJWT, VerifiedAuthenticationResponseWithJWT, VerifyAuthenticationRequestOpts, VerifyAuthenticationResponseOpts } from './types';
export default class AuthenticationResponse {
    /**
     * Creates a SIOP Response Object
     *
     * @param requestJwt
     * @param responseOpts
     * @param verifyOpts
     */
    static createJWTFromRequestJWT(requestJwt: string, responseOpts: AuthenticationResponseOpts, verifyOpts: VerifyAuthenticationRequestOpts): Promise<AuthenticationResponseWithJWT>;
    static createAuthenticationResponseFromVerifiedRequest(verifiedJwt: VerifiedAuthenticationRequestWithJWT, responseOpts: AuthenticationResponseOpts): Promise<AuthenticationResponseWithJWT>;
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param jwt ID token to be validated
     * @param verifyOpts
     */
    static verifyJWT(jwt: string, verifyOpts: VerifyAuthenticationResponseOpts): Promise<VerifiedAuthenticationResponseWithJWT>;
    static verifyVPs(payload: AuthenticationResponsePayload, verifyOpts: Partial<VerifyAuthenticationResponseOpts>): Promise<void>;
}
