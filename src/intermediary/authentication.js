let { bank, account } = require('../database');
const { validateCPF } = require("../functions/validateCPF");

const authenticationNewAccount = joiSchema => async (req, res, next) => {
    const { email, cpf } = req.body

    try {
        await joiSchema.validateAsync(req.body);
        const verifyCpfAccount = account.find(selectAccount => {
            return selectAccount.user.cpf === cpf
        });
        const verifyEmailAccount = account.find(selectAccount => {
            return selectAccount.user.email === email
        });

        if (verifyCpfAccount) {
            return res.status(400).json({ messagem: "Cpf já está cadastrado em outra conta" })
        }

        if (verifyEmailAccount) {
            return res.status(400).json({ messagem: "Email já está cadastrado em outra conta" })
        }
        if (!validateCPF(cpf)) {
            return res.status(400).json({ message: 'O número do Cpf não é válido' })
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}
const authenticationListAccount = async (req, res, next) => {
    const { password } = req.body

    if (!password) {
        return res.status(400).json({ message: 'O campo senha é obrigatório!' })
    }
    if (!password || password !== bank.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }
    next()
}
const authenticationUpdateAccount = joiSchema => async (req, res, next) => {
    const { email, cpf } = req.body
    const { numberAccount } = req.params;
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));

    try {
        if (!verifyNumberAccount) {
            return res.status(404).json({ message: 'Conta não encontrada' })
        }
        await joiSchema.validateAsync(req.body);
        if (!validateCPF(cpf)) {
            return res.status(400).json({ messagem: "CPF inválido" });
        }
        if (cpf !== verifyNumberAccount.user.cpf) {
            const verifyCpf = account.find(selectAccount => selectAccount.user.cpf === cpf);
            if (verifyCpf) {
                return res.status(400).json({ messagem: "Cpf já está cadastrado em outra conta" })
            }
        }
        if (email !== verifyNumberAccount.user.email) {
            const verifyemail = account.find(selectAccount => selectAccount.user.email === email);
            if (verifyemail) {
                return res.status(400).json({ messagem: "Email já está cadastrado em outra conta" })
            }
        }
        next();

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const authenticationBalanceAccount = joiSchema => async (req, res, next) => {
    const { numberAccount, password } = req.query

    try {
        await joiSchema.validateAsync(req.query);
        const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
        if (!verifyNumberAccount) {
            return res.status(404).json({ message: 'Conta não encontrada' })
        }
        if (password !== verifyNumberAccount.user.password) {
            return res.status(400).json({ message: 'Login ou senha inválido!' })
        }

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
}
const authenticationExtractAccount = joiSchema => async (req, res, next) => {
    const { numberAccount, password } = req.query

    try {
        await joiSchema.validateAsync(req.query);
        const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
        if (!verifyNumberAccount) {
            return res.status(404).json({ message: 'Conta não encontrada' })
        }
        if (password !== verifyNumberAccount.user.password) {
            return res.status(400).json({ message: 'Login ou senha inválido!' })
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}
const authenticationDeleteAccount = async (req, res, next) => {
    const { numberAccount } = req.params;
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (verifyNumberAccount.balance > 0) {
        return res.status(403).json({ message: "Conta não excluida, Saldo precisa ser R$ 0,00" })
    }
    next()
}
const authenticationTransactionsDeposit = async (req, res, next) => {
    const { numberAccount, value } = req.body;
    if (!numberAccount) {
        res.status(400).json({ message: "Campo conta deve ser preenchido" })
    }
    if (!value) {
        res.status(400).json({ message: "Campo valor deve ser preenchido" })
    }
    const verifyAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (value <= 0) {
        res.status(400).json({ message: "Valor tem que ser superior a R$ 0,00" })
    }

    next()
}
const authenticationTransactionsWithdraw = async (req, res, next) => {
    const { numberAccount, value, password } = req.body;
    if (!numberAccount) {
        res.status(400).json({ message: "Campo conta deve ser preenchido" })
    }
    if (!value) {
        res.status(400).json({ message: "Campo valor deve ser preenchido" })
    }
    if (!password) {
        res.status(400).json({ message: "Campo senha deve ser preenchido" })
    }
    const verifyAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (verifyAccount.user.password !== password) {
        res.status(400).json({ message: "Senha incorreta" })
    }
    if (value <= 0) {
        res.status(400).json({ message: "Valor tem que ser superior a R$ 0,00" })
    }
    if (verifyAccount.balance < value) {
        res.status(404).json({ message: "Saldo insuficiente" })
    }

    next()
}
const authenticationTransactionsTranfers = async (req, res, next) => {
    const { numberAccountOrigin, numberAccountDestiny, value, password } = req.body;
    if (!value) {
        res.status(400).json({ message: "Campo valor deve ser preenchido" })
    }
    if (!password) {
        res.status(400).json({ message: "Campo senha deve ser preenchido" })
    }
    if (!numberAccountOrigin) {
        res.status(400).json({ message: "Campo número da conta de origem deve ser preenchido" })
    }
    if (!numberAccountDestiny) {
        res.status(400).json({ message: "Campo número da conta de destino deve ser preenchido" })
    }
    const verifyAccountOrigin = account.find(selectAccount => selectAccount.number === Number(numberAccountOrigin));
    if (!verifyAccountOrigin) {
        return res.status(404).json({ message: 'Conta de origem não encontrada' })
    }
    const verifyAccountDestiny = account.find(selectAccount => selectAccount.number === Number(numberAccountDestiny));
    if (!verifyAccountDestiny) {
        return res.status(404).json({ message: 'Conta de destino não encontrada' })
    }
    if (verifyAccountOrigin.user.password !== password) {
        return res.status(404).json({ message: "Senha não confere" })
    }
    if (value <= 0) {
        res.status(400).json({ message: "Valor tem que ser superior a R$ 0,00" })
    }
    if (verifyAccountOrigin.balance < value) {
        res.status(404).json({ message: "Saldo insuficiente" })
    }
    next()
}
module.exports = {
    authenticationNewAccount,
    authenticationListAccount,
    authenticationUpdateAccount,
    authenticationBalanceAccount,
    authenticationExtractAccount,
    authenticationDeleteAccount,
    authenticationTransactionsDeposit,
    authenticationTransactionsWithdraw,
    authenticationTransactionsTranfers
}