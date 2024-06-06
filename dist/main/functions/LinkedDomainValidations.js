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
exports.validateLinkedDomainWithDid = void 0;
const wellknown_dids_client_1 = require("@sphereon/wellknown-dids-client");
const types_1 = require("../types");
const DIDResolution_1 = require("./DIDResolution");
function getValidationErrorMessages(validationResult) {
    const messages = [];
    if (validationResult.message) {
        messages.push(validationResult.message);
    }
    if (validationResult === null || validationResult === void 0 ? void 0 : validationResult.endpointDescriptors.length) {
        for (const endpointDescriptor of validationResult.endpointDescriptors) {
            if (endpointDescriptor.message) {
                messages.push(endpointDescriptor.message);
            }
            if (endpointDescriptor.resources) {
                for (const resource of endpointDescriptor.resources) {
                    if (resource.message) {
                        messages.push(resource.message);
                    }
                }
            }
        }
    }
    return messages;
}
/**
 * @param validationErrorMessages
 * @return returns false if the messages received from wellknown-dids-client makes this invalid for CheckLinkedDomain.IF_PRESENT plus the message itself
 *                  and true for when we can move on
 */
function checkInvalidMessages(validationErrorMessages) {
    if (!validationErrorMessages || !validationErrorMessages.length) {
        return { status: false, message: 'linked domain is invalid.' };
    }
    const validMessages = [
        wellknown_dids_client_1.WDCErrors.PROPERTY_LINKED_DIDS_DOES_NOT_CONTAIN_ANY_DOMAIN_LINK_CREDENTIALS.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_LINKED_DIDS_NOT_PRESENT.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_TYPE_NOT_CONTAIN_VALID_LINKED_DOMAIN.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_SERVICE_NOT_PRESENT.valueOf(),
    ];
    for (const validationErrorMessage of validationErrorMessages) {
        if (!validMessages.filter((vm) => validationErrorMessage.includes(vm)).pop()) {
            return { status: false, message: validationErrorMessage };
        }
    }
    return { status: true };
}
function validateLinkedDomainWithDid(did, verifyCallback, checkLinkedDomain, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        //const didDocument = await resolveDidDocument(did, { subjectSyntaxTypesSupported: [toSIOPRegistrationDidMethod(getMethodFromDid(did))] });
        const didDocument = yield (0, DIDResolution_1.resolveDidDocument)(did, opts);
        try {
            const validationResult = yield checkWellKnownDid({ didDocument, verifyCallback });
            if (validationResult.status === wellknown_dids_client_1.ValidationStatusEnum.INVALID) {
                const validationErrorMessages = getValidationErrorMessages(validationResult);
                const messageCondition = checkInvalidMessages(validationErrorMessages);
                if (checkLinkedDomain === types_1.CheckLinkedDomain.ALWAYS || (checkLinkedDomain === types_1.CheckLinkedDomain.IF_PRESENT && !messageCondition.status)) {
                    throw new Error(messageCondition.message ? messageCondition.message : validationErrorMessages[0]);
                }
            }
        }
        catch (err) {
            const messageCondition = checkInvalidMessages([err.message]);
            if (checkLinkedDomain === types_1.CheckLinkedDomain.ALWAYS || (checkLinkedDomain === types_1.CheckLinkedDomain.IF_PRESENT && !messageCondition.status)) {
                throw new Error(err.message);
            }
        }
    });
}
exports.validateLinkedDomainWithDid = validateLinkedDomainWithDid;
function checkWellKnownDid(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifier = new wellknown_dids_client_1.WellKnownDidVerifier({
            verifySignatureCallback: args.verifyCallback,
            onlyVerifyServiceDid: false,
        });
        return yield verifier.verifyDomainLinkage({ didDocument: args.didDocument });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlua2VkRG9tYWluVmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9mdW5jdGlvbnMvTGlua2VkRG9tYWluVmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQWtKO0FBRWxKLG9DQUF1RTtBQUV2RSxtREFBcUQ7QUFFckQsU0FBUywwQkFBMEIsQ0FBQyxnQkFBMEM7SUFDNUUsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7SUFDRCxJQUFJLGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtRQUNoRCxLQUFLLE1BQU0sa0JBQWtCLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUU7WUFDckUsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0M7WUFDRCxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRTtnQkFDaEMsS0FBSyxNQUFNLFFBQVEsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7b0JBQ25ELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTt3QkFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2pDO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLG9CQUFvQixDQUFDLHVCQUFpQztJQUM3RCxJQUFJLENBQUMsdUJBQXVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUU7UUFD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