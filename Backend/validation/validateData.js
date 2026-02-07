const Joi = require("joi");

const validateSignupData = (data) => {

    const JoiSchema = Joi.object({

        ShopName: Joi.string()
            .min(3)
            .max(50)
            .required(),

        Name: Joi.string()
            .min(3)
            .max(30)
            .required(),

        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        Password: Joi.string()
            .min(6)
            .max(20)
            .required()
    });
    return JoiSchema.validate(data);

}

module.exports = validateSignupData;