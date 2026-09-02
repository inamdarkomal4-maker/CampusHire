const bcrypt = require("bcryptjs");

const job = require("./models/job");
require("dotenv").config();

const express = require("express");
const Application = require("./models/application");
const User = require("./models/user");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CampusHire Backend is Running!");
});

app.get("/api/jobs", async (req, res) => {

    try{
        const jobs = await job.find();
        res.json(jobs);
    }catch (error){
        res.status(500).json({
            Message: "failed to fetch jobs",
            error:error.Message
        });
    }

});
app.post("/api/jobs",async(req,res)=>{
    try{
        const newJob = await job.create(req.body);
        res.status(201).json(newJob);

    }catch(error){
        res.status(500).json({
            message:"failed to create job",
            error:error.mesaage
        });
    }
    
});

app.post("/api/applications", async (req, res) => {
    try {
        const application = new Application(req.body);

        const savedApplication = await application.save();

        res.status(201).json({
            message: "Application submitted successfully",
            application: savedApplication
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to submit application"
        });
    }
});
app.get("/api/applications", async (req, res) => {
    try {

        const email = req.query.email;

        if (!email) {
            return res.status(400).json({
                message: "User email is required"
            });
        }

        const applications = await Application
            .find({ userEmail: email })
            .sort({ appliedAt: -1 });

        res.json(applications);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
});
// REGISTER USER

app.post("/api/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }

});
// LOGIN USER

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Login failed"
        });
    }

});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoDB connected sucessfully");
    app.listen(PORT,()=>{
        console.log(`CampusHire server running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.log("mongoDB connection failed:",error.message);
});

