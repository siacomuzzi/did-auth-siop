"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTagUtils = void 0;
const language_tags_1 = __importDefault(require("language-tags"));
const types_1 = require("../types");
const ObjectUtils_1 = require("./ObjectUtils");
class LanguageTagUtils {
    /**
     * It will give back a fields which are language tag enabled. i.e. all fields with the fields names containing
     * language tags e.g. fieldName#nl-NL
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     */
    static getAllLanguageTaggedProperties(source) {
        return this.getLanguageTaggedPropertiesMapped(source, undefined);
    }
    /**
     * It will give back a fields which are language tag enabled and are listed in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNames the fields which are supposed to be language enabled. These are the only fields which should be returned.
     */
    static getLanguageTaggedProperties(source, requiredFieldNames) {
        const languageTagEnabledFieldsNamesMapping = new Map();
        requiredFieldNames.forEach((value) => languageTagEnabledFieldsNamesMapping.set(value, value));
        return this.getLanguageTaggedPropertiesMapped(source, languageTagEnabledFieldsNamesMapping);
    }
    /**
     * It will give back a fields which are language tag enabled and are mapped in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNamesMapping the fields which are supposed to be language enabled. These are the only fields which should be returned. And
     *                                  the fields names will be transformed as per the mapping provided.
     */
    static getLanguageTaggedPropertiesMapped(source, requiredFieldNamesMapping) {
        this.assertSourceIsWorthChecking(source);
        this.assertValidTargetFieldNames(requiredFieldNamesMapping);
        const discoveredLanguageTaggedFields = new Map();
        Object.entries(source).forEach(([key, value]) => {
            const languageTagSeparatorIndexInKey = key.indexOf(this.LANGUAGE_TAG_SEPARATOR);
            if (this.isFieldLanguageTagged(languageTagSeparatorIndexInKey)) {
                this.extractLanguageTaggedField(key, value, languageTagSeparatorIndexInKey, requiredFieldNamesMapping, discoveredLanguageTaggedFields);
            }
        });
        return discoveredLanguageTaggedFields;
    }
    static extractLanguageTaggedField(key, value, languageTagSeparatorIndexInKey, languageTagEnabledFieldsNamesMapping, languageTaggedFields) {
        const fieldName = this.getFieldName(key, languageTagSeparatorIndexInKey);
        const languageTag = this.getLanguageTag(key, languageTagSeparatorIndexInKey);
        if (language_tags_1.default.check(languageTag)) {
            if (languageTagEnabledFieldsNamesMapping === null || languageTagEnabledFieldsNamesMapping === void 0 ? void 0 : languageTagEnabledFieldsNamesMapping.size) {
                if (languageTagEnabledFieldsNamesMapping.has(fieldName)) {
                    languageTaggedFields.set(this.getMappedFieldName(languageTagEnabledFieldsNamesMapping, fieldName, languageTag), value);
                }
            }
            else {
                languageTaggedFields.set(key, value);
            }
        }
    }
    static getMappedFieldName(languageTagEnabledFieldsNamesMapping, fieldName, languageTag) {
        return languageTagEnabledFieldsNamesMapping.get(fieldName) + this.LANGUAGE_TAG_SEPARATOR + languageTag;
    }
    static getLanguageTag(key, languageTagSeparatorIndex) {
        return key.substring(languageTagSeparatorIndex + 1);
    }
    static getFieldName(key, languageTagSeparatorIndex) {
        return key.substring(0, languageTagSeparatorIndex);
    }
    /***
     * This function checks about the field to be language-tagged.
     *
     * @param languageTagSeparatorIndex
     * @private
     */
    static isFieldLanguageTagged(languageTagSeparatorIndex) {
        return languageTagSeparatorIndex > 0;
    }
    static assertValidTargetFieldNames(languageTagEnabledFieldsNamesMapping) {
        if (languageTagEnabledFieldsNamesMapping) {
            if (!languageTagEnabledFieldsNamesMapping.size) {
                throw new Error(types_1.SIOPErrors.BAD_PARAMS + ' LanguageTagEnabledFieldsNamesMapping must be non-null or non-empty');
            }
            else {
                for (const entry of languageTagEnabledFieldsNamesMapping.entries()) {
                    const key = entry[0];
                    const value = entry[1];
                    if ((0, ObjectUtils_1.isStringNullOrEmpty)(key) || (0, ObjectUtils_1.isStringNullOrEmpty)(value)) {
                        throw new Error(types_1.SIOPErrors.BAD_PARAMS + '. languageTagEnabledFieldsName must be non-null or non-empty');
                    }
                }
            }
        }
    }
    static assertSourceIsWorthChecking(source) {
        if (!source) {
            throw new Error(types_1.SIOPErrors.BAD_PARAMS + ' Source must be non-null i.e. not-initialized.');
        }
    }
}
exports.LanguageTagUtils = LanguageTagUtils;
LanguageTagUtils.LANGUAGE_TAG_SEPARATOR = '#';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VUYWdVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL2Z1bmN0aW9ucy9MYW5ndWFnZVRhZ1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUFpQztBQUVqQyxvQ0FBc0M7QUFFdEMsK0NBQW9EO0FBRXBELE1BQWEsZ0JBQWdCO0lBRzNCOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLDhCQUE4QixDQUFDLE1BQWU7UUFDbkQsT0FBTyxJQUFJLENBQUMsaUNBQWlDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxNQUFlLEVBQUUsa0JBQWlDO1FBQ25GLE1BQU0sb0NBQW9DLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQzVGLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlGLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLE1BQU0sRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsaUNBQWlDLENBQUMsTUFBZSxFQUFFLHlCQUE4QztRQUN0RyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFNUQsTUFBTSw4QkFBOEIsR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFFdEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzlDLE1BQU0sOEJBQThC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