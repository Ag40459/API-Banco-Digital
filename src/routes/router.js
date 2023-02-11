const express = require('express');
const { listAccounts, newAccounts, updateAccount, deleteAccount, balance, extract } = require('../controller/account');
const { newDeposit, newWithdraw, newTransfers } = require('../controller/transactions');
const { authenticationNewAccount, authenticationListAccount, authenticationUpdateAccount, authenticationBalanceAccount, authenticationExtractAccount, authenticationDeleteAccount, authenticationTransactionsDeposit, authenticationTransactionsWithdraw, authenticationTransactionsTranfers } = require('../intermediary/authentication');
const { schemesAccounts, schemesAccountsNumberpassword } = require('../validations/schemesAccounts');
const router = express();

router.post('/accounts', authenticationNewAccount(schemesAccounts), newAccounts);
router.get('/accounts', authenticationListAccount, listAccounts);
router.put('/accounts/:numberAccount/user', authenticationUpdateAccount(schemesAccounts), updateAccount);
router.get('/accounts/balance', authenticationBalanceAccount(schemesAccountsNumberpassword), balance);
router.get('/accounts/extract', authenticationExtractAccount(schemesAccountsNumberpassword), extract);
router.delete('/accounts/:numberAccount', authenticationDeleteAccount, deleteAccount);

router.post('/transactions/deposit', authenticationTransactionsDeposit, newDeposit);
router.post('/transactions/withdraw', authenticationTransactionsWithdraw, newWithdraw);
router.post('/transactions/transfers', authenticationTransactionsTranfers, newTransfers);

module.exports = router;