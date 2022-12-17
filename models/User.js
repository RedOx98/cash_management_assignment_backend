const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    account_num: {type: Number, required: true},
    account_bal: {type: Number},
    verified: {type: Boolean, default: false}
}, {timestamps: true}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);