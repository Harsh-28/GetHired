const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    studentDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "StudentDetails",
    },
    image:{
        type: String,
        
    },
    token:{
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    accountType:{
        type: String,
        enum: ["Admin", "Student", "Employee"],
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema)