const joi = require('joi');

const schemesAccounts = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome deve ser preenchido',
        'string.empty': 'O campo nome deve ser preenchido',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email deve ser preenchido',
        'string.email': 'Digite um email válido',
        'string.empty': 'O campo email deve ser preenchido',
    }),
    cpf: joi.string().min(11).max(11).required().messages({
        'any.required': 'O campo cpf deve ser preenchido',
        'string.min': 'O cpf deve conter 11 dígitos',
        'string.empty': 'O campo cpf deve ser preenchido',
    }),
    birthdate: joi.date(),
    phone: joi.number().messages({
        'any.required': 'O campo telefone deve ser preenchido',
        'string.empty': 'O campo phone deve ser preenchido',
    }),
    password: joi.string().min(6).required().messages({
        'any.required': 'O campo senha deve ser preenchido',
        'string.min': 'A senha deve conter no mínimo 06 caracteres',
        'string.empty': 'O campo senha deve ser preenchido',
    }),
})

const schemesAccountsNumberpassword = joi.object({
    numberAccount: joi.string().required().messages({
        'any.required': 'O campo número da conta deve ser preenchido',
        'string.empty': 'O campo número da conta deve ser preenchido',
    }),
    password: joi.string().min(6).required().messages({
        'any.required': 'O campo senha deve ser preenchido',
        'string.min': 'A senha deve conter no mínimo 06 caracteres',
        'string.empty': 'O campo senha deve ser preenchido',
    }),
})
module.exports = {
    schemesAccounts,
    schemesAccountsNumberpassword
};