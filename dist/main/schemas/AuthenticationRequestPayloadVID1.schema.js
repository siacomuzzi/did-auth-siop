"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRequestPayloadSchemaVID1 = void 0;
exports.AuthenticationRequestPayloadSchemaVID1 = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationRequestPayloadVID1",
    "definitions": {
        "AuthenticationRequestPayloadVID1": {
            "type": "object",
            "properties": {
                "registration": {
                    "$ref": "#/definitions/RPRegistrationMetadataPayload"
                },
                "registration_uri": {
                    "type": "string"
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0UGF5bG9hZFZJRDEuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vc2NoZW1hcy9BdXRoZW50aWNhdGlvblJlcXVlc3RQYXlsb2FkVklEMS5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxzQ0FBc0MsR0FBRztJQUNwRCxTQUFTLEVBQUUseUNBQXlDO0lBQ3BELE1BQU0sRUFBRSxnREFBZ0Q7SUFDeEQsYUFBYSxFQUFFO1FBQ2Isa0NBQWtDLEVBQUU7WUFDbEMsTUFBTSxFQUFFLFFBQVE7WUFDaEIsWUFBWSxFQUFFO2dCQUNaLGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsNkNBQTZDO2lCQUN0RDtnQkFDRCxrQkFBa0IsRUFBRTtvQkFDbEIsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsT0FBTyxFQUFFO3dCQUNQOzRCQUNFLE1BQU0sRUFBRSxRQUFRO3lCQUNqQjt3QkFDRDs0QkFDRSxNQUFNLEVBQUUsT0FBTzs0QkFDZixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxFQUFFLFFBQVE7NkJBQ2pCO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7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