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
exports.getWithUrl = exports.postAuthenticationResponseJwt = exports.postAuthenticationResponse = exports.postWithBearerToken = void 0;
const cross_fetch_1 = require("cross-fetch");
const types_1 = require("../types");
function postWithBearerToken(url, body, bearerToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, cross_fetch_1.fetch)(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
                body: JSON.stringify(body),
            });
            if (!response || !response.status || (response.status !== 200 && response.status !== 201)) {
                throw new Error(`${types_1.SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText}, ${yield response.text()}`);
            }
            return response;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
}
exports.postWithBearerToken = postWithBearerToken;
function postAuthenticationResponse(url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return postAuthenticationResponseJwt(url, body.jwt);
    });
}
exports.postAuthenticationResponse = postAuthenticationResponse;
function postAuthenticationResponseJwt(url, idToken, vpToken, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = `id_token=${idToken}`;
            if (vpToken) {
                body += `&vp_token=${vpToken}`;
            }
            if (state) {
                body += `&state=${state}`;
            }
            const response = yield (0, cross_fetch_1.fetch)(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body,
            });
            if (!response || !response.status || response.status < 200 || response.status >= 400) {
                throw new Error(`${types_1.SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText}, ${yield response.text()}`);
            }
            return response;
        }
        catch (error) {
            throw new Error(`${error.message}`);
        }
    });
}
exports.postAuthenticationResponseJwt = postAuthenticationResponseJwt;
function getWithUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, cross_fetch_1.fetch)(url)
            .then((response) => {
            if (response.status >= 400) {
                return Promise.reject(Error(`${types_1.SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText} URL: ${url}`));
            }
            return response.json();
        })
            .catch((e) => {
            return Promise.reject(Error(`${e.message}`));
        });
    });
}
exports.getWithUrl = getWithUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0h0dHBVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBb0M7QUFFcEMsb0NBQWlGO0FBRWpGLFNBQXNCLG1CQUFtQixDQUFDLEdBQVcsRUFBRSxJQUFnQixFQUFFLFdBQW1COztRQUMxRixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLG1CQUFLLEVBQUMsR0FBRyxFQUFFO2dCQUNoQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsYUFBYSxFQUFFLFVBQVUsV0FBVyxFQUFFO2lCQUN2QztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUN6RixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsa0JBQVUsQ0FBQywwQkFBMEIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pJO1lBQ0QsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBSSxLQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Q0FBQTtBQWhCRCxrREFnQkM7QUFFRCxTQUFzQiwwQkFBMEIsQ0FBQyxHQUFXLEVBQUUsSUFBbUM7O1FBQy9GLE9BQU8sNkJBQTZCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQUE7QUFGRCxnRUFFQztBQUVELFNBQXNCLDZCQUE2QixDQUFDLEdBQVcsRUFBRSxPQUFlLEVBQUUsT0FBZ0IsRUFBRSxLQUFjOztRQUNoSCxJQUFJO1lBQ0YsSUFBSSxJQUFJLEdBQUcsWUFBWSxPQUFPLEVBQUUsQ0FBQztZQUNqQyxJQUFJLE9BQU8sRUFBRTtnQkFBRSxJQUFJLElBQUksYUFBYSxPQUFPLEVBQUUsQ0FBQzthQUFFO1lBQ2hELElBQUksS0FBSyxFQUFFO2dCQUFFLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxDQUFDO2FBQUU7WUFFekMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLG1CQUFLLEVBQUMsR0FBRyxFQUFFO2dCQUNoQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLGlEQUFpRDtpQkFDbEU7Z0JBQ0QsSUFBSTthQUNMLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO2dCQUNwRixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsa0JBQVUsQ0FBQywwQkFBMEIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pJO1lBQ0QsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBSSxLQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Q0FBQTtBQXBCRCxzRUFvQkM7QUFFRCxTQUFzQixVQUFVLENBQUMsR0FBVzs7UUFDMUMsT0FBTyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxDQUFDO2FBQ2QsSUFBSSxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFO1lBQzNCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxrQkFBVSxDQUFDLDBCQUEwQixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEk7WUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBSSxDQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBWEQsZ0NBV0MifQ==