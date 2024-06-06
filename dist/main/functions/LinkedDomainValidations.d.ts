import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import { CheckLinkedDomain, ResolveOpts } from '../types';
export declare function validateLinkedDomainWithDid(did: string, verifyCallback: VerifyCallback, checkLinkedDomain: CheckLinkedDomain, opts: ResolveOpts): Promise<void>;
