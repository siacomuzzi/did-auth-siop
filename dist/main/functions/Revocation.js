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
exports.verifyRevocation = void 0;
const types_1 = require("../types");
const verifyRevocation = (vpToken, revocationVerificationCallback, revocationVerification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!vpToken) {
        throw new Error(`VP token not provided`);
    }
    if (!revocationVerificationCallback) {
        throw new Error(`Revocation callback not provided`);
    }
    switch (vpToken.format) {
        case types_1.VerifiablePresentationTypeFormat.LDP_VP: {
            for (const vc of vpToken.presentation.verifiableCredential) {
                if (revocationVerification === types_1.RevocationVerification.ALWAYS ||
                    (revocationVerification === types_1.RevocationVerification.IF_PRESENT && vc.credentialStatus)) {
                    const result = yield revocationVerificationCallback(vc, types_1.VerifiableCredentialTypeFormat.LDP_VC);
                    if (result.status === types_1.RevocationStatus.INVALID) {
                        throw new Error(`Revocation invalid for vc: ${vc.id}. Error: ${result.error}`);
                    }
                }
            }
            break;
        }
        case types_1.VerifiablePresentationTypeFormat.JWT_VP: {
            // TODO create implementation for JWT status-list-2021 verification, we already have a callback, but we also need to parse the vp token
            break;
        }
        default:
            throw new Error(`VP format not supported`);
    }
});
exports.verifyRevocation = verifyRevocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmV2b2NhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL2Z1bmN0aW9ucy9SZXZvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLG9DQU9rQjtBQUVYLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDOUIsT0FBc0MsRUFDdEMsOEJBQThELEVBQzlELHNCQUE4QyxFQUMvQixFQUFFO0lBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLENBQUMsOEJBQThCLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3RCLEtBQUssd0NBQWdDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsS0FBSyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFO2dCQUMxRCxJQUNFLHNCQUFzQixLQUFLLDhCQUFzQixDQUFDLE1BQU07b0JBQ3hELENBQUMsc0JBQXNCLEtBQUssOEJBQXNCLENBQUMsVUFBVSxJQUE0QixFQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFDOUc7b0JBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSw4QkFBOEIsQ0FBd0IsRUFBRSxFQUFFLHNDQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0SCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUFzRCxFQUFHLENBQUMsRUFBRSxZQUFZLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUN6RztpQkFDRjthQUNGO1lBQ0QsTUFBTTtTQUNQO1FBQ0QsS0FBSyx3Q0FBZ0MsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1Qyx1SUFBdUk7WUFDdkksTUFBTTtTQUNQO1FBQ0Q7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDOUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQW5DVyxRQUFBLGdCQUFnQixvQkFtQzNCIn0=