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
exports.PresentationExchange = void 0;
const pex_1 = require("@sphereon/pex");
const ssi_types_1 = require("@sphereon/ssi-types");
const functions_1 = require("./functions");
const types_1 = require("./types");
class PresentationExchange {
    constructor(opts) {
        this.pex = new pex_1.PEX();
        this.did = opts.did;
        this.allVerifiableCredentials = opts.allVerifiableCredentials;
    }
    /**
     * Construct presentation submission from selected credentials
     * @param presentationDefinition: payload object received by the OP from the RP
     * @param selectedCredentials
     * @param options
     * @param presentationSignCallback
     */
    submissionFrom(presentationDefinition, selectedCredentials, options, presentationSignCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            const challenge = options === null || options === void 0 ? void 0 : options.nonce;
            const domain = options === null || options === void 0 ? void 0 : options.domain;
            // fixme: this needs to be configurable
            const signOptions = {
                proofOptions: {
                    proofPurpose: ssi_types_1.IProofPurpose.authentication,
                    type: ssi_types_1.IProofType.EcdsaSecp256k1Signature2019,
                    challenge,
                    domain,
                },
                signatureOptions: {
                    verificationMethod: `${this.did}#key`,
                    keyEncoding: pex_1.KeyEncoding.Hex,
                },
            };
            return this.pex.verifiablePresentationFromAsync(presentationDefinition, selectedCredentials, presentationSignCallback, signOptions);
        });
    }
    /**
     * This method will be called from the OP when we are certain that we have a
     * PresentationDefinition object inside our requestPayload
     * Finds a set of `VerifiableCredential`s from a list supplied to this class during construction,
     * matching presentationDefinition object found in the requestPayload
     * if requestPayload doesn't contain any valid presentationDefinition throws an error
     * if PEX library returns any error in the process, throws the error
     * returns the SelectResults object if successful
     * @param presentationDefinition: object received by the OP from the RP
     */
    selectVerifiableCredentialsForSubmission(presentationDefinition) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            else if (!this.allVerifiableCredentials || this.allVerifiableCredentials.length == 0) {
                throw new Error(`${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, no VCs were provided`);
            }
            const selectResults = this.pex.selectFrom(presentationDefinition, 
            // fixme holder dids and limited disclosure
            this.allVerifiableCredentials, [this.did], []);
            if (selectResults.areRequiredCredentialsPresent == pex_1.Status.ERROR) {
                throw new Error(`message: ${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, details: ${JSON.stringify(selectResults.errors)}`);
            }
            return selectResults;
        });
    }
    /**
     * validatePresentationAgainstDefinition function is called mainly by the RP
     * after receiving the VP from the OP
     * @param presentationDefinition: object containing PD
     * @param verifiablePresentation:
     */
    static validatePresentationAgainstDefinition(presentationDefinition, verifiablePresentation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            const evaluationResults = new pex_1.PEX().evaluatePresentation(presentationDefinition, verifiablePresentation);
            if (evaluationResults.errors.length) {
                throw new Error(`message: ${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, details: ${JSON.stringify(evaluationResults.errors)}`);
            }
            return evaluationResults;
        });
    }
    static assertValidPresentationSubmission(presentationSubmission) {
        const validationResult = new pex_1.PEX().validateSubmission(presentationSubmission);
        if (validationResult[0].message != 'ok') {
            throw new Error(`${types_1.SIOPErrors.RESPONSE_OPTS_PRESENTATIONS_SUBMISSION_IS_NOT_VALID}, details ${JSON.stringify(validationResult[0])}`);
        }
    }
    /**
     * Finds a valid PresentationDefinition inside the given AuthenticationRequestPayload
     * throws exception if the PresentationDefinition is not valid
     * returns null if no property named "presentation_definition" is found
     * returns a PresentationDefinition if a valid instance found
     * @param obj: object that can have a presentation_definition inside
     */
    static findValidPresentationDefinitions(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const allDefinitions = [];
            function extractPDFromVPToken() {
                return __awaiter(this, void 0, void 0, function* () {
                    const vpTokens = (0, functions_1.extractDataFromPath)(obj, '$..vp_token.presentation_definition');
                    const vpTokenRefs = (0, functions_1.extractDataFromPath)(obj, '$..vp_token.presentation_definition_uri');
                    if (vpTokens && vpTokens.length && vpTokenRefs && vpTokenRefs.length) {
                        throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_BY_REF_AND_VALUE_NON_EXCLUSIVE);
                    }
                    if (vpTokens && vpTokens.length) {
                        vpTokens.forEach((vpToken) => {
                            PresentationExchange.assertValidPresentationDefinition(vpToken.value);
                            allDefinitions.push({ definition: vpToken.value, location: types_1.PresentationLocation.VP_TOKEN });
                        });
                    }
                    else if (vpTokenRefs && vpTokenRefs.length) {
                        for (const vpTokenRef of vpTokenRefs) {
                            const pd = (yield (0, functions_1.getWithUrl)(vpTokenRef.value));
                            PresentationExchange.assertValidPresentationDefinition(pd);
                            allDefinitions.push({ definition: pd, location: types_1.PresentationLocation.VP_TOKEN });
                        }
                    }
                });
            }
            function addSingleIdTokenPDToPDs(definition) {
                PresentationExchange.assertValidPresentationDefinition(definition);
                allDefinitions.push({ definition: definition, location: types_1.PresentationLocation.ID_TOKEN });
            }
            function extractPDFromOtherTokens() {
                return __awaiter(this, void 0, void 0, function* () {
                    const definitions = (0, functions_1.extractDataFromPath)(obj, '$..verifiable_presentations.presentation_definition');
                    const definitionsFromList = (0, functions_1.extractDataFromPath)(obj, '$..verifiable_presentations[*].presentation_definition');
                    const definitionRefs = (0, functions_1.extractDataFromPath)(obj, '$..verifiable_presentations.presentation_definition_uri');
                    const definitionRefsFromList = (0, functions_1.extractDataFromPath)(obj, '$..verifiable_presentations.presentation_definition_uri');
                    const hasPD = (definitions && definitions.length > 0) || (definitionsFromList && definitionsFromList > 0);
                    const hasPdRef = (definitionRefs && definitionRefs.length > 0) || (definitionRefsFromList && definitionsFromList > 0);
                    if (hasPD && hasPdRef) {
                        throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_BY_REF_AND_VALUE_NON_EXCLUSIVE);
                    }
                    if (definitions && definitions.length > 0) {
                        definitions.forEach((definition) => {
                            addSingleIdTokenPDToPDs(definition.value);
                        });
                    }
                    else if (definitionsFromList && definitionsFromList.length > 0) {
                        definitionsFromList.forEach((definition) => {
                            addSingleIdTokenPDToPDs(definition.value);
                        });
                    }
                    else if (definitionRefs && definitionRefs.length > 0) {
                        for (const definitionRef of definitionRefs) {
                            const pd = (yield (0, functions_1.getWithUrl)(definitionRef.value));
                            addSingleIdTokenPDToPDs(pd);
                        }
                    }
                    else if (definitionsFromList && definitionRefsFromList.length > 0) {
                        for (const definitionRef of definitionRefsFromList) {
                            const pd = (yield (0, functions_1.getWithUrl)(definitionRef.value));
                            addSingleIdTokenPDToPDs(pd);
                        }
                    }
                });
            }
            if (obj) {
                yield extractPDFromVPToken();
                yield extractPDFromOtherTokens();
            }
            return allDefinitions;
        });
    }
    static assertValidPresentationDefinitionWithLocations(definitionsWithLocations) {
        if (definitionsWithLocations && definitionsWithLocations.length > 0) {
            definitionsWithLocations.forEach((definitionWithLocation) => PresentationExchange.assertValidPresentationDefinition(definitionWithLocation.definition));
        }
    }
    static assertValidPresentationDefinitionWithLocation(defintionWithLocation) {
        if (defintionWithLocation && defintionWithLocation.definition) {
            PresentationExchange.assertValidPresentationDefinition(defintionWithLocation.definition);
        }
    }
    static assertValidPresentationDefinition(presentationDefinition) {
        const validationResult = new pex_1.PEX().validateDefinition(presentationDefinition);
        // TODO: fix this in PEX library, according to the spec, `schema.uri` can be any kind of string
        // See https://identity.foundation/presentation-exchange/spec/v1.0.0/#json-schema-2
        if (validationResult[0].message != 'ok' && validationResult[0].message != 'schema should have valid URI') {
            throw new Error(`${types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID}`);
        }
    }
    static validatePayloadsAgainstDefinitions(definitions, vpPayloads, presentationSubmission, verifyPresentationCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!definitions || !vpPayloads || !definitions.length || definitions.length !== vpPayloads.length) {
                throw new Error(types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD);
            }
            yield Promise.all(definitions.map((pd) => __awaiter(this, void 0, void 0, function* () { return yield PresentationExchange.validatePayloadAgainstDefinitions(pd.definition, vpPayloads, presentationSubmission, verifyPresentationCallback); })));
        });
    }
    static validatePayloadAgainstDefinitions(definition, vpPayloads, presentationSubmission, verifyPresentationCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            function filterValidPresentations() {
                //TODO: add support for multiple VPs here
                return vpPayloads.filter((vpw) => __awaiter(this, void 0, void 0, function* () {
                    const presentation = vpw.presentation;
                    // The verifyPresentationCallback function is mandatory for RP only,
                    // So the behavior here is to bypass it if not present
                    if (verifyPresentationCallback) {
                        try {
                            yield verifyPresentationCallback(Object.assign({}, vpw));
                        }
                        catch (error) {
                            throw new Error(types_1.SIOPErrors.VERIFIABLE_PRESENTATION_SIGNATURE_NOT_VALID);
                        }
                    }
                    // fixme: Limited disclosure suites
                    const evaluationResults = presentationSubmission
                        ? new pex_1.PEX().evaluatePresentation(definition, Object.assign({ presentationSubmission }, presentation), [])
                        : new pex_1.PEX().evaluatePresentation(definition, Object.assign({}, presentation), []);
                    const submission = evaluationResults.value;
                    if (!presentation || !submission) {
                        throw new Error(types_1.SIOPErrors.NO_PRESENTATION_SUBMISSION);
                    }
                    return submission && submission.definition_id === definition.id;
                }));
            }
            const checkedPresentations = filterValidPresentations();
            if (!checkedPresentations.length || checkedPresentations.length != 1) {
                throw new Error(`${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}`);
            }
            const presentation = checkedPresentations[0].presentation;
            // fixme: Limited disclosure suites
            const evaluationResults = new pex_1.PEX().evaluatePresentation(definition, presentation, []);
            PresentationExchange.assertValidPresentationSubmission(evaluationResults.value);
            yield PresentationExchange.validatePresentationAgainstDefinition(definition, presentation);
        });
    }
}
exports.PresentationExchange = PresentationExchange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlc2VudGF0aW9uRXhjaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9QcmVzZW50YXRpb25FeGNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNkk7QUFFN0ksbURBQW1JO0FBRW5JLDJDQUE4RDtBQUM5RCxtQ0FRaUI7QUFFakIsTUFBYSxvQkFBb0I7SUFLL0IsWUFBWSxJQUEwRTtRQUo3RSxRQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUt2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsY0FBYyxDQUN6QixzQkFBK0MsRUFDL0MsbUJBQThDLEVBQzlDLE9BQTZDLEVBQzdDLHdCQUFtRDs7WUFFbkQsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUM5RTtZQUVELE1BQU0sU0FBUyxHQUFXLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLENBQUM7WUFDekMsTUFBTSxNQUFNLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sQ0FBQztZQUV2Qyx1Q0FBdUM7WUFDdkMsTUFBTSxXQUFXLEdBQTRCO2dCQUMzQyxZQUFZLEVBQUU7b0JBQ1osWUFBWSxFQUFFLHlCQUFhLENBQUMsY0FBYztvQkFDMUMsSUFBSSxFQUFFLHNCQUFVLENBQUMsMkJBQTJCO29CQUM1QyxTQUFTO29CQUNULE1BQU07aUJBQ1A7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTTtvQkFDckMsV0FBVyxFQUFFLGlCQUFX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