"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryMetadataPayloadSchema = void 0;
exports.DiscoveryMetadataPayloadSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/DiscoveryMetadataPayload",
    "definitions": {
        "DiscoveryMetadataPayload": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                            "$ref": "#/definitions/ResponseIss"
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
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "client_name": {
                            "type": "string"
                        },
                        "token_endpoint_auth_method": {
                            "type": "string"
                        },
                        "application_type": {
                            "type": "string"
                        },
                        "response_types": {
                            "type": "string"
                        },
                        "grant_types": {
                            "type": "string"
                        },
                        "vp_formats": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "application_type",
                        "authorization_endpoint",
                        "client_id",
                        "grant_types",
                        "id_token_signing_alg_values_supported",
                        "issuer",
                        "redirectUris",
                        "response_types",
                        "response_types_supported",
                        "scopes_supported",
                        "subject_syntax_types_supported",
                        "subject_types_supported",
                        "token_endpoint_auth_method",
                        "vp_formats"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                            "$ref": "#/definitions/ResponseIss"
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
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "client_name": {
                            "type": "string"
                        },
                        "token_endpoint_auth_method": {
                            "type": "string"
                        },
                        "application_type": {
                            "type": "string"
                        },
                        "response_types": {
                            "type": "string"
                        },
                        "grant_types": {
                            "type": "string"
                        },
                        "vp_formats": {
                            "$ref": "#/definitions/Format"
                        },
                        "logo_uri": {
                            "type": "string"
                        },
                        "client_purpose": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "application_type",
                        "authorization_endpoint",
                        "client_id",
                        "grant_types",
                        "id_token_signing_alg_values_supported",
                        "issuer",
                        "redirectUris",
                        "response_types",
                        "response_types_supported",
                        "scopes_supported",
                        "subject_syntax_types_supported",
                        "subject_types_supported",
                        "token_endpoint_auth_method",
                        "vp_formats"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                            "$ref": "#/definitions/ResponseIss"
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
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "id_token_types_supported": {
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
                        "vp_formats_supported": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "authorization_endpoint",
                        "id_token_signing_alg_values_supported",
                        "issuer",
                        "response_types_supported",
                        "scopes_supported",
                        "subject_syntax_types_supported",
                        "subject_types_supported"
                    ]
                }
            ]
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY292ZXJ5TWV0YWRhdGFQYXlsb2FkLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3NjaGVtYXMvRGlzY292ZXJ5TWV0YWRhdGFQYXlsb2FkLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLDhCQUE4QixHQUFHO0lBQzVDLFNBQVMsRUFBRSx5Q0FBeUM7SUFDcEQsTUFBTSxFQUFFLHdDQUF3QztJQUNoRCxhQUFhLEVBQUU7UUFDYiwwQkFBMEIsRUFBRTtZQUMxQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFlBQVksRUFBRTt3QkFDWix3QkFBd0IsRUFBRTs0QkFDeEIsT0FBTyxFQUFFO2dDQUNQO29DQUNFLE1BQU0sRUFBRSxzQkFBc0I7aUNBQy9CO2dDQUNEO29DQUNFLE1BQU0sRUFBRSxRQUFRO2lDQUNqQjs2QkFDRjt5QkFDRjt3QkFDRCxRQUFRLEVBQUU7NEJBQ1IsTUFBTSxFQUFFLDJCQUEyQjt5QkFDcEM7d0JBQ0QsMEJBQTBCLEVBQUU7NEJBQzFCLE9BQU8sRUFBRTtnQ0FDUDtvQ0FDRSxNQUFNLEVBQUUsT0FBTztvQ0FDZixPQUFPLEVBQUU7d0NBQ1AsTUFBTSxFQUFFLDRCQUE0QjtxQ0FDckM7aUNBQ0Y7Z0NBQ0Q7b0NBQ0UsTUFBTSxFQUFFLDRCQUE0QjtpQ0FDckM7NkJBQ0Y7eUJBQ0Y7d0JBQ0Qsa0JBQWtCLEVBQUU7NEJBQ2xCLE9BQU8sRUFBRTtnQ0FDUDtvQ0FDRSxNQUFNLEVBQUUsT0FBTztvQ0FDZixPQUFPLEVBQUU7d0NBQ1AsTUFBTSxFQUFFLHFCQUFxQjtxQ0FDOUI7aUNBQ0Y7Z0NBQ0Q7b0NBQ0UsTUFBTSxFQUFFLHFCQUFxQjtpQ0FDOUI7NkJBQ0Y7eUJBQ0Y7d0JBQ0QseUJBQXlCLEVBQUU7NEJBQ3pCLE9BQU8sRUFBRTtnQ0FDUDtvQ0FDRSxNQUFNLEVBQUUsT0FBTztvQ0FDZixPQUFPLEVBQUU7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