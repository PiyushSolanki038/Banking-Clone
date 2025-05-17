const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  accountType: {
    type: String,
    enum: ['Savings', 'Checking', 'Fixed Deposit'],
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Closed'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a random account number
AccountSchema.statics.generateAccountNumber = function() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

module.exports = mongoose.model('Account', AccountSchema);