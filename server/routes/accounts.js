const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Account = require('../models/Account');
const User = require('../models/User');

// Generate a random account number
function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Get all accounts for a user
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new account
router.post('/', auth, async (req, res) => {
  const { accountType } = req.body;

  try {
    const newAccount = new Account({
      user: req.user.id,
      accountNumber: generateAccountNumber(),
      accountType,
      balance: 0
    });

    const account = await newAccount.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get account details
router.get('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    
    // Check if account exists
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    // Check if user owns the account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;