import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import { Resolvable } from 'did-resolver';
import { OP } from './OP';
import { CheckLinkedDomain, EcdsaSignature, ExternalSignature, InternalSignature, PresentationSignCallback, ResponseIss, ResponseMode, ResponseRegistrationOpts, SuppliedSignature, SupportedVersion } from './types';
export default class OPBuilder {
    expiresIn?: number;
    issuer: ResponseIss;
    resolvers: Map<string, Resolvable>;
    responseMode?: ResponseMode;
    responseRegistration: Partial<ResponseRegistrationOpts>;
    customResolver?: Resolvable;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature;
    checkLinkedDomain?: CheckLinkedDomain;
    verifyCallback?: VerifyCallback;
    presentationSignCallback?: PresentationSignCallback;
    supportedVersions: SupportedVersion[];
    addDidMethod(didMethod: string, opts?: {
        resolveUrl?: string;
        baseUrl?: string;
    }): OPBuilder;
    addIssuer(issuer: ResponseIss): OPBuilder;
    withCustomResolver(resolver: Resolvable): OPBuilder;
    addResolver(didMethod: string, resolver: Resolvable): OPBuilder;
    withExpiresIn(expiresIn: number): OPBuilder;
    withCheckLinkedDomain(mode: CheckLinkedDomain): OPBuilder;
    response(responseMode: ResponseMode): OPBuilder;
    registrationBy(responseRegistration: ResponseRegistrationOpts): OPBuilder;
    signature(signatureType: InternalSignature | SuppliedSignature): OPBuilder;
    internalSignature(hexPrivateKey: string, did: string, kid: string): OPBuilder;
    suppliedSignature(signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>, did: string, kid: string): OPBuilder;
    addVerifyCallback(verifyCallback: VerifyCallback): this;
    private initSupportedVersions;
    withSupportedVersions(supportedVersion: SupportedVersion[] | SupportedVersion): OPBuilder;
    addSupportedVersion(supportedVersion: string | SupportedVersion): OPBuilder;
    withPresentationSignCallback(presentationSignCallback: PresentationSignCallback): this;
    build(): OP;
}
