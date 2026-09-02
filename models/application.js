const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    jobTitle: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    userEmail:{
        type:String,
        required:true
    },
    
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    resume: {
        type: String,
        required: true
    },

    coverLetter: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Applied"
    },

    appliedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model("Application", applicationSchema);