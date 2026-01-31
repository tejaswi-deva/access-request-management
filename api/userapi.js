require("dotenv").config();
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const router = express.Router()

router.post('/users/signup', async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const role = req.body.role
    const password = req.body.password

    console.log("name:", name)
    
    // Check all required fields
    if(!email || !password || !role || !name){
        return res.json({"message":"All fields are required: name, email, role, password"})
    }
    
    const allowedRoles = ["REQUESTER", "APPROVER"];
    if (!allowedRoles.includes(role)) {
      return res.json({ message: "Invalid role. Allowed roles: REQUESTER, APPROVER"
      });
    }

    //  Password validation
    if (password.length < 8) {
      return res.json({message: "Password must be at least 8 characters long"
      });
    }

    const userCheck =  await User.findOne({email: email})
    console.log("userCheck:", userCheck)
    if(userCheck){
        return res.json({"message": "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name: name,
        email: email,
        role: role,
        passwordHash: hashedPassword
    })
    await user.save()

    res.json({"message": "User Registered Succesfully"}) 
})

router.post('/login', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.json({"message": "Email is Invalid "})
        }
        console.log("user password:", user.passwordHash)
        const isPasswordMatching = await bcrypt.compare(req.body.password, user.passwordHash)
        if (!isPasswordMatching) {
            return res.json({"message": "Invalid Credentials"})
        }
        try{
        const token = jwt.sign(
            {user: user._id},
            process.env.SECRETE_CODE,
            {expiresIn: '1h'}
        )
        return res.json({message: "login Succesful", "token": token})
        } 
        catch(err){
            console.log(err)
            return res.json({message : "Server Error"})
        }
    })

module.exports = router