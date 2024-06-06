"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPRegistrationMetadataPayloadSchema = void 0;
exports.RPRegistrationMetadataPayloadSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/RPRegistrationMetadataPayload",
    "definitions": {
        "RPRegistrationMetadataPayload": {
            "type": "object",
            "properties": {
                "client_id": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "id_token_signing_alg_values_supported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SigningAlgo"
                            }
                        },
                        {
                            "$ref": "#/definitions/SigningAlgo"
                        }
                    ]
                },
                "request_object_signing_alg_values_supported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SigningAlgo"
                            }
                        },
                        {
                            "$ref": "#/definitions/SigningAlgo"
                        }
                    ]
                },
                "response_types_supported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ResponseType"
                            }
                        },
                        {
                            "$ref": "#/definitions/ResponseType"
                        }
                    ]
                },
                "scopes_supported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Scope"
                            }
                        },
                        {
                            "$ref": "#/definitions/Scope"
                        }
                    ]
                },
                "subject_types_supported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SubjectType"
                            }
                        },
                        {
                            "$ref": "#/definitions/SubjectType"
                        }
                    ]
                },
                "client_name": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "logo_uri": {
                    "anyOf": [
                        {},
                        {
                            "type": "string"
                        }
                    ]
                },
                "client_purpose": {
                    "anyOf": [
                        {},
                        {
                            "type": "string"
                        }
                    ]
                },
                "subject_syntax_types_supported": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "vp_formats": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/Format"
                        },
                        {}
                    ]
                }
            },
            "required": [
                "subject_syntax_types_supported",
                "vp_formats"
            ]
        },
        "SigningAlgo": {
            "type": "string",
            "enum": [
                "EdDSA",
                "RS256",
                "ES256",
                "ES256K",
                "none"
            ]
        },
        "ResponseType": {
            "type": "string",
            "enum": [
                "id_token",
                "vp_token"
            ]
        },
        "Scope": {
            "type": "string",
            "enum": [
                "openid",
                "openid did_authn",
                "profile",
                "email",
                "address",
                "phone"
            ]
        },
        "SubjectType": {
            "type": "string",
            "enum": [
                "public",
                "pairwise"
            ]
        },
        "Format": {
            "type": "object",
            "properties": {
                "jwt": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vc": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vp": {
                    "$ref": "#/definitions/JwtObject"
                },
                "ldp": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vc": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vp": {
                    "$ref": "#/definitions/LdpObject"
                }
            },
            "additionalProperties": false
        },
        "JwtObject": {
            "type": "object",
            "properties": {
                "alg": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "alg"
            ],
            "additionalProperties": false
        },
        "LdpObject": {
            "type": "object",
            "properties": {
                "proof_type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "proof_type"
            ],
            "additionalProperties": false
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlBSZWdpc3RyYXRpb25NZXRhZGF0YVBheWxvYWQuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vc2NoZW1hcy9SUFJlZ2lzdHJhdGlvbk1ldGFkYXRhUGF5bG9hZC5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQ0FBbUMsR0FBRztJQUNqRCxTQUFTLEVBQUUseUNBQXlDO0lBQ3BELE1BQU0sRUFBRSw2Q0FBNkM7SUFDckQsYUFBYSxFQUFFO1FBQ2IsK0JBQStCLEVBQUU7WUFDL0IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsWUFBWSxFQUFFO2dCQUNaLFdBQVcsRUFBRTtvQkFDWCxPQUFPLEVBQUU7d0JBQ1A7NEJBQ0UsTUFBTSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELEVBQUU7cUJBQ0g7aUJBQ0Y7Z0JBQ0QsdUNBQXVDLEVBQUU7b0JBQ3ZDLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFLDJCQUEyQjs2QkFDcEM7eUJBQ0Y7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLDJCQUEyQjt5QkFDcEM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsNkNBQTZDLEVBQUU7b0JBQzdDLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFLDJCQUEyQjs2QkFDcEM7eUJBQ0Y7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLDJCQUEyQjt5QkFDcEM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsMEJBQTBCLEVBQUU7b0JBQzFCLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFLDRCQUE0Qjs2QkFDckM7eUJBQ0Y7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLDRCQUE0Qjt5QkFDckM7cUJBQ0Y7aUJBQ0Y7Z0JB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