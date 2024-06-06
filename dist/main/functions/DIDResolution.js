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
exports.resolveDidDocument = exports.mergeAllDidMethods = exports.getResolverUnion = exports.getResolver = void 0;
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const types_1 = require("../types");
const _1 = require("./");
function getResolver(opts) {
    if (opts && opts.resolver) {
        return opts.resolver;
    }
    if (!opts || !opts.subjectSyntaxTypesSupported) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const uniResolvers = [];
    if (opts.subjectSyntaxTypesSupported.indexOf(types_1.SubjectIdentifierType.DID) === -1) {
        const specificDidMethods = opts.subjectSyntaxTypesSupported.filter((sst) => sst.includes('did:'));
        if (!specificDidMethods.length) {
            throw new Error(types_1.SIOPErrors.NO_DID_METHOD_FOUND);
        }
        for (const didMethod of specificDidMethods) {
            const uniResolver = (0, did_uni_client_1.getUniResolver)((0, _1.getMethodFromDid)(didMethod), { resolveUrl: opts.resolveUrl });
            uniResolvers.push(uniResolver);
        }
        return new did_resolver_1.Resolver(...uniResolvers);
    }
    else {
        return new did_uni_client_1.UniResolver();
    }
}
exports.getResolver = getResolver;
/**
 * This method returns a resolver object in OP/RP
 * If the user of this library, configures OP/RP to have a customResolver, we will use that
 * If the user of this library configures OP/RP to use a custom resolver for any specific did method, we will use that
 * and in the end for the rest of the did methods, configured either with calling `addDidMethod` upon building OP/RP
 * (without any resolver configuration) or declaring in the subject_syntax_types_supported of the registration object
 * we will use universal resolver from Sphereon's DID Universal Resolver library
 * @param customResolver
 * @param subjectSyntaxTypesSupported
 * @param resolverMap
 */
function getResolverUnion(customResolver, subjectSyntaxTypesSupported, resolverMap) {
    if (customResolver) {
        return customResolver;
    }
    const fallbackResolver = customResolver ? customResolver : new did_uni_client_1.UniResolver();
    const uniResolvers = [];
    const subjectTypes = [];
    if (subjectSyntaxTypesSupported) {
        typeof subjectSyntaxTypesSupported === 'string'
            ? subjectTypes.push(subjectSyntaxTypesSupported)
            : subjectTypes.push(...subjectSyntaxTypesSupported);
    }
    if (subjectTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1) {
        return customResolver ? customResolver : new did_uni_client_1.UniResolver();
    }
    const specificDidMethods = subjectTypes.filter((sst) => !!sst && sst.startsWith('did:'));
    specificDidMethods.forEach((dm) => {
        let methodResolver;
        if (!resolverMap.has(dm) || resolverMap.get(dm) === null) {
            methodResolver = (0, did_uni_client_1.getUniResolver)((0, _1.getMethodFromDid)(dm));
        }
        else {
            methodResolver = resolverMap.get(dm);
        }
        uniResolvers.push(methodResolver);
    });
    return subjectTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1
        ? new did_resolver_1.Resolver(...Object.assign({ fallbackResolver }, uniResolvers))
        : new did_resolver_1.Resolver(...uniResolvers);
}
exports.getResolverUnion = getResolverUnion;
function mergeAllDidMethods(subjectSyntaxTypesSupported, resolvers) {
    if (!Array.isArray(subjectSyntaxTypesSupported)) {
        subjectSyntaxTypesSupported = [subjectSyntaxTypesSupported];
    }
    const unionSubjectSyntaxTypes = new Set();
    subjectSyntaxTypesSupported.forEach((sst) => unionSubjectSyntaxTypes.add(sst));
    resolvers.forEach((_, didMethod) => unionSubjectSyntaxTypes.add((0, _1.toSIOPRegistrationDidMethod)(didMethod)));
    return Array.from(unionSubjectSyntaxTypes);
}
exports.mergeAllDidMethods = mergeAllDidMethods;
function resolveDidDocument(did, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield getResolver(opts).resolve(did)).didDocument;
    });
}
exports.resolveDidDocument = resolveDidDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEUmVzb2x1dGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL2Z1bmN0aW9ucy9ESURSZXNvbHV0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZEQUF1RTtBQUN2RSwrQ0FBMEc7QUFFMUcsb0NBQTBIO0FBRTFILHlCQUFtRTtBQUVuRSxTQUFnQixXQUFXLENBQUMsSUFBaUI7SUFDM0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7SUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN4QztJQUVELE1BQU0sWUFBWSxHQUVaLEVBQUUsQ0FBQztJQUNULElBQUksSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyw2QkFBcUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsS0FBSyxNQUFNLFNBQVMsSUFBSSxrQkFBa0IsRUFBRTtZQUMxQyxNQUFNLFdBQVcsR0FBRyxJQUFBLCtCQUFjLEVBQUMsSUFBQSxtQkFBZ0IsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZ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