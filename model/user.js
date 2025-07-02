const mongoose = require("mongoose");
const express = require("express");

// creating a userschema
const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String, 
    confirm_password: String,
    dateOfBirth: String
} ,{collection:"users"});

// creating a model using the userSchema
const model = mongoose.model("User", userSchema);

module.exports = model;
