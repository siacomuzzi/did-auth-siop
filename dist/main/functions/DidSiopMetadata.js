"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedCredentialsFormats = exports.assertValidMetadata = void 0;
const types_1 = require("../types");
function assertValidMetadata(opMetadata, rpMetadata) {
    let subjectSyntaxTypesSupported = [];
    const credentials = supportedCredentialsFormats(rpMetadata.vp_formats, opMetadata.vp_formats);
    const isValidSubjectSyntax = verifySubjectSyntaxes(rpMetadata.subject_syntax_types_supported);
    if (isValidSubjectSyntax && rpMetadata.subject_syntax_types_supported) {
        subjectSyntaxTypesSupported = supportedSubjectSyntaxTypes(rpMetadata.subject_syntax_types_supported, opMetadata.subject_syntax_types_supported);
    }
    else if (isValidSubjectSyntax && (!rpMetadata.subject_syntax_types_supported || !rpMetadata.subject_syntax_types_supported.length)) {
        if (opMetadata.subject_syntax_types_supported || opMetadata.subject_syntax_types_supported.length) {
            subjectSyntaxTypesSupported = [...opMetadata.subject_syntax_types_supported];
        }
    }
    return { vp_formats: credentials, subject_syntax_types_supported: subjectSyntaxTypesSupported };
}
exports.assertValidMetadata = assertValidMetadata;
function getIntersection(rpMetadata, opMetadata) {
    let arrayA, arrayB;
    if (!Array.isArray(rpMetadata)) {
        arrayA = [rpMetadata];
    }
    else {
        arrayA = rpMetadata;
    }
    if (!Array.isArray(opMetadata)) {
        arrayB = [opMetadata];
    }
    else {
        arrayB = opMetadata;
    }
    return arrayA.filter((value) => arrayB.includes(value));
}
function verifySubjectSyntaxes(subjectSyntaxTypesSupported) {
    if (subjectSyntaxTypesSupported.length) {
        if (Array.isArray(subjectSyntaxTypesSupported)) {
            if (subjectSyntaxTypesSupported.length ===
                subjectSyntaxTypesSupported.filter((sst) => sst.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) || sst === types_1.SubjectSyntaxTypesSupportedValues.JWK_THUMBPRINT.valueOf()).length) {
                return true;
            }
        }
    }
    return false;
}
function supportedSubjectSyntaxTypes(rpMethods, opMethods) {
    const rpMethodsList = Array.isArray(rpMethods) ? rpMethods : [rpMethods];
    const opMethodsList = Array.isArray(opMethods) ? opMethods : [opMethods];
    const supportedSubjectSyntaxTypes = getIntersection(rpMethodsList, opMethodsList);
    if (supportedSubjectSyntaxTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1) {
        return [types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()];
    }
    if (rpMethodsList.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf())) {
        const supportedExtendedDids = opMethodsList.filter((method) => method.startsWith('did:'));
        if (supportedExtendedDids.length) {
            return supportedExtendedDids;
        }
    }
    if (opMethodsList.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf())) {
        const supportedExtendedDids = rpMethodsList.filter((method) => method.startsWith('did:'));
        if (supportedExtendedDids.length) {
            return supportedExtendedDids;
        }
    }
    if (!supportedSubjectSyntaxTypes.length) {
        throw Error(types_1.SIOPErrors.DID_METHODS_NOT_SUPORTED);
    }
    const supportedDidMethods = supportedSubjectSyntaxTypes.filter((sst) => sst.includes('did:'));
    if (supportedDidMethods.length) {
        return supportedDidMethods;
    }
    return supportedSubjectSyntaxTypes;
}
function getFormatIntersection(rpFormat, opFormat) {
    const intersectionFormat = {};
    const supportedCredentials = getIntersection(Object.keys(rpFormat), Object.keys(opFormat));
    if (!supportedCredentials.length) {
        throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
    }
    supportedCredentials.forEach(function (crFormat) {
        const rpAlgs = [];
        const opAlgs = [];
        Object.keys(rpFormat[crFormat]).forEach((k) => rpAlgs.push(...rpFormat[crFormat][k]));
        Object.keys(opFormat[crFormat]).forEach((k) => opAlgs.push(...opFormat[crFormat][k]));
        let methodKeyRP = undefined;
        let methodKeyOP = undefined;
        Object.keys(rpFormat[crFormat]).forEach((k) => (methodKeyRP = k));
        Object.keys(opFormat[crFormat]).forEach((k) => (methodKeyOP = k));
        if (methodKeyRP !== methodKeyOP) {
            throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
        }
        const algs = getIntersection(rpAlgs, opAlgs);
        if (!algs.length) {
            throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
        }
        intersectionFormat[crFormat] = {};
        intersectionFormat[crFormat][methodKeyOP] = algs;
    });
    return intersectionFormat;
}
function supportedCredentialsFormats(rpFormat, opFormat) {
    if (!rpFormat || !opFormat || !Object.keys(rpFormat).length || !Object.keys(opFormat).length) {
        throw new Error(types_1.SIOPErrors.CREDENTIALS_FORMATS_NOT_PROVIDED);
    }
    return getFormatIntersection(rpFormat, opFormat);
}
exports.supportedCredentialsFormats = supportedCredentialsFormats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlkU2lvcE1ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0RpZFNpb3BNZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxvQ0FNa0I7QUFFbEIsU0FBZ0IsbUJBQW1CLENBQUMsVUFBb0MsRUFBRSxVQUF5QztJQUNqSCxJQUFJLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RixNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlGLElBQUksb0JBQW9CLElBQUksVUFBVSxDQUFDLDhCQUE4QixFQUFFO1FBQ3JFLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztLQUNqSjtTQUFNLElBQUksb0JBQW9CLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwSSxJQUFJLFVBQVUsQ0FBQyw4QkFBOEIsSUFBSSxVQUFVLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFFO1lBQ2pHLDJCQUEyQixHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztTQUM5RTtLQUNGO0lBQ0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztBQUNsRyxDQUFDO0FBWkQsa0RBWUM7QUFFRCxTQUFTLGVBQWUsQ0FBSSxVQUF3QixFQUFFLFVBQXdCO0lBQzVFLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM5QixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2QjtTQUFNO1FBQ0wsTUFBTSxHQUFHLFVBQVUsQ0FBQztLQUNyQjtJQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZCO1NBQU07UUFDTCxNQUFNLEdBQUcsVUFBVSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsMkJBQXFDO0lBQ2xFLElBQUksMkJBQTJCLENBQUMsTUFBTSxFQUFFO1FBQ3RDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO1lBQzlDLElBQ0UsMkJBQTJCLENBQUMsTUFBTTtnQkFDbEMsMkJBQTJCLENBQUMsTUFBTSxDQUNoQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyx5Q0FBaUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUsseUNBQWlDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUM3SSxDQUFDLE1BQU0sRUFDUjtnQkFDQSxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsMkJBQTJCLENBQUMsU0FBNEIsRUFBRSxTQUE0QjtJQUM3RixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sMkJBQTJCLEdBQUcsZUFBZSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsRixJQUFJLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyx5Q0FBaUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvRixPQUFPLENBQUMseUNBQWlDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDMUQ7SUFDRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMseUNBQWlDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDM0UsTUFBTSxxQkFBcUIsR0FBYSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsT0FBTyxxQkFBcUIsQ0FBQztTQUM5QjtLQUNGO0lBQ0QsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLHlDQUFpQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1FBQzNFLE1BQU0scUJBQXFCLEdBQWEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFO1lBQ2hDLE9BQU8scUJBQXFCLENBQUM7U0FDOUI7S0FDRjtJQUVELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLEVBQUU7UUFDdkMsTUFBTSxLQUFLLENBQUMsa0JBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RixJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtRQUM5QixPQUFPLG1CQUFtQixDQUFDO0tBQzVCO0lBQ0QsT0FBTywyQkFBMkIsQ0FBQztBQUNyQyxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxRQUFnQixFQUFFLFFBQWdCO0lBQy9ELE1BQU0sa0JBQWtCLEdBQVcsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7S0FDOUQ7SUFDRCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFnQjtRQUNyRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQzlEO1FBQ0Qsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQWdCLDJCQUEyQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7SUFDNUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDNUYsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7S0FDOUQ7SUFDRCxPQUFPLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBTEQsa0VBS0MifQ==