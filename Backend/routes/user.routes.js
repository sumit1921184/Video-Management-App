const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const {BlackListModel} = require("../model/blacklist.model")
const { auth } = require("../middlewares/auth.middleware")

const userRouter = express.Router()


userRouter.post("/register", async(req,res) => {
	
	try {
		const { username, email, pass, role, age} = req.body
		let email1 = await UserModel.findOne({email:email});
		if(email1){
			res.status(200).json({msg:"You are already registered please log in"})
		}
		else{
			bcrypt.hash(pass, 5, async(err, hash) => {
				if (err) {
					res.status(200).json({err})
				} else {
					const user = new UserModel({
						username,
						email,
						role,
						age,
						pass: hash
					})
					await user.save()
					res.status(200).json({msg:"The new user has been registered!"})
				}})
		}
		
		
	} catch(err) {
		res.status(400).json({err})
	}
})

userRouter.post("/login", async(req,res) => {
	const { email, pass } = req.body
	try {
		const user = await UserModel.findOne({email})
		if (user) {
			bcrypt.compare(pass, user.pass, (err, result) => {
				if (result) {
					// const token = jwt.sign({course:'nem104'},'masai');
					res.status(200).json({msg:"Login Successful!",token:jwt.sign({userId:user._id,name:user.name},process.env.Key),userId:user._id})
				} else {
					res.status(400).json({msg: "Password does not match"})
				}
			})
		} else {
			res.status(400).json({msg: "Wrong Credentials"})
		}
	} catch(err) {
		res.status(400).json({err})
	}
})

userRouter.post("/logout",auth,async(req,res)=>{
	const token = req.headers.authorization;
	try{
		const blacklist = new BlackListModel({
			token
		});
		await blacklist.save();
		res.status(200).json({msg:"Logout Successful!"})
	}
	catch(e){
		res.status(400).json({err})
	}
})

userRouter.get("/",auth,async(req,res)=>{
	try{
		const user = await UserModel.find();
		res.status(200).json({user});
	}
	catch(e){
		res.status(400).json({err})
	}
})



module.exports = {
	userRouter  
}