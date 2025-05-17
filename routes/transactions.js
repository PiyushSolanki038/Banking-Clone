const express = require('express');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all transactions for a user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('fromAccount', 'accountNumber accountType')
      .populate('toAccount', 'accountNumber accountType');
    
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new transaction (fund transfer)
router.post('/transfer', auth, async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, description } = req.body;
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Check if from account exists and belongs to user
    const fromAccount = await Account.findOne({ 
      _id: fromAccountId,
      user: req.user.id
    });
    
    if (!fromAccount) {
      return res.status(404).json({ message: 'Source account not found' });
    }
    
    // Check if to account exists
    const toAccount = await Account.findById(toAccountId);
    if (!toAccount) {
      return res.status(404).json({ message: 'Destination account not found' });
    }
    
    // Check if from account has sufficient balance
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Create transaction
    const transaction = new Transaction({
      user: req.user.id,
      fromAccount: fromAccountId,
      toAccount: toAccountId,
      amount,
      type: 'Transfer',
      description: description || 'Fund Transfer'
    });
    
    // Update account balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    
    await Promise.all([
      transaction.save(),
      fromAccount.save(),
      toAccount.save()
    ]);
    
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a withdrawal transaction
router.post('/withdraw', auth, async (req, res) => {
  try {
    const { accountId, amount, description } = req.body;
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Check if account exists and belongs to user
    const account = await Account.findOne({ 
      _id: accountId,
      user: req.user.id
    });
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Check if account has sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Create transaction
    const transaction = new Transaction({
      user: req.user.id,
      fromAccount: accountId,
      amount,
      type: 'Withdrawal',
      description: description || 'ATM Withdrawal'
    });
    
    // Update account balance
    account.balance -= amount;
    
    await Promise.all([
      transaction.save(),
      account.save()
    ]);
    
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a deposit transaction
router.post('/deposit', auth, async (req, res) => {
  try {
    const { accountId, amount, description } = req.body;
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Check if account exists and belongs to user
    const account = await Account.findOne({ 
      _id: accountId,
      user: req.user.id
    });
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Create transaction
    const transaction = new Transaction({
      user: req.user.id,
      fromAccount: accountId,
      amount,
      type: 'Deposit',
      description: description || 'Deposit'
    });
    
    // Update account balance
    account.balance += amount;
    
    await Promise.all([
      transaction.save(),
      account.save()
    ]);
    
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;