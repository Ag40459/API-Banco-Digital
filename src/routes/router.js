const express = require('express');
const { listAccounts, newAccounts, updateAccount } = require('../controller/account');
const router = express();


router.get('/accounts', listAccounts);
router.post('/accounts', newAccounts);
router.put('/accounts/numberAccount/user', updateAccount);

module.exports = router;

