const { Validator } = require("jsonschema");

module.exports = {
  verifyUser: (user) => {
    if (!user) {
      throw new Error("User Information not provide");
    }
    let validator = new Validator();
    let userSchema = {
      type: "object",
      properties: {
        firstname: {
          type: "string",
          minLength: 1,
          errorMessage: "Firstname is invalid",
        },
        lastname: {
          type: "string",
          minLength: 1,
          errorMessage: "Lastname is invalid",
        },
        email: {
          type: "string",
          format: "email",
          errorMessage: "email is invalid",
        },
        phone: {
          type: "string", // Type de donnée
          minLength: 10, // Longueur minimale (peut être ajustée selon les besoins)
          maxLength: 15, // Longueur maximale (pour permettre des formats variés)
          pattern: "^[0-9]+$", // Le numéro de téléphone ne doit contenir que des chiffres
          errorMessage: "Le numéro de téléphone est invalide", // Message d'erreur
        },
        password: {
          type: "String",
          minLength: 6,
          errorMessage: "password is invalid",
          pattern: "^(?=.*[A-Z])(?=.*[0-9]).+$", // Le password doit contenir au moins une majuscule et 1 chiffre
        },
      },
      required: ["firstname", "lastname", "email", "phone", "password"],
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
