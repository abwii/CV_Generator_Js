const { Validator } = require("jsonschema");

module.exports = {
  verifyComment: (comment) => {
      if (!comment) {
          throw new Error("Comment is required");
      }

      let validator = new Validator();

      let commentSchema = {
        type: 'object',
        properties: {
          cv: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
              type: "CV must be a valid ObjectId",
              pattern: "CV must be a valid MongoDB ObjectId format"
            }
          },
          user: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
              type: "User must be a valid ObjectId.",
              pattern: "User must be a valid MongoDB ObjectId format."
              }
          },
          content: {
            type: 'string',
            minLength: 3,
            maxLength: 500,
            errorMessage: {
              type: "Comment must be a string.",
              minLength: "Comment should be at least 3 characters.",
              maxLength: "Comments may not exceed 500 characters."
            }
          },
        },
        required: ['cv', 'user', 'content']
      };
    
      let result = validator.validate(comment, commentSchema);

      if (result.errors.length) {
        const errorInputsMsg = result.errors
            .map((error) => {
                return error.schema.errorMessage || error.message;
            })
            .join(' ');

        throw new Error(errorInputsMsg);
    }
  }
}