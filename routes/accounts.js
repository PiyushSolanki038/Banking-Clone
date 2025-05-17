const express = require('express');
const Account = require('../models/Account');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all accounts for a user
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get account by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findOne({ 
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new account
router.post('/', auth, async (req, res) => {
  try {
    const { accountType } = req.body;
    
    const accountNumber = Account.generateAccountNumber();
    const account = new Account({
      user: req.user.id,
      accountNumber,
      accountType,
      balance: 0
    });
    
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;