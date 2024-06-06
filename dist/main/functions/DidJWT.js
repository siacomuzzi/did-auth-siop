"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSIOPRegistrationDidMethod = exports.getNetworkFromDid = exports.getMethodFromDid = exports.parseJWT = exports.getIssuerDidFromJWT = exports.isIssSelfIssued = exports.getSubDidFromPayload = exports.getAudience = exports.signDidJwtInternal = exports.signDidJwtPayload = exports.createDidJWT = exports.verifyDidJWT = void 0;
const did_jwt_1 = require("did-jwt");
const config_1 = require("../config");
const types_1 = require("../types");
const _1 = require("./");
/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the did doc of the issuer of the JWT.
 *
 *  @example
 *  verifyDidJWT('did:key:example', resolver, {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}).then(obj => {
 *      const did = obj.did                 // DIDres of signer
 *      const payload = obj.payload
 *      const doc = obj.doc                 // DIDres Document of signer
 *      const JWT = obj.JWT                 // JWT
 *      const signerKeyId = obj.signerKeyId // ID of key in DIDres document that signed JWT
 *      ...
 *  })
 *
 *  @param    {String}            jwt                   a JSON Web Token to verify
 *  @param    {Resolvable}        resolver
 *  @param    {JWTVerifyOptions}  [options]             Options
 *  @param    {String}            options.audience      DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl   callback url in JWT
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a response object or rejects with an error
 */
function verifyDidJWT(jwt, resolver, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, did_jwt_1.verifyJWT)(jwt, Object.assign({ resolver }, options));
    });
}
exports.verifyDidJWT = verifyDidJWT;
/**
 *  Creates a signed JWT given an address which becomes the issuer, a signer function, and a payload for which the signature is over.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(JWT => {
 *      ...
 *  })
 *
 *  @param    {Object}            payload               payload object
 *  @param    {Object}            [options]             an unsigned credential object
 *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
 *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
 *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
 *  @param    {Object}            header                optional object to specify or customize the JWT header
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or rejects with an error
 */
