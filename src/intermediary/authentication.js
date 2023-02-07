const { validateCPF } = require("../functions/validateCPF");
const { validateEmail } = require("../functions/validateEmail");

const authenticationNewAccount = async (req, res, next) => {
    const { name, email, cpf, birthdate, phone, password } = req.body

    if (!name) {
        return res.status(400).json({ message: 'O campo nome deve ser preenchido' })
    }

    if (typeof name !== 'string') {
        return res.status(400).json({ message: 'O campo nome deve conter apenas letras' })
    }

    if (!email) {
        return res.status(400).json({ message: 'O campo email deve ser preenchido' })
    }
    if (validateEmail(email))

        if (!cpf) {
            return res.status(400).json({ message: 'O campo cpf deve ser preenchido' })
        }

    if (!validateCPF(cpf)) {
        return res.status(400).json({ messagem: "CPF inválido" })
    }

    if (!birthdate) {
        return res.status(400).json({ message: 'O campo aniversário deve ser preenchido' })
    }

    if (!phone) {
        return res.status(400).json({ message: 'O campo telefone deve ser preenchido' })
    }

    if (!password) {
        return res.status(400).json({ message: 'O campo senha deve ser preenchido' })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O campo senha deve conter no mínimo 06 dígitos' })
    }

    const verifyEmailCpf = account.find(selectAccount => {
        return selectAccount.user.cpf === cpf || selectAccount.user.email === email
    });

    if (verifyEmailCpf) {
        return res.status(400).json({ message: 'Cpf ou Email já cadastrado' })
    }

    next()
}

const authenticationListAccount = async (req, res, next) => {
    const { password } = req.query
    if (!password || password !== bank.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }

    next()
}
const authenticationUpdateAccount = async (req, res, next) => {
    const { name, email, cpf, birthdate, phone, password } = req.body
    const { numberAccount } = req.params;

    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }

    if (!name) {
        return res.status(400).json({ message: 'O campo nome deve ser preenchido' })
    }

    if (typeof name !== 'string') {
        return res.status(400).json({ message: 'O campo nome deve conter apenas letras' })
    }

    if (!email) {
        return res.status(400).json({ message: 'O campo email deve ser preenchido' })
    }
    if (validateEmail(email))

        if (!cpf) {
            return res.status(400).json({ message: 'O campo cpf deve ser preenchido' })
        }

    if (!validateCPF(cpf)) {
        return res.status(400).json({ messagem: "CPF inválido" })
    }

    if (!birthdate) {
        return res.status(400).json({ message: 'O campo aniversário deve ser preenchido' })
    }

    if (!phone) {
        return res.status(400).json({ message: 'O campo telefone deve ser preenchido' })
    }

    if (!password) {
        return res.status(400).json({ message: 'O campo senha deve ser preenchido' })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O campo senha deve conter no mínimo 06 dígitos' });
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

}
const authenticationBalanceAccount = async (req, res, next) => {
    const { numberAccount, password } = req.query

    if (!numberAccount) {
        return res.status(400).json({ message: 'O campo número da conta deve ser preenchido' })
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo senha deve ser preenchido' })
    }
    if (password !== verifyNumberAccount.user.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    next();
}
const authenticationExtractAccount = async (req, res, next) => {
    const { numberAccount, password } = req.query
    if (!numberAccount) {
        return res.status(400).json({ message: 'O campo número da conta deve ser preenchido' })
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo senha deve ser preenchido' })
    }
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (password !== verifyNumberAccount.user.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }

    next();
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
}

module.exports = {
    authenticationNewAccount,
    authenticationListAccount,
    authenticationUpdateAccount,
    authenticationBalanceAccount,
    authenticationExtractAccount,
    authenticationDeleteAccount
}