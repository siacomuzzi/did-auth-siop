import { Resolvable } from 'did-resolver';
import { JWK } from 'jose';
export interface ResolveOpts {
    resolver?: Resolvable;
    resolveUrl?: string;
    subjectSyntaxTypesSupported?: string[];
}
export interface VerificationMethod {
    id: string;
    type: string;
    controller: string;
    publicKeyHex?: string;
    publicKeyMultibase?: string;
    publicKeyBase58?: string;
    publicKeyJwk?: JWK;
}
export interface LinkedDataProof {
    type: string;
    created: string;
    creator: string;
    nonce: string;
    signatureValue: string;
}
