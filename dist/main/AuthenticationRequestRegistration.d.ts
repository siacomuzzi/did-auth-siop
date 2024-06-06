import { RequestRegistrationOpts, RequestRegistrationPayload, RPRegistrationMetadataPayload } from './types';
export declare function assertValidRequestRegistrationOpts(opts: RequestRegistrationOpts): void;
export declare function createRequestRegistrationPayload(opts: RequestRegistrationOpts): Promise<RequestRegistrationPayload>;
export declare function createRequestRegistration(opts: RequestRegistrationOpts): Promise<{
    requestRegistrationPayload: RequestRegistrationPayload;
    rpRegistrationMetadataPayload: RPRegistrationMetadataPayload;
    opts: RequestRegistrationOpts;
}>;
