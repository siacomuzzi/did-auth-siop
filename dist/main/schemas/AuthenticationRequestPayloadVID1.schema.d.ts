export declare const AuthenticationRequestPayloadSchemaVID1: {
    $schema: string;
    $ref: string;
    definitions: {
        AuthenticationRequestPayloadVID1: {
            type: string;
            properties: {
                registration: {
                    $ref: string;
                };
                registration_uri: {
                    type: string;
                };
                iss: {
                    type: string;
                };
                sub: {
                    type: string;
                };
                aud: {
                    anyOf: ({
                        type: string;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            type: string;
                        };
                    })[];
                };
                iat: {
                    type: string;
                };
                nbf: {
                    type: string;
                };
                type: {
                    type: string;
                };
                exp: {
                    type: string;
                };
                rexp: {
                    type: string;
                };
                jti: {
                    type: string;
                };
                scope: {
                    type: string;
                };
                response_type: {
                    $ref: string;
                };
                client_id: {
                    type: string;
                };
                response_mode: {
                    type: string;
                };
                redirect_uri: {
                    type: string;
                };
                id_token_hint: {
                    type: string;
                };
                claims: {
                    $ref: string;
                };
                request: {
                    type: string;
                };
                request_uri: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
                state: {
                    type: string;
                };
            };
            required: string[];
        };
        RPRegistrationMetadataPayload: {
            type: string;
            properties: {
                client_id: {
                    anyOf: ({
                        type: string;
                    } | {
                        type?: undefined;
                    })[];
                };
                id_token_signing_alg_values_supported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                request_object_signing_alg_values_supported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                response_types_supported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                scopes_supported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                subject_types_supported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                client_name: {
                    anyOf: ({
                        type: string;
                    } | {
                        type?: undefined;
                    })[];
                };
                logo_uri: {
                    anyOf: ({
                        type?: undefined;
                    } | {
                        type: string;
                    })[];
                };
                client_purpose: {
                    anyOf: ({
                        type?: undefined;
                    } | {
                        type: string;
                    })[];
                };
                subject_syntax_types_supported: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                vp_formats: {
                    anyOf: ({
                        $ref: string;
                    } | {
                        $ref?: undefined;
                    })[];
                };
            };
            required: string[];
        };
        SigningAlgo: {
            type: string;
            enum: string[];
        };
        ResponseType: {
            type: string;
            enum: string[];
        };
        Scope: {
            type: string;
            enum: string[];
        };
        SubjectType: {
            type: string;
            enum: string[];
        };
        Format: {
            type: string;
            properties: {
                jwt: {
                    $ref: string;
                };
                jwt_vc: {
                    $ref: string;
                };
                jwt_vp: {
                    $ref: string;
                };
                ldp: {
                    $ref: string;
                };
                ldp_vc: {
                    $ref: string;
                };
                ldp_vp: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        JwtObject: {
            type: string;
            properties: {
                alg: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        LdpObject: {
            type: string;
            properties: {
                proof_type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ClaimPayload: {
            type: string;
            properties: {
                id_token: {
                    $ref: string;
                };
                vp_token: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        IdTokenPayload: {
            type: string;
            properties: {
                iss: {
                    type: string;
                };
                sub: {
                    type: string;
                };
                aud: {
                    type: string;
                };
                iat: {
                    type: string;
                };
                nbf: {
                    type: string;
                };
                type: {
                    type: string;
                };
                exp: {
                    type: string;
                };
                rexp: {
                    type: string;
                };
                jti: {
                    type: string;
                };
                auth_time: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
                _vp_token: {
                    type: string;
                    properties: {
                        presentation_submission: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    additionalProperties: boolean;
                };
            };
        };
        PresentationSubmission: {
            type: string;
            properties: {
                id: {
                    type: string;
                    description: string;
                };
                definition_id: {
                    type: string;
                    description: string;
                };
                descriptor_map: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
            description: string;
        };
        Descriptor: {
            type: string;
            properties: {
                id: {
                    type: string;
                    description: string;
                };
                path: {
                    type: string;
                    description: string;
                };
                path_nested: {
                    $ref: string;
                };
                format: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
            description: string;
        };
        VpTokenClaimPayload: {
            type: string;
            properties: {
                response_type: {
                    type: string;
                };
                presentation_definition: {
                    anyOf: {
                        $ref: string;
                    }[];
                };
                presentation_definition_uri: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
            };
            additionalProperties: {};
        };
        PresentationDefinitionV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SubmissionRequirement: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                rule: {
                    $ref: string;
                };
                count: {
                    type: string;
                };
                min: {
                    type: string;
                };
                max: {
                    type: string;
                };
                from: {
                    type: string;
                };
                from_nested: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Rules: {
            type: string;
            enum: string[];
        };
        InputDescriptorV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                schema: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Schema: {
            type: string;
            properties: {
                uri: {
                    type: string;
                };
                required: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ConstraintsV1: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        Optionality: {
            type: string;
            enum: string[];
        };
        Statuses: {
            type: string;
            properties: {
                active: {
                    $ref: string;
                };
                suspended: {
                    $ref: string;
                };
                revoked: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        PdStatus: {
            type: string;
            properties: {
                directive: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        Directives: {
            type: string;
            enum: string[];
        };
        FieldV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        FilterV1: {
            type: string;
            properties: {
                _const: {
                    type: string[];
                };
                _enum: {
                    type: string;
                    items: {
                        type: string[];
                    };
                };
                exclusiveMinimum: {
                    type: string[];
                };
                exclusiveMaximum: {
                    type: string[];
                };
                format: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    type: string[];
                };
                maximum: {
                    type: string[];
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        HolderSubject: {
            type: string;
            properties: {
                field_id: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                directive: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        PresentationDefinitionV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                frame: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        InputDescriptorV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ConstraintsV2: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        FieldV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        FilterV2: {
            type: string;
            properties: {
                _const: {
                    type: string[];
                };
                _enum: {
                    type: string;
                    items: {
                        type: string[];
                    };
                };
                exclusiveMinimum: {
                    type: string[];
                };
                exclusiveMaximum: {
                    type: string[];
                };
                format: {
                    type: string;
                };
                formatMaximum: {
                    type: string;
                };
                formatMinimum: {
                    type: string;
                };
                formatExclusiveMaximum: {
                    type: string;
                };
                formatExclusiveMinimum: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    type: string[];
                };
                maximum: {
                    type: string[];
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
};
