const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

//importing my model in line 4
const User = require('../model/user')
 
const router = express.Router();

// Endpoint to signup 
router.post("/signUp", async (req,res) => {
    const {Name,Email,Password,confirm_password,dateOfBirth} = req.body || {};
    console.log(Name)
    //checking all field
    if (!Name || !Email || !Password || !confirm_password || !dateOfBirth) {
        res.status(400).send({status:"error", message:"All field must be filled"})
        return
    };

    //checking password length
    if (Password.length < 4) {
        res.status(401).send({status:"error",message:"password must be more than 4 characters"})
    };

    // checking password and confirmPassword are the same
    if (Password!==confirm_password) {
        res.status(401).send({status:"errors",message:"wrong password!!"})
    };

    try {
        // const user = new User();
        // user.Name = Name;
        // user.Email= Email;
        // user.Password= await bcrypt.hash(Password, 10);
        // user.confirm_password = confirm_password;
        // user.dateOfBirth = dateOfBirth;

        // //saving documents to my database
        // await user.save();

        const user = await User.create({
            Name,
            Email,
            Password:await bcrypt.hash(Password, 10),
            confirm_password,
            dateOfBirth
        })

        return res.status(201).send({status:"ok",message:"You have SignUp Successfully✅" , user});
    } catch (e) {
        console.error(e);
        return res.status(500).send({status:"error", message:"some error occurred", error:e.toString()})
    }
});

//Endpoint for login
router.post("login",async (req,res) => {
    const {Email,Password}= req.body;

    //checking the required field
    if (!Email ||!Password) {
        res.status(400).send({status:"error",message:"All field must be filled"})
    };
    try {
        const user = await User.findOne({Email});
        if(!user){
            return res.status(400).send({status:"error", message:"Email or Password incorrect"})

            if (await bcrypt.compare(Password, user.Password)) {
                
                //update my database
                user.save();

                //generate token
                const token = jwt.sign({
                    _id: user._id,
                    Email: user.Email
                }, process.env.JWT_SECRET 
            );
            return res.status(200).send({status:"ok",message:"You have Logged in successfully", user ,token})
            }
            return res.status(400).send({status:"error", message:"incorrect password or email"});
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({status:'error', message:"some error occurred", error:e.toString()})
    }
});

module.exports = router