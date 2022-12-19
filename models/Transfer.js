const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    accountowner_id: {type: String, required: true},
    beneficiary_id: {type: String, required: true},
    beneficiary_accountnum: {type: Number, required: true},
    beneficiary_bank: {type: String, required: true},
    transfer_amount: {type: Number, required: true},
    remark: String
}, {timestamps: true}, {collection: 'transfers'});

const model = mongoose.model('Transfer', transferSchema);
module.exports = model;