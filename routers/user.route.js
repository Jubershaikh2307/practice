const express = require('express');
const { userModel } = require('../Models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = express()

const validator = (req,res,next)=>{
    if(req.method == "POST"){
        const { email, password } = req.body
        if(email && password){
            if(typeof(email) == "string" && typeof(password)){
                next()
            }else{
                res.send("Fail")
            }
        }else{
            res.send("Fail")
        }
    }else{
        next()
    }
}

User.use(validator)

User.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        const verified = bcrypt.compareSync(password, user.password);
        if(verified){
            const token=await jwt.sign({email},"secret");
            return res.send({token:token,success:1})
        }else{
            return res.send("Check Username and Password");
        }
    } catch (error) {
        return res.send("Check Username and Password");
    }

})

User.post("/signup", async (req, res) => {
    const { email, password } = req.body
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        const new_user = new userModel({
            email,
            password: passwordHash
        })
        await new_user.save()
        return res.send("Success")
    } catch (error) {
        return res.send(err)
    }

})

module.exports = { User }