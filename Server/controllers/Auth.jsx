const User = require("../models/User");
const otpGenerator = require('otp-generator');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const Profile = require("../models/Profile");
require('dotenv').config()

exports.sendotp = async(req,res) => {
    try{
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                sucess: false,
                message: "User is already exist"
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log(otp);

    }
    catch(error){

    }
}