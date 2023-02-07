let { account, withdraw, deposit, transfers } = require('../database');
const { format } = require('date-fns')

const newDeposit = (req, res) => {
    const { numberAccount, value } = req.body;
    if (!numberAccount || !value) {
        res.status(400).json({ message: "Número da conta ou Valor inválido" })
    }

    const verifyAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (value <= 0) {
        res.status(400).json({ message: "Valor tem que ser superior a R$ 0,00" })
    }

    verifyAccount.balance += Number(value);

    const register = {
        date: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        numberAccount,
        value
    }

    deposit.push(register);
    return res.status(201).json(register);
}

const newWithdraw = (req, res) => {
    const { numberAccount, value, password } = req.body;
    if (!numberAccount || !value || !password) {
        res.status(400).json({ message: "Número da conta, valor ou password é inválido" })
    }
    const verifyAccount = account.find(selectAccount => selectAccount.number === Number(numberAccount));
    if (!verifyAccount) {
        return res.status(404).json({ message: 'Conta não encontrada' })
    }
    if (verifyAccount.user.password !== password) {
        res.status(400).json({ message: "Senha incorreta" })
    }
    if (verifyAccount.balance < value) {
        res.status(404).json({ message: "Saldo insuficiente" })
    }
    verifyAccount.balance -= Number(value)

    const register = {
        date: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        numberAccount,
        value
    }

    withdraw.push(register);
    return res.status(201).send()
}

const newTransfers = (req, res) => {
    const { numberAccountOrigin, numberAccountDestiny, value, password } = req.body;
    if (!numberAccountOrigin || !value || !password || !numberAccountDestiny) {
        res.status(400).json({ message: "Número da conta de Origem, número da conta de destino, valor ou password é inválido" })
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
    if (verifyAccountOrigin.balance < value) {
        res.status(404).json({ message: "Saldo insuficiente" })
    }

    verifyAccountOrigin.balance = verifyAccountOrigin.balance - Number(value);
    verifyAccountDestiny.balance += Number(value);


    const register = {
        date: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        numberAccountOrigin,
        numberAccountDestiny,
        value
    }

    transfers.push(register);
    return res.status(200).send();

}

module.exports = {
    newDeposit,
    newWithdraw,
    newTransfers
}