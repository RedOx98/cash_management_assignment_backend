const express = require('express');
const jwt = require('jsonwebtoken');
const createError = require('../utils/error');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();


const register = async (req, res, next) => {
    // const {email, password: plainTextPassword, fullname, account_num} = req.body;

    // if (!email || !password || !fullname || !account_num){
    //     return res.status(400).json({status: 'error', msg: 'All fields must be entered'});
    // }

    // if(plainTextPassword.length <=6){
    //     return res.status(400).json({status: 'error', msg: 'Password is too short'});
    // }

    // const password = await bcrypt(plainTextPassword, 10);

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        let newUser = new User ({
            ...req.body,
            password: hash
        });

        

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        next(err)
    }

};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email})
    if(!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 
        process.env.JWT_SEC,
        {expiresIn:'3d'});
        
        if(!isPasswordCorrect) return next(createError(400, 'Wrong password or username'));
        // const accountNumber = await User.findByIdAndUpdate({req.})
        const {password, ...info} = user._doc
        res.cookie('access_token', token, {
            httpOnly: true,
        })
        .status(200)
        .json({details: {...info}, });
    } catch (error) {
        next(err);
    }
    
}







module.exports = {login, register};