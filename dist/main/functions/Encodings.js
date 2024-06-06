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
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64urlEncodeBuffer = exports.fromBase64 = exports.base58ToBase64String = exports.isHexString = exports.bytesFromHexString = exports.base64ToBytes = exports.base64ToHexString = exports.encodeJsonAsURI = exports.decodeUriAsJson = exports.bytesToHexString = void 0;
const querystring_1 = require("querystring");
const bs58 = __importStar(require("bs58"));
const u8a = __importStar(require("uint8arrays"));
const types_1 = require("../types");
function bytesToHexString(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
exports.bytesToHexString = bytesToHexString;
function decodeUriAsJson(uri) {
    if (!uri || !uri.includes('openid')) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const parts = (0, querystring_1.parse)(uri);
    const json = {};
    for (const key in parts) {
        const value = parts[key];
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        if (isBool || isNumber) {
            json[decodeURIComponent(key)] = value;
        }
        else if (isString) {
            const decoded = decodeURIComponent(value);
            if (decoded.startsWith('{') && decoded.endsWith('}')) {
                json[decodeURIComponent(key)] = JSON.parse(decoded);
            }
            else {
                json[decodeURIComponent(key)] = decoded;
            }
        }
    }
    return json;
}
exports.decodeUriAsJson = decodeUriAsJson;
function encodeJsonAsURI(json) {
    if (typeof json === 'string') {
        return encodeJsonAsURI(JSON.parse(json));
    }
    const results = [];
    function encodeAndStripWhitespace(key) {
        return encodeURIComponent(key.replace(' ', ''));
    }
    for (const [key, value] of Object.entries(json)) {
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        let encoded;
        if (isBool || isNumber) {
            encoded = `${encodeAndStripWhitespace(key)}=${value}`;
        }
        else if (isString) {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(value)}`;
        }
        else {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(JSON.stringify(value))}`;
        }
        results.push(encoded);
    }
    return results.join('&');
}
exports.encodeJsonAsURI = encodeJsonAsURI;
function base64ToHexString(input) {
    return Buffer.from(input, 'base64').toString('hex');
}
exports.base64ToHexString = base64ToHexString;
function base64ToBytes(s) {
    const inputBase64Url = s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return u8a.fromString(inputBase64Url, 'base64url');
}
exports.base64ToBytes = base64ToBytes;
function bytesFromHexString(hexString) {
    const match = hexString.match(/.{1,2}/g);
    if (!match) {
        throw new Error('String does not seem to be in HEX');
    }
    return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
}
exports.bytesFromHexString = bytesFromHexString;
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^[0-9A-Fa-f]*$/g)) {
        return false;
    }
    else if (length && value.length !== 2 * length) {
        return false;
    }
    return true;
}
exports.isHexString = isHexString;
function base58ToBase64String(base58) {
    return Buffer.from(bs58.decode(base58)).toString('base64');
}
exports.base58ToBase64String = base58ToBase64String;
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
exports.fromBase64 = fromBase64;
function base64urlEncodeBuffer(buf) {
    return fromBase64(buf.toString('base64'));
}
exports.base64urlEncodeBuffer = base64urlEncodeBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5jb2RpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0VuY29kaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFvQztBQUVwQywyQ0FBNkI7QUFDN0IsaURBQW1DO0FBRW5DLG9DQUFzQztBQUV0QyxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFpQjtJQUNoRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFGRCw0Q0FFQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFXO0lBQ3pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN4QztJQUNELE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV6QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDdkIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixTQUFTO1NBQ1Y7UUFDRCxNQUFNLE1BQU0sR0FBRyxPQUFPLEtBQUssSUFBSSxTQUFTLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDO1FBQzFDLE1BQU0sUUFBUSxHQUFHLE9BQU8sS0FBSyxJQUFJ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