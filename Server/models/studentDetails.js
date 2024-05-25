const mongoose = require("mongoose");

const StudentDetailsSchema = new mongoose.Schema({
    Major:{
        type: String,
        
    },
    GPA:{
        type: Number,
        
    },
    TechnicalSkill:{
        type: Number,
        
    },
    SoftSkill:{
        type: Number,
        
    },
    Internship:{
        type: String,
        enum: ["Yes", "No"],
        
    },
    PrevProject:{
        type: Number,
        
    },
});

module.exports = mongoose.model("StudentDetails", StudentDetailsSchema)