function createDidJWT(payload, { issuer, signer, expiresIn, canonicalize }, header) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, did_jwt_1.createJWT)(payload, { issuer, signer, alg: header.alg, expiresIn, canonicalize }, header);
    });
}
exports.createDidJWT = createDidJWT;
function signDidJwtPayload(payload, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const isResponse = (0, types_1.isResponseOpts)(opts) || (0, types_1.isResponsePayload)(payload);
        if (isResponse) {
            if (!payload.iss || [types_1.ResponseIss.SELF_ISSUED_V2, types_1.ResponseIss.SELF_ISSUED_V2_VC_INTEROP].indexOf(payload.iss) < 0) {
                throw new Error(types_1.SIOPErrors.NO_SELFISSUED_ISS);
            }
        }
        if ((0, types_1.isInternalSignature)(opts.signatureType)) {
            return signDidJwtInternal(payload, isResponse ? payload.iss : opts.signatureType.did, opts.signatureType.hexPrivateKey, opts.signatureType.kid);
        }
        else if ((0, types_1.isExternalSignature)(opts.signatureType)) {
            return signDidJwtExternal(payload, opts.signatureType.signatureUri, opts.signatureType.authZToken, opts.signatureType.kid);
        }
        else if ((0, types_1.isSuppliedSignature)(opts.signatureType)) {
            return signDidJwtSupplied(payload, isResponse ? payload.iss : opts.signatureType.did, opts.signatureType.signature, opts.signatureType.kid);
        }
        else {
            throw new Error(types_1.SIOPErrors.BAD_SIGNATURE_PARAMS);
        }
    });
}
exports.signDidJwtPayload = signDidJwtPayload;
function signDidJwtInternal(payload, issuer, hexPrivateKey, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        // todo: Create method. We are doing roughly the same multiple times
        const algo = (0, _1.isEd25519DidKeyMethod)(issuer) ||
            (0, _1.isEd25519DidKeyMethod)(payload.kid) ||
            (0, _1.isEd25519DidKeyMethod)(kid) ||
            (0, _1.isEd25519DidKeyMethod)(payload.sub) ||
            (0, _1.isEd25519JWK)(payload.sub_jwk)
            ? types_1.KeyAlgo.EDDSA
            : types_1.KeyAlgo.ES256K;
        // const request = !!payload.client_id;
        const signer = algo == types_1.KeyAlgo.EDDSA ? (0, did_jwt_1.EdDSASigner)((0, did_jwt_1.hexToBytes)(hexPrivateKey)) : (0, did_jwt_1.ES256KSigner)((0, did_jwt_1.hexToBytes)(hexPrivateKey.replace('0x', '')));
        const header = {
            alg: algo,
            kid: kid || `${payload.sub}#keys-1`,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.expirationTime,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
exports.signDidJwtInternal = signDidJwtInternal;
function signDidJwtExternal(payload, signatureUri, authZToken, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        // todo: Create method. We are doing roughly the same multiple times
        const alg = (0, _1.isEd25519DidKeyMethod)(payload.sub) || (0, _1.isEd25519DidKeyMethod)(payload.iss) || (0, _1.isEd25519DidKeyMethod)(kid) ? types_1.KeyAlgo.EDDSA : types_1.KeyAlgo.ES256K;
        const body = {
            issuer: payload.iss && payload.iss.includes('did:') ? payload.iss : payload.sub,
            payload,
            type: alg === types_1.KeyAlgo.EDDSA ? config_1.PROOF_TYPE_EDDSA : config_1.DEFAULT_PROOF_TYPE,
            expiresIn: types_1.expirationTime,
            alg,
            selfIssued: payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V2) ? payload.iss : undefined,
            kid,
        };
        const response = yield (0, _1.postWithBearerToken)(signatureUri, body, authZToken);
        return (yield response.json()).jws;
    });
}
function signDidJwtSupplied(payload, issuer, signer, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        // todo: Create method. We are doing roughly the same multiple times
        const algo = (0, _1.isEd25519DidKeyMethod)(issuer) ||
            (0, _1.isEd25519DidKeyMethod)(payload.kid) ||
            (0, _1.isEd25519DidKeyMethod)(kid) ||
            (0, _1.isEd25519DidKeyMethod)(payload.sub) ||
            (0, _1.isEd25519JWK)(payload.sub_jwk)
            ? types_1.KeyAlgo.EDDSA
            : types_1.KeyAlgo.ES256K;
        const header = {
            alg: algo,
            kid,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.expirationTime,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
function getAudience(jwt) {
    const { payload } = (0, did_jwt_1.decodeJWT)(jwt);
    if (!payload) {
        throw new Error(types_1.SIOPErrors.NO_AUDIENCE);
    }
    else if (!payload.aud) {
        return undefined;
    }
    else if (Array.isArray(payload.aud)) {
        throw new Error(types_1.SIOPErrors.INVALID_AUDIENCE);
    }
    return payload.aud;
}
exports.getAudience = getAudience;
//TODO To enable automatic registration, it cannot be a did, but HTTPS URL
function assertIssSelfIssuedOrDid(payload) {
    if (!payload.sub || !payload.sub.startsWith('did:') || !payload.iss || !isIssSelfIssued(payload)) {
        throw new Error(types_1.SIOPErrors.NO_ISS_DID);
    }
}
function getSubDidFromPayload(payload, header) {
    assertIssSelfIssuedOrDid(payload);
    if (isIssSelfIssued(payload)) {
        let did;
        if (payload.sub && payload.sub.startsWith('did:')) {
            did = payload.sub;
        }
        if (!did && header && header.kid && header.kid.startsWith('did:')) {
            did = header.kid.split('#')[0];
        }
        if (did) {
            return did;
        }
    }
    return payload.sub;
}
exports.getSubDidFromPayload = getSubDidFromPayload;
function isIssSelfIssued(payload) {
    return payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V1) || payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V2);
}
exports.isIssSelfIssued = isIssSelfIssued;
function getIssuerDidFromJWT(jwt) {
    const { payload } = parseJWT(jwt);
    return getSubDidFromPayload(payload);
}
exports.getIssuerDidFromJWT = getIssuerDidFromJWT;
function parseJWT(jwt) {
    const decodedJWT = (0, did_jwt_1.decodeJWT)(jwt);
    const { payload, header } = decodedJWT;
    if (!payload || !header) {
        throw new Error(types_1.SIOPErrors.NO_ISS_DID);
    }
    return decodedJWT;
}
exports.parseJWT = parseJWT;
function getMethodFromDid(did) {
    if (!did) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const split = did.split(':');
    if (split.length == 1 && did.length > 0) {
        return did;
    }
    else if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    return split[1];
}
exports.getMethodFromDid = getMethodFromDid;
function getNetworkFromDid(did) {
    const network = 'mainnet'; // default
    const split = did.split(':');
    if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    if (split.length === 4) {
        return split[2];
    }
    else if (split.length > 4) {
        return `${split[2]}:${split[3]}`;
    }
    return network;
}
exports.getNetworkFromDid = getNetworkFromDid;
/**
 * Since the OIDC SIOP spec incorrectly uses 'did:<method>:' and calls that a method, we have to fix it
 * @param didOrMethod
 */
function toSIOPRegistrationDidMethod(didOrMethod) {
    let prefix = didOrMethod;
    if (!didOrMethod.startsWith('did:')) {
        prefix = 'did:' + didOrMethod;
    }
    const split = prefix.split(':');
    return `${split[0]}:${split[1]}`;
}
exports.toSIOPRegistrationDidMethod = toSIOPRegistrationDidMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlkSldULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0RpZEpXVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0o7QUFJdEosc0NBQWlFO0FBQ2pFLG9DQWlCa0I7QUFFbEIseUJBQThFO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXNCLFlBQVksQ0FBQyxHQUFXLEVBQUUsUUFBb0IsRUFBRSxPQUF5Qjs7UUFDN0YsT0FBTyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxrQkFBSSxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7SUFDbEQsQ0FBQztDQUFBO0FBRkQsb0NBRUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILFNBQXNCLFlBQVksQ0FDaEMsT0FBNEIsRUFDNUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWMsRUFDdkQsTUFBMEI7O1FBRTFCLE9BQU8sSUFBQSxtQkFBUyxFQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Q0FBQTtBQU5ELG9DQU1DO0FBRUQsU0FBc0IsaUJBQWlCLENBQ3JDLE9BQXNELEVBQ3RELElBQTREOztRQUU1RCxNQUFNLFVBQVUsR0FBRyxJQUFBLHNCQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksSUFBQSx5QkFBaUIsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFLLENBQUMsbUJBQVcsQ0FBQyxjQUFjLEVBQUUsbUJBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFD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