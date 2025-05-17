const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Get all transactions for a user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get transactions for a specific account
router.get('/account/:accountId', auth, async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);
    
    // Check if account exists
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    // Check if user owns the account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const transactions = await Transaction.find({ account: req.params.accountId })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a deposit transaction
router.post('/deposit', auth, async (req, res) => {
  const { accountId, amount, description } = req.body;

  try {
    const account = await Account.findById(accountId);
    
    // Check if account exists
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    // Check if user owns the account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Update account balance
    account.balance += parseFloat(amount);
    await account.save();
    
    // Create transaction record
    const newTransaction = new Transaction({
      user: req.user.id,
      account: accountId,
      type: 'deposit',
      amount,
      description
    });
    
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a withdrawal transaction
router.post('/withdrawal', auth, async (req, res) => {
  const { accountId, amount, description } = req.body;

  try {
    const account = await Account.findById(accountId);
    
    // Check if account exists
    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    
    // Check if user owns the account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    
    // Update account balance
    account.balance -= parseFloat(amount);
    await account.save();
    
    // Create transaction record
    const newTransaction = new Transaction({
      user: req.user.id,
      account: accountId,
      type: 'withdrawal',
      amount,
      description
    });
    
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a transfer transaction
router.post('/transfer', auth, async (req, res) => {
  const { fromAccountId, toAccountNumber, amount, description } = req.body;

  try {
    const fromAccount = await Account.findById(fromAccountId);
    
    // Check if source account exists
    if (!fromAccount) {
      return res.status(404).json({ msg: 'Source account not found' });
    }
    
    // Check if user owns the source account
    if (fromAccount.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Check if sufficient balance
    if (fromAccount.balance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    
    // Check if destination account exists
    if (!toAccount) {
      return res.status(404).json({ msg: 'Destination account not found' });
    }
    
    // Update account balances
    fromAccount.balance -= parseFloat(amount);
    toAccount.balance += parseFloat(amount);
    
    await fromAccount.save();
    await toAccount.save();
    
    // Create transaction record
    const newTransaction = new Transaction({
      user: req.user.id,
      account: fromAccountId,
      type: 'transfer',
      amount,
      description,
      recipientAccount: toAccountNumber
    });
    
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;