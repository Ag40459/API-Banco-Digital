let { bank, account, idSerial, withdraw, deposit, transfers } = require('../database');

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
    const { numberAccount } = req.params;

    if (!name || !email || !cpf || !birthdate || !phone || !password) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' })
    }
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
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
    verifyNumberAccount.user = {
        name,
        email,
        cpf,
        birthdate,
        phone,
        password
    }

    return res.status(200).json(verifyNumberAccount.user);
}

const deleteAccount = (req, res) => {
    const { numberAccount } = req.params;
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (verifyNumberAccount.balance > 0) {
        return res.status(403).json({ message: "Conta não excluida, Saldo precisa ser R$ 0,00" })
    }
    account = account.filter(selectAccount => Number(selectAccount.number) !== Number(numberAccount));

    return res.status(200).json({ message: "Conta excluida com sucesso!" })

}

const balance = (req, res) => {
    const { numberAccount, password } = req.query

    if (!numberAccount || !password) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' })
    }

    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }

    if (password !== verifyNumberAccount.user.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }
    return res.status(200).json("Saldo :" + Number(verifyNumberAccount.balance))
}

const extract = (req, res) => {
    const { numberAccount, password } = req.query
    if (!numberAccount || !password) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' })
    }
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyNumberAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (password !== verifyNumberAccount.user.password) {
        return res.status(400).json({ message: 'Login ou senha inválido!' })
    }
    const deposits = deposit.filter(selectDeposit => Number(selectDeposit.numberAccount) === Number(numberAccount));

    const withdraws = withdraw.filter(selectWithdraw => Number(selectWithdraw.numberAccount) === Number(numberAccount));

    const transfersSend = transfers.filter(selectTransfers => Number(selectTransfers.numberAccountOrigin) === Number(numberAccount));

    const transfersReceived = transfers.filter(selectTransfers => Number(selectTransfers.numberAccountDestiny) === Number(numberAccount));


    return res.json({
        Depositos: deposits,
        Saques: withdraws,
        transfersSend,
        transfersReceived
    })
}



module.exports = {
    listAccounts,
    newAccounts,
    updateAccount,
    deleteAccount,
    balance,
    extract
}