let { account, idSerial, withdraw, deposit, transfers } = require('../database');
const bcrypt = require('bcrypt');

const newAccounts = async (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newAccount = {
        number: idSerial++,
        balance: 0,
        user: {
            name,
            cpf,
            birthdate,
            phone,
            email,
            encryptedPassword
        }
    }
    account.push(newAccount);
    return res.status(201).json(newAccount);
}
const listAccounts = (req, res) => {

    return res.json(account);
}
const updateAccount = async (req, res) => {
    const { name, email, cpf, birthdate, phone, password } = req.body;
    const { numberAccount } = req.params;
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    const encryptedPassword = await bcrypt.hash(password, 10);

    verifyNumberAccount.user = {
        name,
        email,
        cpf,
        birthdate,
        phone,
        encryptedPassword
    }
    return res.status(200).json(verifyNumberAccount.user);
}
const balance = (req, res) => {
    const { numberAccount } = req.query
    const verifyNumberAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    return res.status(200).json((verifyNumberAccount.balance).toFixed(2).replace('.', ','));
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