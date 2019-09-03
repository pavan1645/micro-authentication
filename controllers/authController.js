const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const allFunctions = {
	register: (req, res) => {
	
		User.find({email: req.body.email})
		.then((users) => {
			if (users.length > 0) {
				res.json({success: 0, message: "User already exists!"});
				throw new Error("User already exists!");
			}

			let userObj = req.body;
			userObj.password = generateHash(userObj.password);
			
			return User.insertMany(userObj);
		})
		.then((users) => {
			let user = users[0].toObject();
			delete user._id;
			delete user.__v;
			delete user.password;
			
			user["token"] = generateToken(user);
			
			res.json({
				success: 1,
				user: user
			});
		})
		.catch((err) => console.log(err) )

	},

	login: (req, res) => {
		User.find({email: req.body.email})
		.select({_id: 0, __v: 0})
		.lean()
		.then((users) => {
			if (users.length == 0) {
				res.json({
					success: 0,
					message: "No user found!"
				});
				throw new Error("No user found!");
			}

			let user = users[0];
			const password = generateHash(req.body.password);

			if (password !== user.password) {
				res.json({
					success: 0,
					message: "Bad credentials!"
				});
				throw new Error("Bad credentials!");
			}

			delete user.password;
			user["token"] = generateToken(user);

			res.send({
				success: 1,
				user: user
			})

		})
		.catch((err) => console.error(err) )
	}
}


const generateHash = (password) => {
	return crypto.createHash("SHA256").update(password).digest('hex');;
}

const generateToken = (userObj) => {
	let user = {...userObj};
	user["isTokenValid"] = true;
	return jwt.sign(user, process.env.AUTH_SECRET);
}

module.exports = allFunctions;