import { AuthenticationResponseWithJWT, JWTPayload } from '../types';
export declare function postWithBearerToken(url: string, body: JWTPayload, bearerToken: string): Promise<Response>;
export declare function postAuthenticationResponse(url: string, body: AuthenticationResponseWithJWT): Promise<Response>;
export declare function postAuthenticationResponseJwt(url: string, idToken: string, vpToken?: string, state?: string): Promise<Response>;
export declare function getWithUrl(url: string): Promise<Response>;
