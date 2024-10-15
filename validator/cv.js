const { Validator } = require("jsonschema");
const { verify } = require("jsonwebtoken");

module.exports = {
    verifyCV: (cv) => {
        if(!cv) {
            throw new Error("Information not as expected");
        }
        let validator = new Validator();
        let cvSchmea = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: {
                      type: "Name must be a string",
                      minLength: "Name cannot be empty"
                    }
                  },
                  surname: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: {
                      type: "Surname must be a string",
                      minLength: "Surname cannot be empty"
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
                  education: [
                    {
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
                        type: 'string', //?
                        format: 'date', //minLength todo
                        errorMessage: {
                            type: "StartDate must be a valid date"
                        }
                      },
                      endDate: {
                        type: 'string',
                        format: 'date',
                        errorMessage: {
                            type: "EndDate must be a valid date"
                        }
                      },
                      description: {
                        type: 'string',
                        errorMessage: {
                          type: "Description of education must be a string"
                        }
                      }
                    },
                  ],
                  experience: [
                    {
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
                      },
                      description: {
                        type: 'string',
                        errorMessage: {
                          type: "Description of company must be a string"
                        }
                      },
                      startDate: {
                        type: 'string', //?
                        format: 'date', //minLength todo
                        errorMessage: {
                            type: "StartDate must be a valid date"
                        }
                      },
                      endDate: {
                        type: 'string',
                        format: 'date',
                        errorMessage: {
                            type: "StartDate must be a valid date"
                        }
                      }
                      },
                    }
                  ],
                  skills: [String],
                  visible: {
                    type: Boolean,
                    default: true
                  },
            },
            required: ['name', 'author']
        };

        let result = validator.validate(cv, CVSchema);

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