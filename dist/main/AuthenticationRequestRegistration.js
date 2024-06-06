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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestRegistration = exports.createRequestRegistrationPayload = exports.assertValidRequestRegistrationOpts = void 0;
const ajv_1 = __importDefault(require("ajv"));
const functions_1 = require("./functions");
const schemas_1 = require("./schemas");
const types_1 = require("./types");
const ajv = new ajv_1.default({ allowUnionTypes: true });
const validateRPRegistrationMetadata = ajv.compile(schemas_1.RPRegistrationMetadataPayloadSchema);
function assertValidRequestRegistrationOpts(opts) {
    if (!opts) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_NOT_SET);
    }
    else if (opts.registrationBy.type !== types_1.PassBy.REFERENCE && opts.registrationBy.type !== types_1.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.registrationBy.type === types_1.PassBy.REFERENCE && !opts.registrationBy.referenceUri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
}
exports.assertValidRequestRegistrationOpts = assertValidRequestRegistrationOpts;
function createRequestRegistrationPayload(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        assertValidRequestRegistrationOpts(opts);
        const regObj = createRPRegistrationMetadataPayload(opts);
        if (opts.registrationBy.referenceUri) {
            const regObjToValidate = (yield (0, functions_1.getWithUrl)(opts.registrationBy.referenceUri));
            if (!regObjToValidate || !validateRPRegistrationMetadata(regObjToValidate)) {
                throw new Error('Registration data validation error: ' + JSON.stringify(validateRPRegistrationMetadata.errors));
            }
        }
        if (opts.registrationBy.type == types_1.PassBy.VALUE) {
            return { registration: regObj };
        }
        else {
            return { registration_uri: opts.registrationBy.referenceUri };
        }
    });
}
exports.createRequestRegistrationPayload = createRequestRegistrationPayload;
function createRequestRegistration(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestRegistrationPayload = yield createRequestRegistrationPayload(opts);
        return {
            requestRegistrationPayload: requestRegistrationPayload,
            rpRegistrationMetadataPayload: createRPRegistrationMetadataPayload(opts),
            opts,
        };
    });
}
exports.createRequestRegistration = createRequestRegistration;
function createRPRegistrationMetadataPayload(opts) {
    const rpRegistrationMetadataPayload = {
        id_token_signing_alg_values_supported: opts.idTokenSigningAlgValuesSupported,
        request_object_signing_alg_values_supported: opts.requestObjectSigningAlgValuesSupported,
        response_types_supported: opts.responseTypesSupported,
        scopes_supported: opts.scopesSupported,
        subject_types_supported: opts.subjectTypesSupported,
        subject_syntax_types_supported: opts.subjectSyntaxTypesSupported || ['did:web:', 'did:ion:'],
        vp_formats: opts.vpFormatsSupported,
        client_name: opts.clientName,
        logo_uri: opts.logoUri,
        client_purpose: opts.clientPurpose,
        client_id: opts.clientId,
    };
    const languageTagEnabledFieldsNamesMapping = new Map();
    languageTagEnabledFieldsNamesMapping.set('clientName', 'client_name');
    languageTagEnabledFieldsNamesMapping.set('clientPurpose', 'client_purpose');
    const languageTaggedFields = functions_1.LanguageTagUtils.getLanguageTaggedPropertiesMapped(opts, languageTagEnabledFieldsNamesMapping);
    languageTaggedFields.forEach((value, key) => {
        rpRegistrationMetadataPayload[key] = value;
    });
    return rpRegistrationMetadataPayload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0UmVnaXN0cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vQXV0aGVudGljYXRpb25SZXF1ZXN0UmVnaXN0cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFzQjtBQUV0QiwyQ0FBMkQ7QUFDM0QsdUNBQWdFO0FBQ2hFLG1DQU9pQjtBQUVqQixNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyw2Q0FBbUMsQ0FBQyxDQUFDO0FBRXhGLFNBQWdCLGtDQUFrQyxDQUFDLElBQTZCO0lBQzlFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUssY0FBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxjQUFNLENBQUMsS0FBSyxFQUFFO1FBQ3JHLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0tBQzlEO1NBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxjQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7UUFDN0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDOUM7QUFDSCxDQUFDO0FBUkQsZ0ZBUUM7QUFFRCxTQUFzQixnQ0FBZ0MsQ0FBQyxJQUE2Qjs7UUFDbEYsa0NBQWtDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsTUFBTSxNQUFN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