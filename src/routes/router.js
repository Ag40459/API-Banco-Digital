const express = require('express');
const { listAccounts, newAccounts, updateAccount, deleteAccount, balance, extract } = require('../controller/account');
const { newDeposit, newWithdraw, newTransfers } = require('../controller/transactions');
const { authenticationNewAccount, authenticationListAccount, authenticationUpdateAccount, authenticationBalanceAccount, authenticationExtractAccount, authenticationDeleteAccount, authenticationTransactionsDeposit, authenticationTransactionsWithdraw } = require('../intermediary/authentication');
const router = express();

router.post('/accounts', authenticationNewAccount, newAccounts);
router.get('/accounts', authenticationListAccount, listAccounts);
router.put('/accounts/:numberAccount/user', authenticationUpdateAccount, updateAccount);
router.get('/accounts/balance', authenticationBalanceAccount, balance);
router.get('/accounts/extract', authenticationExtractAccount, extract);
router.delete('/accounts/:numberAccount', authenticationDeleteAccount, deleteAccount);

router.post('/transactions/deposit', authenticationTransactionsDeposit, newDeposit);
router.post('/transactions/withdraw', authenticationTransactionsWithdraw, newWithdraw);
router.post('/transactions/transfers', newTransfers);

module.exports = router;