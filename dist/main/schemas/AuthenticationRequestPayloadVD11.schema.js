"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRequestPayloadSchemaVD11 = void 0;
exports.AuthenticationRequestPayloadSchemaVD11 = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationRequestPayloadVD11",
    "definitions": {
        "AuthenticationRequestPayloadVD11": {
            "type": "object",
            "properties": {
                "iss": {
                    "type": "string"
                },
                "sub": {
                    "type": "string"
                },
                "aud": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
                "iat": {
                    "type": "number"
                },
                "nbf": {
                    "type": "number"
                },
                "type": {
                    "type": "string"
                },
                "exp": {
                    "type": "number"
                },
                "rexp": {
                    "type": "number"
                },
                "jti": {
                    "type": "string"
                },
                "scope": {
                    "type": "string"
                },
                "response_type": {
                    "$ref": "#/definitions/ResponseType"
                },
                "client_id": {
                    "type": "string"
                },
                "response_mode": {
                    "type": "string"
                },
                "redirect_uri": {
                    "type": "string"
                },
                "id_token_hint": {
                    "type": "string"
                },
                "claims": {
                    "$ref": "#/definitions/ClaimPayload"
                },
                "request": {
                    "type": "string"
                },
                "request_uri": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "client_metadata": {},
                "client_metadata_uri": {
                    "type": "string"
                },
                "id_token_type": {
                    "type": "string"
                }
            },
            "required": [
                "client_id",
                "nonce",
                "redirect_uri",
                "response_type",
                "scope",
                "state"
            ]
        },
        "ResponseType": {
            "type": "string",
            "enum": [
                "id_token",
                "vp_token"
            ]
        },
        "ClaimPayload": {
            "type": "object",
            "properties": {
                "id_token": {
                    "$ref": "#/definitions/IdTokenPayload"
                },
                "vp_token": {
                    "$ref": "#/definitions/VpTokenClaimPayload"
                }
            },
            "additionalProperties": false
        },
        "IdTokenPayload": {
            "type": "object",
            "properties": {
                "iss": {
                    "type": "string"
                },
                "sub": {
                    "type": "string"
                },
                "aud": {
                    "type": "string"
                },
                "iat": {
                    "type": "number"
                },
                "nbf": {
                    "type": "number"
                },
                "type": {
                    "type": "string"
                },
                "exp": {
                    "type": "number"
                },
                "rexp": {
                    "type": "number"
                },
                "jti": {
                    "type": "string"
                },
                "auth_time": {
                    "type": "number"
                },
                "nonce": {
                    "type": "string"
                },
                "_vp_token": {
                    "type": "object",
                    "properties": {
                        "presentation_submission": {
                            "$ref": "#/definitions/PresentationSubmission"
                        }
                    },
                    "required": [
                        "presentation_submission"
                    ],
                    "additionalProperties": false
                }
            }
        },
        "PresentationSubmission": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "A UUID or some other unique ID to identify this Presentation Submission"
                },
                "definition_id": {
                    "type": "string",
                    "description": "A UUID or some other unique ID to identify this Presentation Definition"
                },
                "descriptor_map": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Descriptor"
                    },
                    "description": "List of descriptors of how the claims are being mapped to presentation definition"
                }
            },
            "required": [
                "id",
                "definition_id",
                "descriptor_map"
            ],
            "additionalProperties": false,
            "description": "It expresses how the inputs are presented as proofs to a Verifier."
        },
        "Descriptor": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID to identify the descriptor from Presentation Definition Input Descriptor it coresponds to."
                },
                "path": {
                    "type": "string",
                    "description": "The path where the verifiable credential is located in the presentation submission json"
                },
                "path_nested": {
                    "$ref": "#/definitions/Descriptor"
                },
                "format": {
                    "type": "string",
                    "description": "The Proof or JWT algorith that the proof is in"
                }
            },
            "required": [
                "id",
                "path",
                "format"
            ],
            "additionalProperties": false,
            "description": "descriptor map laying out the structure of the presentation submission."
        },
        "VpTokenClaimPayload": {
            "type": "object",
            "properties": {
                "response_type": {
                    "type": "string"
                },
                "presentation_definition": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/PresentationDefinitionV1"
                        },
                        {
                            "$ref": "#/definitions/PresentationDefinitionV2"
                        }
                    ]
                },
                "presentation_definition_uri": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                }
            },
            "additionalProperties": {}
        },
        "PresentationDefinitionV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV1"
                    }
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
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
        },
        "SubmissionRequirement": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "rule": {
                    "$ref": "#/definitions/Rules"
                },
                "count": {
                    "type": "number"
                },
                "min": {
                    "type": "number"
                },
                "max": {
                    "type": "number"
                },
                "from": {
                    "type": "string"
                },
                "from_nested": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                }
            },
            "required": [
                "rule"
            ],
            "additionalProperties": false
        },
        "Rules": {
            "type": "string",
            "enum": [
                "all",
                "pick"
            ]
        },
        "InputDescriptorV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Schema"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV1"
                }
            },
            "required": [
                "id",
                "schema"
            ],
            "additionalProperties": false
        },
        "Schema": {
            "type": "object",
            "properties": {
                "uri": {
                    "type": "string"
                },
                "required": {
                    "type": "boolean"
                }
            },
            "required": [
                "uri"
            ],
            "additionalProperties": false
        },
        "ConstraintsV1": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV1"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "Optionality": {
            "type": "string",
            "enum": [
                "required",
                "preferred"
            ]
        },
        "Statuses": {
            "type": "object",
            "properties": {
                "active": {
                    "$ref": "#/definitions/PdStatus"
                },
                "suspended": {
                    "$ref": "#/definitions/PdStatus"
                },
                "revoked": {
                    "$ref": "#/definitions/PdStatus"
                }
            },
            "additionalProperties": false
        },
        "PdStatus": {
            "type": "object",
            "properties": {
                "directive": {
                    "$ref": "#/definitions/Directives"
                }
            },
            "additionalProperties": false
        },
        "Directives": {
            "type": "string",
            "enum": [
                "required",
                "allowed",
                "disallowed"
            ]
        },
        "FieldV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV1"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "additionalProperties": false
        },
        "FilterV1": {
            "type": "object",
            "properties": {
                "_const": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "_enum": {
                    "type": "array",
                    "items": {
                        "type": [
                            "number",
                            "string"
                        ]
                    }
                },
                "exclusiveMinimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "exclusiveMaximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "format": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "maximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "HolderSubject": {
            "type": "object",
            "properties": {
                "field_id": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "directive": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "required": [
                "field_id",
                "directive"
            ],
            "additionalProperties": false
        },
        "PresentationDefinitionV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV2"
                    }
                },
                "frame": {
                    "type": "object"
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
        },
        "InputDescriptorV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV2"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "ConstraintsV2": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV2"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "FieldV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV2"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "additionalProperties": false
        },
        "FilterV2": {
            "type": "object",
            "properties": {
                "_const": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "_enum": {
                    "type": "array",
                    "items": {
                        "type": [
                            "number",
                            "string"
                        ]
                    }
                },
                "exclusiveMinimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "exclusiveMaximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "format": {
                    "type": "string"
                },
                "formatMaximum": {
                    "type": "string"
                },
                "formatMinimum": {
                    "type": "string"
                },
                "formatExclusiveMaximum": {
                    "type": "string"
                },
                "formatExclusiveMinimum": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "maximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0UGF5bG9hZFZEMTEuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vc2NoZW1hcy9BdXRoZW50aWNhdGlvblJlcXVlc3RQYXlsb2FkVkQxMS5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxzQ0FBc0MsR0FBRztJQUNwRCxTQUFTLEVBQUUseUNBQXlDO0lBQ3BELE1BQU0sRUFBRSxnREFBZ0Q7SUFDeEQsYUFBYSxFQUFFO1FBQ2Isa0NBQWtDLEVBQUU7WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsWUFBWSxFQUFFO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsT0FBTyxFQUFFO3dCQUNQOzRCQUNFLE1BQU0sRUFBRSxRQUFRO3lCQUNqQjt3QkFDRDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFLFFBQVE7NkJBQ2pCO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNm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