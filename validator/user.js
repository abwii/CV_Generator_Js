const { Validator } = require("jsonschema");

module.exports = {
  verifyUser: (user) => {
    if (!user) {
      throw new Error("User information not provided");
    }
    
    let validator = new Validator();
    
    let userSchema = {
      type: "object",
      properties: {
        firstname: {
          type: "string",
          minLength: 1,
          errorMessage: {
            type: "Firstname must be a string",
            minLength: "Firstname cannot be empty"
          }
        },
        lastname: {
          type: "string",
          minLength: 1,
          errorMessage: {
            type: "Lastname must be a string",
            minLength: "Lastname cannot be empty"
          }
        },
        email: {
          type: "string",
          format: "email",
          errorMessage: {
            type: "Email must be a string",
            format: "Email must be a valid email address"
          }
        },
        phone: {
          type: "string",
          minLength: 10,
          maxLength: 15,
          pattern: "^[0-9]+$", 
          errorMessage: {
            type: "Phone number must be a string of digits",
            minLength: "Phone number must be at least 10 digits",
            maxLength: "Phone number cannot be longer than 15 digits",
            pattern: "Phone number can only contain digits"
          }
        },
        password: {
          type: "string",
          minLength: 6,
          pattern: "^(?=.*[A-Z])(?=.*[0-9]).+$", 
          errorMessage: {
            type: "Password must be a string",
            minLength: "Password must be at least 6 characters long",
            pattern: "Password must contain at least one uppercase letter and one number"
          }
        },
      },
      required: ["firstname", "lastname", "email", "phone", "password"]
    };

    let result = validator.validate(user, userSchema);

    if (result.errors.length) {
      const errorInputsMsg = result.errors
        .map((error) => {
          return error.schema.errorMessage || error.message;
        })
        .join(" ");

      throw new Error(errorInputsMsg);
    }
  },
};
