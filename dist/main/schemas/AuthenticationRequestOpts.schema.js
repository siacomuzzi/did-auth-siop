"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRequestOptsSchema = void 0;
exports.AuthenticationRequestOptsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationRequestOpts",
    "definitions": {
        "AuthenticationRequestOpts": {
            "anyOf": [
                {
                    "$ref": "#/definitions/AuthenticationRequestOptsVD1"
                },
                {
                    "$ref": "#/definitions/AuthenticationRequestOptsVD11"
                }
            ]
        },
        "AuthenticationRequestOptsVD1": {
            "type": "object",
            "properties": {
                "scope": {
                    "type": "string"
                },
                "responseType": {
                    "type": "string"
                },
                "clientId": {
                    "type": "string"
                },
                "redirectUri": {
                    "type": "string"
                },
                "idTokenHint": {
                    "type": "string"
                },
                "claims": {
                    "$ref": "#/definitions/ClaimOpts"
                },
                "request": {
                    "type": "string"
                },
                "requestUri": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "signatureType": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/InternalSignature"
                        },
                        {
                            "$ref": "#/definitions/ExternalSignature"
                        },
                        {
                            "$ref": "#/definitions/SuppliedSignature"
                        },
                        {
                            "$ref": "#/definitions/NoSignature"
                        }
                    ]
                },
                "authorizationEndpoint": {
                    "type": "string"
                },
                "requestBy": {
                    "$ref": "#/definitions/ObjectBy"
                },
                "checkLinkedDomain": {
                    "$ref": "#/definitions/CheckLinkedDomain"
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "responseContext": {
                    "$ref": "#/definitions/ResponseContext"
                },
                "responseTypesSupported": {
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
                "scopesSupported": {
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
                "subjectTypesSupported": {
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
                "requestObjectSigningAlgValuesSupported": {
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
                "revocationVerificationCallback": {
                    "$ref": "#/definitions/RevocationVerificationCallback"
                },
                "registration": {
                    "$ref": "#/definitions/RequestRegistrationOpts"
                },
                "registrationUri": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "clientId",
                "redirectUri",
                "requestBy",
                "responseType",
                "scope",
                "signatureType"
            ]
        },
        "ClaimOpts": {
            "type": "object",
            "properties": {
                "idToken": {
                    "$ref": "#/definitions/IdTokenPayload"
                },
                "vpToken": {
                    "$ref": "#/definitions/VpTokenClaimOpts"
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
        "VpTokenClaimOpts": {
            "type": "object",
            "properties": {
                "presentationDefinition": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/PresentationDefinitionV1"
                        },
                        {
                            "$ref": "#/definitions/PresentationDefinitionV2"
                        }
                    ]
                },
                "presentationDefinitionUri": {
                    "type": "string"
                }
            },
            "additionalProperties": false
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
        },
        "InternalSignature": {
            "type": "object",
            "properties": {
                "hexPrivateKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "hexPrivateKey",
                "did"
            ],
            "additionalProperties": false
        },
        "ExternalSignature": {
            "type": "object",
            "properties": {
                "signatureUri": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "authZToken": {
                    "type": "string"
                },
                "hexPublicKey": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "signatureUri",
                "did"
            ],
            "additionalProperties": false
        },
        "SuppliedSignature": {
            "type": "object",
            "properties": {
                "signature": {
                    "properties": {
                        "isFunction": {
                            "type": "boolean",
                            "const": true
                        }
                    }
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "signature",
                "did",
                "kid"
            ],
            "additionalProperties": false
        },
        "NoSignature": {
            "type": "object",
            "properties": {
                "hexPublicKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "hexPublicKey",
                "did"
            ],
            "additionalProperties": false
        },
        "ObjectBy": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "REFERENCE",
                        "VALUE"
                    ]
                },
                "referenceUri": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "CheckLinkedDomain": {
            "type": "string",
            "enum": [
                "never",
                "if_present",
                "always"
            ]
        },
        "ResponseMode": {
            "type": "string",
            "enum": [
                "fragment",
                "form_post",
                "post",
                "query"
            ]
        },
        "ResponseContext": {
            "type": "string",
            "enum": [
                "rp",
                "op"
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
        "RevocationVerificationCallback": {
            "properties": {
                "isFunction": {
                    "type": "boolean",
                    "const": true
                }
            }
        },
        "RequestRegistrationOpts": {
            "type": "object",
            "properties": {
                "registrationBy": {
                    "$ref": "#/definitions/RegistrationType"
                },
                "clientId": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "idTokenSigningAlgValuesSupported": {
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
                "requestObjectSigningAlgValuesSupported": {
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
                "responseTypesSupported": {
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
                "scopesSupported": {
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
                "subjectTypesSupported": {
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
                "subjectSyntaxTypesSupported": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "vpFormatsSupported": {
                    "anyOf": [
                        {},
                        {
                            "$ref": "#/definitions/Format"
                        }
                    ]
                },
                "clientName": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "logoUri": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "clientPurpose": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                }
            },
            "required": [
                "registrationBy"
            ]
        },
        "RegistrationType": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "REFERENCE",
                        "VALUE"
                    ]
                },
                "referenceUri": {
                    "type": "string"
                },
                "id_token_encrypted_response_alg": {
                    "$ref": "#/definitions/EncKeyAlgorithm"
                },
                "id_token_encrypted_response_enc": {
                    "$ref": "#/definitions/EncSymmetricAlgorithmCode"
                }
            },
            "additionalProperties": false,
            "required": [
                "type"
            ]
        },
        "EncKeyAlgorithm": {
            "type": "string",
            "const": "ECDH-ES"
        },
        "EncSymmetricAlgorithmCode": {
            "type": "string",
            "const": "XC20P"
        },
        "AuthenticationRequestOptsVD11": {
            "type": "object",
            "properties": {
                "scope": {
                    "type": "string"
                },
                "responseType": {
                    "type": "string"
                },
                "clientId": {
                    "type": "string"
                },
                "redirectUri": {
                    "type": "string"
                },
                "idTokenHint": {
                    "type": "string"
                },
                "claims": {
                    "$ref": "#/definitions/ClaimOpts"
                },
                "request": {
                    "type": "string"
                },
                "requestUri": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "signatureType": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/InternalSignature"
                        },
                        {
                            "$ref": "#/definitions/ExternalSignature"
                        },
                        {
                            "$ref": "#/definitions/SuppliedSignature"
                        },
                        {
                            "$ref": "#/definitions/NoSignature"
                        }
                    ]
                },
                "authorizationEndpoint": {
                    "type": "string"
                },
                "requestBy": {
                    "$ref": "#/definitions/ObjectBy"
                },
                "checkLinkedDomain": {
                    "$ref": "#/definitions/CheckLinkedDomain"
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "responseContext": {
                    "$ref": "#/definitions/ResponseContext"
                },
                "responseTypesSupported": {
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
                "scopesSupported": {
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
                "subjectTypesSupported": {
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
                "requestObjectSigningAlgValuesSupported": {
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
                "revocationVerificationCallback": {
                    "$ref": "#/definitions/RevocationVerificationCallback"
                },
                "clientMetadata": {
                    "type": "object"
                },
                "clientMetadataUri": {
                    "type": "string"
                },
                "idTokenType": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "clientId",
                "redirectUri",
                "requestBy",
                "responseType",
                "scope",
                "signatureType"
            ]
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0T3B0cy5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zY2hlbWFzL0F1dGhlbnRpY2F0aW9uUmVxdWVzdE9wdHMuc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsK0JBQStCLEdBQUc7SUFDN0MsU0FBUyxFQUFFLHlDQUF5QztJQUNwRCxNQUFNLEVBQUUseUNBQXlDO0lBQ2pELGFBQWEsRUFBRTtRQUNiLDJCQUEyQixFQUFFO1lBQzNCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxNQUFNLEVBQUUsNENBQTRDO2lCQUNyRDtnQkFDRDtvQkFDRSxNQUFNLEVBQUUsNkNBQTZDO2lCQUN0RDthQUNGO1NBQ0Y7UUFDRCw4QkFBOEIsRUFBRTtZQUM5QixNQUFNLEVBQUUsUUFBUTtZQUNoQixZQUFZLEVBQUU7Z0JBQ1osT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELFVBQVUsRUFBRTtvQkFDVixNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUseUJBQXlCO2lCQUNsQztnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDWixNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixPQUFPLEVB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