import { RevocationVerification, RevocationVerificationCallback, VerifiablePresentationPayload } from '../types';
export declare const verifyRevocation: (vpToken: VerifiablePresentationPayload, revocationVerificationCallback: RevocationVerificationCallback, revocationVerification: RevocationVerification) => Promise<void>;
