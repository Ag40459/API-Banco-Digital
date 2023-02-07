const express = require('express');
const { listAccounts, newAccounts, updateAccount, deleteAccount, balance, extract } = require('../controller/account');
const { newDeposit, newWithdraw, newTransfers } = require('../controller/transactions');
const router = express();

router.get('/accounts', listAccounts);
router.get('/accounts/balance', balance);
router.get('/accounts/extract', extract);
router.post('/accounts', newAccounts);
router.put('/accounts/:numberAccount/user', updateAccount);
router.delete('/accounts/:numberAccount', deleteAccount);

router.post('/transactions/deposit', newDeposit);
router.post('/transactions/withdraw', newWithdraw);
router.post('/transactions/transfers', newTransfers);

module.exports = router;