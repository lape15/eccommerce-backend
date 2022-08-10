const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for user
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'This field is required'],
    
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique:false
  },
  items:[{type: Schema.Types.ObjectId, ref: 'Item'}]
});

// Create model for user
const User = mongoose.model.Users || mongoose.model('User', UserSchema);

module.exports = User;