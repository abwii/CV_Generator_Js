const { Validator } = require("jsonschema");

module.exports = {
    verifyCV: (cv) => {
        if (!cv) {
            throw new Error("Information not as expected");
        }

        let validator = new Validator();

        let cvSchema = {
            type: 'object',
            properties: {
                user: {
                    type: 'string',
                    pattern: '^[0-9a-fA-F]{24}$',
                    errorMessage: {
                        type: "User must be a valid ObjectId",
                        pattern: "User must be a valid MongoDB ObjectId format"
                    }
                },
                description: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: {
                        type: "Description must be a string",
                        minLength: "Description cannot be empty"
                    }
                },
                education: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 3,
                    errorMessage: {
                        minItems: "Education must contain at least one item.",
                        maxItems: "Education can contain a maximum of three items."
                    },
                    items: {
                        type: 'object',
                        properties: {
                            degree: {
                                type: 'string',
                                minLength: 3,
                                errorMessage: {
                                    type: "Degree must be a string",
                                    minLength: "Degree cannot be empty"
                                }
                            },
                            institution: {
                                type: 'string',
                                minLength: 1,
                                errorMessage: {
                                    type: "Institution must be a string",
                                    minLength: "Institution cannot be empty"
                                }
                            },
                            startDate: {
                                type: 'string',
                                pattern: '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d\\d$', // bonus : pas dans l'avenir
                                errorMessage: {
                                    type: "Start date must be a string",
                                    pattern: "Start date must be in the format DD-MM-YYYY"
                                }
                            },
                            endDate: {
                                type: 'string',
                                pattern: '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d\\d$',
                                errorMessage: {
                                    type: "End date must be a string",
                                    pattern: "End date must be in the format DD-MM-YYYY"
                                }
                            },
                            description: {
                                type: 'string',
                                errorMessage: {
                                    type: "Description of education must be a string"
                                }
                            }
                        },
                        required: ['degree', 'institution', 'startDate']
                    }
                },
                experience: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 3,
                    errorMessage: {
                        minItems: "Experience must contain at least one item.",
                        maxItems: "Experience can contain a maximum of three items."
                    },
                    items: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                                minLength: 3,
                                errorMessage: {
                                    type: "Title must be a string",
                                    minLength: "Title cannot be empty"
                                }
                            },
                            company: {
                                type: 'string',
                                minLength: 1,
                                errorMessage: {
                                    type: "Company must be a string",
                                    minLength: "Company cannot be empty"
                                }
                            },
                            description: {
                                type: 'string',
                                errorMessage: {
                                    type: "Description of company must be a string"
                                }
                            },
                            startDate: {
                                type: 'string',
                                pattern: '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d\\d$', // bonus : pas dans l'avenir
                                errorMessage: {
                                    type: "Start date must be a string",
                                    pattern: "Start date must be in the format DD-MM-YYYY"
                                }
                            },
                            endDate: {
                                type: 'string',
                                pattern: '^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d\\d$', // bonus : pas dans l'avenir
                                errorMessage: {
                                    type: "End date must be a string",
                                    pattern: "End date must be in the format DD-MM-YYYY"
                                }
                            }
                        },
                        required: ['title', 'company', 'startDate', 'endDate']
                    }
                },
                skills: {
                    type: 'array',
                    items: {
                        type: 'string',
                        errorMessage: {
                            type: "Each skill must be a string"
                        }
                    },
                    errorMessage: {
                        type: "Skills must be an array of strings"
                    }
                },
                visible: {
                    type: 'boolean',
                    default: true
                }
            },
            required: ['user', 'description', 'skills']
        };

        let result = validator.validate(cv, cvSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(' ');

            throw new Error(errorInputsMsg);
        }
    }
};
