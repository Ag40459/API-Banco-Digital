let { bank, account, idSerial } = require('../database');

const listAccounts = (req, res) => {
    const { password } = req.query
    if (!password || password !== bank.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }
    return res.json(account);
}

const newAccounts = (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body


    if (!name || !email || !cpf || !birthdate || !phone || !password) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' })
    }

    const verifyEmailCpf = account.find(selectAccount => {
        return selectAccount.user.cpf === cpf || selectAccount.user.email === email
    });

    if (verifyEmailCpf) {
        return res.status(400).json({ message: 'Cpf ou Email já cadastrado' })
    }
    const newAccount = {
        number: idSerial++,
        balance: 0,
        user: {
            name,
            cpf,
            birthdate,
            phone,
            email,
            password
        }
    }

    account.push(newAccount);

    return res.status(201).json(newAccount);

}

const updateAccount = (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body
    const { numberAccount } = req.param;
    console.log(req.param);

    if (!name || !email || !cpf || !birthdate || !phone || !password) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' })
    }
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === numberAccount);
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (cpf !== verifyNumberAccount.user.cpf) {
        const verifyCpf = account.find(selectAccount => selectAccount.cpf === cpf);
        if (verifyCpf) {
            return res.status(400).json({ messagem: "Cpf já está cadastrado em outra conta" })
        }
    }

    if (email !== verifyNumberAccount.user.email) {
        const verifyemail = account.find(selectAccount => selectAccount.email === email);
        if (verifyemail) {
            return res.status(400).json({ messagem: "Email já está cadastrado em outra conta" })
        }
    }
    verifyNumberAccount.user = {
        name,
        email,
        cpf,
        birthdate,
        phone,
        password
    }

    return res.status(204).json(verifyNumberAccount.user);
}


module.exports = {
    listAccounts,
    newAccounts,
    updateAccount
}