const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    bank: {type: String, unique: true, required: true},
    account_num: {type: String, required: true},
    amount: {type: String, required: true},
    Remark: {type: String, required: false}
}, {timestamps: true}, {collection: 'transfers'});

module.exports = mongoose.model('Transfer', transferSchema);
