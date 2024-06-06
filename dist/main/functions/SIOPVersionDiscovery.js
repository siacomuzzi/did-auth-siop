"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRequestVersionDiscovery = void 0;
const ajv_1 = __importDefault(require("ajv"));
const schemas_1 = require("../schemas");
const types_1 = require("../types");
const Errors_1 = __importDefault(require("../types/Errors"));
function authenticationRequestVersionDiscovery(authenticationRequestPayload) {
    const authenticationRequestPayloadCopy = JSON.parse(JSON.stringify(authenticationRequestPayload));
    const ajv = new ajv_1.default({ verbose: true, allowUnionTypes: true, allErrors: true });
    const validateID1 = ajv.compile(schemas_1.AuthenticationRequestPayloadSchemaVID1);
    let result = validateID1(authenticationRequestPayloadCopy);
    if (result) {
        return types_1.SupportedVersion.SIOPv2_ID1;
    }
    const validateJWTVCPresentationProfile = ajv.compile(schemas_1.AuthenticationRequestPayloadSchemaVID1);
    result = validateJWTVCPresentationProfile(authenticationRequestPayloadCopy);
    if (result) {
        return types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1;
    }
    const validateD11 = ajv.compile(schemas_1.AuthenticationRequestPayloadSchemaVD11);
    result = validateD11(authenticationRequestPayloadCopy);
    if (result) {
        return types_1.SupportedVersion.SIOPv2_D11;
    }
    throw new Error(Errors_1.default.SIOP_VERSION_NOT_SUPPORTED);
}
exports.authenticationRequestVersionDiscovery = authenticationRequestVersionDiscovery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lPUFZlcnNpb25EaXNjb3ZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9mdW5jdGlvbnMvU0lPUFZlcnNpb25EaXNjb3ZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQXNCO0FBRXRCLHdDQUE0RztBQUM1RyxvQ0FBMEU7QUFDMUUsNkRBQXFDO0FBRXJDLFNBQWdCLHFDQUFxQyxDQUFDLDRCQUEwRDtJQUM5RyxNQUFNLGdDQUFnQyxHQUFpQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQ2hJLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0RBQXNDLENBQUMsQ0FBQztJQUN4RSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUMzRCxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU8sd0JBQWdCLENBQUMsVUFBVSxDQUFDO0tBQ3BDO0lBQ0QsTUFBTSxnQ0FBZ0MsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdEQUFzQyxDQUFDLENBQUM7SUFDN0YsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxNQUFNLEVBQUU7UUFDVixPQUFPLHdCQUFnQixDQUFDLDhCQUE4QixDQUFDO0tBQ3hEO0lBQ0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnREFBc0MsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sR0FBRyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUN2RCxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU8sd0JBQWdCLENBQUMsVUFBVSxDQUFDO0tBQ3BDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDckQsQ0FBQztBQW5CRCxzRkFtQkMifQ==