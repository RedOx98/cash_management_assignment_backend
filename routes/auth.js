const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const {email, password: plainTextPassword, fullname, account_num} = req.body;

    if (!email || !password || !fullname || !account_num){
        return res.status(400).json({status: 'error', msg: 'All fields must be entered'});
    }

    if(plainTextPassword.length <=6){
        return res.status(400).json({status: 'error', msg: 'Password is too short'});
    }

    const password = await bcrypt(plainTextPassword, 10);

    try {
        let user = new User;

        user.email = email;
        user.password = password;
        user.fullname = fullname;
        user.account_num = account_num;

        user = await user.save();

        const {password, ...info} = user._doc;

        const accessToken = jwt.sign({
            id: user._id,
            email: user.email,
            account_num: account_num
        }, process.env.JWT_SECRET, {'expiresIn': '3d'});

        res.status(200).json({...info, accessToken})

    } catch (error) {
        console.log(error);
        return res.status(400).send({status: 'error', msg: 'Some error occured', error});
    }

});







module.exports = router;