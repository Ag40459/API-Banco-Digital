let { account, idSerial, withdraw, deposit, transfers } = require('../database');

const newAccounts = (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body

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
const listAccounts = (req, res) => {

    return res.json(account);
}
const updateAccount = (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body

    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));

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
const balance = (req, res) => {

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
const deleteAccount = (req, res) => {
    const { numberAccount } = req.params;

    account = account.filter(selectAccount => Number(selectAccount.number) !== Number(numberAccount));

    return res.status(200).json({ message: "Conta excluida com sucesso!" })

}

module.exports = {
    listAccounts,
    newAccounts,
    updateAccount,
    deleteAccount,
    balance,
    extract
}