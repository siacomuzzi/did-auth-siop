"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResponseOptsSchema = void 0;
exports.AuthenticationResponseOptsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationResponseOpts",
    "definitions": {
        "AuthenticationResponseOpts": {
            "type": "object",
            "properties": {
                "redirectUri": {
                    "type": "string"
                },
                "registration": {
                    "$ref": "#/definitions/ResponseRegistrationOpts"
                },
                "checkLinkedDomain": {
                    "$ref": "#/definitions/CheckLinkedDomain"
                },
                "presentationVerificationCallback": {
                    "$ref": "#/definitions/PresentationVerificationCallback"
                },
                "presentationSignCallback": {
                    "$ref": "#/definitions/PresentationSignCallback"
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
                        }
                    ]
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "did": {
                    "type": "string"
                },
                "vp": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/VerifiablePresentationResponseOpts"
                    }
                },
                "expiresIn": {
                    "type": "number"
                },
                "accessToken": {
                    "type": "string"
                },
                "tokenType": {
                    "type": "string"
                },
                "refreshToken": {
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
            },
            "required": [
                "registration",
                "signatureType",
                "did"
            ],
            "additionalProperties": false
        },
        "ResponseRegistrationOpts": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "registrationBy": {
                            "$ref": "#/definitions/RegistrationType"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
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
                        "subjectSyntaxTypesSupported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/KeyAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/KeyAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
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
                        "userinfoEncryptionAlgValuesSupported": {
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
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
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
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
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
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "clientId": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "clientName": {
                            "type": "string"
                        },
                        "tokenEndpointAuthMethod": {
                            "type": "string"
                        },
                        "applicationType": {
                            "type": "string"
                        },
                        "responseTypes": {
                            "type": "string"
                        },
                        "grantTypes": {
                            "type": "string"
                        },
                        "vpFormats": {
                            "$ref": "#/definitions/Format"
                        },
                        "logoUri": {
                            "type": "string"
                        },
                        "clientPurpose": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "registrationBy"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "registrationBy": {
                            "$ref": "#/definitions/RegistrationType"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
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
                        "subjectSyntaxTypesSupported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/KeyAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/KeyAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
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
                        "userinfoEncryptionAlgValuesSupported": {
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
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
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
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
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
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "clientId": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "clientName": {
                            "type": "string"
                        },
                        "tokenEndpointAuthMethod": {
                            "type": "string"
                        },
                        "applicationType": {
                            "type": "string"
                        },
                        "responseTypes": {
                            "type": "string"
                        },
                        "grantTypes": {
                            "type": "string"
                        },
                        "vpFormats": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "registrationBy"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "registrationBy": {
                            "$ref": "#/definitions/RegistrationType"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
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
                        "subjectSyntaxTypesSupported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/KeyAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/KeyAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
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
                        "userinfoEncryptionAlgValuesSupported": {
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
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
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
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
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
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "idTokenTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IdTokenType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/IdTokenType"
                                }
                            ]
                        },
                        "vpFormatsSupported": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "registrationBy"
                    ]
                }
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
        "Schema": {
            "type": "string",
            "enum": [
                "openid:",
                "openid-vc:"
            ]
        },
        "ResponseIss": {
            "type": "string",
            "enum": [
                "https://self-issued.me",
                "https://self-issued.me/v2",
                "https://self-issued.me/v2/openid-vc"
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
        "ResponseMode": {
            "type": "string",
            "enum": [
                "fragment",
                "form_post",
                "post",
                "query"
            ]
        },
        "GrantType": {
            "type": "string",
            "enum": [
                "authorization_code",
                "implicit"
            ]
        },
        "AuthenticationContextReferences": {
            "type": "string",
            "enum": [
                "phr",
                "phrh"
            ]
        },
        "KeyAlgo": {
            "type": "string",
            "enum": [
                "EdDSA",
                "RS256",
                "ES256",
                "ES256K"
            ]
        },
        "TokenEndpointAuthMethod": {
            "type": "string",
            "enum": [
                "client_secret_post",
                "client_secret_basic",
                "client_secret_jwt",
                "private_key_jwt"
            ]
        },
        "ClaimType": {
            "type": "string",
            "enum": [
                "normal",
                "aggregated",
                "distributed"
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
        "IdTokenType": {
            "type": "string",
            "enum": [
                "subject_signed",
                "attester_signed"
            ]
        },
        "CheckLinkedDomain": {
            "type": "string",
            "enum": [
                "never",
                "if_present",
                "always"
            ]
        },
        "PresentationVerificationCallback": {
            "properties": {
                "isFunction": {
                    "type": "boolean",
                    "const": true
                }
            }
        },
        "PresentationSignCallback": {
            "properties": {
                "isFunction": {
                    "type": "boolean",
                    "const": true
                }
            }
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
        "VerifiablePresentationResponseOpts": {
            "type": "object",
            "properties": {
                "format": {
                    "$ref": "#/definitions/VerifiablePresentationTypeFormat"
                },
                "presentation": {
                    "$ref": "#/definitions/IVerifiablePresentation"
                },
                "location": {
                    "$ref": "#/definitions/PresentationLocation"
                }
            },
            "required": [
                "format",
                "location",
                "presentation"
            ],
            "additionalProperties": false
        },
        "VerifiablePresentationTypeFormat": {
            "type": "string",
            "enum": [
                "jwt_vp",
                "ldp_vp"
            ]
        },
        "IVerifiablePresentation": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "proof": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IProof"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IProof"
                                    }
                                }
                            ]
                        },
                        "type": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "id": {
                            "type": "string"
                        },
                        "@id": {
                            "type": "string"
                        },
                        "@context": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialContextType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialContextType"
                                    }
                                }
                            ]
                        },
                        "verifiableCredential": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/W3CVerifiableCredential"
                            }
                        },
                        "presentation_submission": {
                            "$ref": "#/definitions/PresentationSubmission"
                        },
                        "holder": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "@context",
                        "proof",
                        "type",
                        "verifiableCredential"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "proof": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IProof"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IProof"
                                    }
                                }
                            ]
                        },
                        "@type": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "id": {
                            "type": "string"
                        },
                        "@id": {
                            "type": "string"
                        },
                        "@context": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialContextType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialContextType"
                                    }
                                }
                            ]
                        },
                        "verifiableCredential": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/W3CVerifiableCredential"
                            }
                        },
                        "presentation_submission": {
                            "$ref": "#/definitions/PresentationSubmission"
                        },
                        "holder": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "@context",
                        "@type",
                        "proof",
                        "verifiableCredential"
                    ]
                }
            ]
        },
        "IProof": {
            "type": "object",
            "properties": {
                "type": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProofType"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "created": {
                    "type": "string"
                },
                "proofPurpose": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProofPurpose"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "verificationMethod": {
                    "type": "string"
                },
                "challenge": {
                    "type": "string"
                },
                "domain": {
                    "type": "string"
                },
                "proofValue": {
                    "type": "string"
                },
                "jws": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "requiredRevealStatements": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "type",
                "created",
                "proofPurpose",
                "verificationMethod"
            ]
        },
        "IProofType": {
            "type": "string",
            "enum": [
                "Ed25519Signature2018",
                "Ed25519Signature2020",
                "EcdsaSecp256k1Signature2019",
                "EcdsaSecp256k1RecoverySignature2020",
                "JsonWebSignature2020",
                "RsaSignature2018",
                "GpgSignature2020",
                "JcsEd25519Signature2020",
                "BbsBlsSignatureProof2020",
                "BbsBlsBoundSignatureProof2020"
            ]
        },
        "IProofPurpose": {
            "type": "string",
            "enum": [
                "verificationMethod",
                "assertionMethod",
                "authentication",
                "keyAgreement",
                "contactAgreement",
                "capabilityInvocation",
                "capabilityDelegation"
            ]
        },
        "ICredentialContextType": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "did": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "string"
                }
            ]
        },
        "W3CVerifiableCredential": {
            "anyOf": [
                {
                    "$ref": "#/definitions/IVerifiableCredential"
                },
                {
                    "$ref": "#/definitions/CompactJWT"
                }
            ],
            "description": "Represents a signed Verifiable Credential (includes proof), in either JSON or compact JWT format. See  {@link  https://www.w3.org/TR/vc-data-model/#credentials | VC data model } \nSee  {@link  https://www.w3.org/TR/vc-data-model/#proof-formats | proof formats }"
        },
        "IVerifiableCredential": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "proof": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IProof"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IProof"
                                    }
                                }
                            ]
                        },
                        "@type": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "@context": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialContextType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialContextType"
                                    }
                                }
                            ]
                        },
                        "credentialSchema": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialSchemaType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialSchemaType"
                                    }
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IIssuerId"
                                },
                                {
                                    "$ref": "#/definitions/IIssuer"
                                }
                            ]
                        },
                        "issuanceDate": {
                            "type": "string"
                        },
                        "credentialSubject": {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string"
                                        }
                                    }
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "expirationDate": {
                            "type": "string"
                        },
                        "id": {
                            "type": "string"
                        },
                        "@id": {
                            "type": "string"
                        },
                        "credentialStatus": {
                            "$ref": "#/definitions/ICredentialStatus"
                        },
                        "description": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "@context",
                        "@type",
                        "credentialSubject",
                        "issuanceDate",
                        "issuer",
                        "proof"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "proof": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IProof"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IProof"
                                    }
                                }
                            ]
                        },
                        "type": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "@context": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialContextType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialContextType"
                                    }
                                }
                            ]
                        },
                        "credentialSchema": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ICredentialSchemaType"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ICredentialSchemaType"
                                    }
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/IIssuerId"
                                },
                                {
                                    "$ref": "#/definitions/IIssuer"
                                }
                            ]
                        },
                        "issuanceDate": {
                            "type": "string"
                        },
                        "credentialSubject": {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string"
                                        }
                                    }
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        "expirationDate": {
                            "type": "string"
                        },
                        "id": {
                            "type": "string"
                        },
                        "@id": {
                            "type": "string"
                        },
                        "credentialStatus": {
                            "$ref": "#/definitions/ICredentialStatus"
                        },
                        "description": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "@context",
                        "credentialSubject",
                        "issuanceDate",
                        "issuer",
                        "proof",
                        "type"
                    ]
                }
            ]
        },
        "ICredentialSchemaType": {
            "anyOf": [
                {
                    "$ref": "#/definitions/ICredentialSchema"
                },
                {
                    "type": "string"
                }
            ]
        },
        "ICredentialSchema": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "IIssuerId": {
            "type": "string"
        },
        "IIssuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ]
        },
        "ICredentialStatus": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "type"
            ],
            "additionalProperties": false
        },
        "CompactJWT": {
            "type": "string",
            "description": "Represents a Json Web Token in compact form."
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
        "PresentationLocation": {
            "type": "string",
            "enum": [
                "vp_token",
                "id_token"
            ]
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXNwb25zZU9wdHMuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vc2NoZW1hcy9BdXRoZW50aWNhdGlvblJlc3BvbnNlT3B0cy5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxnQ0FBZ0MsR0FBRztJQUM5QyxTQUFTLEVBQUUseUNBQXlDO0lBQ3BELE1BQU0sRUFBRSwwQ0FBMEM7SUFDbEQsYUFBYSxFQUFFO1FBQ2IsNEJBQTRCLEVBQUU7WUFDNUIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsWUFBWSxFQUFFO2dCQUNaLGFBQWEsRUFBRTtvQkFDYixNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLE1BQU0sRUFBRSx3Q0FBd0M7aUJBQ2pEO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixNQUFNLEVBQUUsaUNBQWlDO2lCQUMxQztnQkFDRCxrQ0FBa0MsRUFBRTtvQkFDbEMsTUFBTSxFQUFFLGdEQUFnRDtpQkFDekQ7Z0JBQ0QsMEJBQTBCLEVBQUU7b0JBQzFCLE1BQU0sRUFBRSx3Q0FBd0M7aUJBQ2pEO2dCQUNELGVBQWUsRUFBRTtvQkFDZixPQUFPLEVBQUU7d0JBQ1A7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsNEJBQTRCO2lCQUNyQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELElBQUksRUFBRTtv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