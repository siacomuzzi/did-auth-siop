"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumbprint = exports.getThumbprintFromJwk = exports.getPublicJWKFromHexPrivateKey = exports.getPublicED25519JWKFromHexPrivateKey = exports.getBase58PrivateKeyFromHexPrivateKey = exports.isEd25519JWK = exports.isEd25519DidKeyMethod = void 0;
// import { keyUtils as ed25519KeyUtils } from '@transmute/did-key-ed25519';
const base64url_1 = __importDefault(require("base64url"));
const bs58 = __importStar(require("bs58"));
const elliptic_1 = require("elliptic");
const jose_1 = require("jose");
const types_1 = require("../types");
const ED25519_DID_KEY = 'did:key:z6Mk';
function isEd25519DidKeyMethod(did) {
    return did && did.includes(ED25519_DID_KEY);
}
exports.isEd25519DidKeyMethod = isEd25519DidKeyMethod;
function isEd25519JWK(jwk) {
    return jwk && !!jwk.crv && jwk.crv === types_1.KeyCurve.ED25519;
}
exports.isEd25519JWK = isEd25519JWK;
function getBase58PrivateKeyFromHexPrivateKey(hexPrivateKey) {
    return bs58.encode(Buffer.from(hexPrivateKey, 'hex'));
}
exports.getBase58PrivateKeyFromHexPrivateKey = getBase58PrivateKeyFromHexPrivateKey;
function getPublicED25519JWKFromHexPrivateKey(hexPrivateKey, kid) {
    const ec = new elliptic_1.ec('ed25519');
    const privKey = ec.keyFromPrivate(hexPrivateKey);
    const pubPoint = privKey.getPublic();
    return toJWK(kid, types_1.KeyCurve.ED25519, pubPoint);
}
exports.getPublicED25519JWKFromHexPrivateKey = getPublicED25519JWKFromHexPrivateKey;
function getPublicSECP256k1JWKFromHexPrivateKey(hexPrivateKey, kid) {
    const ec = new elliptic_1.ec('secp256k1');
    const privKey = ec.keyFromPrivate(hexPrivateKey.replace('0x', ''), 'hex');
    const pubPoint = privKey.getPublic();
    return toJWK(kid, types_1.KeyCurve.SECP256k1, pubPoint);
}
function getPublicJWKFromHexPrivateKey(hexPrivateKey, kid, did) {
    if (isEd25519DidKeyMethod(did)) {
        return getPublicED25519JWKFromHexPrivateKey(hexPrivateKey, kid);
    }
    return getPublicSECP256k1JWKFromHexPrivateKey(hexPrivateKey, kid);
}
exports.getPublicJWKFromHexPrivateKey = getPublicJWKFromHexPrivateKey;
function toJWK(kid, crv, pubPoint) {
    return {
        kid,
        kty: types_1.KeyType.EC,
        crv: crv,
        x: base64url_1.default.toBase64(pubPoint.getX().toArrayLike(Buffer)),
        y: base64url_1.default.toBase64(pubPoint.getY().toArrayLike(Buffer)),
    };
}
// from fingerprintFromPublicKey function in @transmute/Ed25519KeyPair
function getThumbprintFromJwkDIDKeyImpl(jwk) {
    // ed25519 cryptonyms are multicodec encoded values, specifically:
    // (multicodec ed25519-pub 0xed01 + key bytes)
    const pubkeyBytes = base64url_1.default.toBuffer(jwk.x);
    const buffer = new Uint8Array(2 + pubkeyBytes.length);
    buffer[0] = 0xed;
    buffer[1] = 0x01;
    buffer.set(pubkeyBytes, 2);
    // prefix with `z` to indicate multi-base encodingFormat
    return `z${bs58.encode(buffer)}`;
}
function getThumbprintFromJwk(jwk, did) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isEd25519DidKeyMethod(did)) {
            return getThumbprintFromJwkDIDKeyImpl(jwk);
        }
        else {
            return yield (0, jose_1.calculateJwkThumbprint)(jwk, 'sha256');
        }
    });
}
exports.getThumbprintFromJwk = getThumbprintFromJwk;
function getThumbprint(hexPrivateKey, did) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getThumbprintFromJwk(isEd25519DidKeyMethod(did) ? getPublicED25519JWKFromHexPrivateKey(hexPrivateKey) : getPublicJWKFromHexPrivateKey(hexPrivateKey), did);
    });
}
exports.getThumbprint = getThumbprint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL2Z1bmN0aW9ucy9LZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQTRFO0FBQzVFLDBEQUFrQztBQUNsQywyQ0FBNkI7QUFDN0IsdUNBQW9DO0FBQ3BDLCtCQUFtRDtBQUVuRCxvQ0FBNkM7QUFFN0MsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDO0FBRXZDLFNBQWdCLHFCQUFxQixDQUFDLEdBQVk7SUFDaEQsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsc0RBRUM7QUFFRCxTQUFnQixZQUFZLENBQUMsR0FBUTtJQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLGdCQUFRLENBQUMsT0FBTyxDQUFDO0FBQzFELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLG9DQUFvQyxDQUFDLGFBQXFCO0lBQ3hFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGRCxvRkFFQztBQUVELFNBQWdCLG9DQUFvQyxDQUFDLGFBQXFCLEVBQUUsR0FBWTtJQUN0RixNQUFNLEVBQUUsR0FBRyxJQUFJLGFBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVyQyxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENB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