const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Transfer = require('../models/Transfer');
const { verifyToken } = require('../utils/verify');

const router = express.Router();

router.post('/transfer', verifyToken, async (req, res, next) => {
    try {
        jwt.verify(req.token, process.env.JWT_SECRET, (err, verifiedUser) => {
            if (err)
                res.status(403).json('Forbidden');
            // } else {
            //     //res.status(200).json({message: 'verified', verifiedUser});
            //     next();
            // }
        });

        const found = await User.findOne({
            _id: req.body.beneficiary_id,
            account_num: req.body.beneficiary_accountnum
        });

        if (!found) {
            return res.status(404).json({ status: 'error', message: 'This account does not exist' });
        }

        let transfer = new Transfer({
            ...req.body
        });

        await transfer.save();

        let user = await User.findOneAndUpdate(
            { _id: req.body.accountowner_id },
            { "$inc": { "account_bal": -req.body.transfer_amount } },
            { new: true }
        ).select(['-email', '-password', '-fullname', '-verified']).lean();

        await User.updateOne(
            { _id: req.body.beneficiary_id },
            { "$inc": { "account_bal": req.body.transfer_amount } }
        );
        return res.status(200).json({ status: 'ok', message: 'Transfer successful', user });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 'error', message: 'An error occurred' });
    }
});




module.exports = router;