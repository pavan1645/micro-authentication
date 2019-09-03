const jwt = require("jsonwebtoken");

const allFunctions = {
	validate: (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		
		const user = jwt.decode(token, process.env.AUTH_SECRET);
		
		if (!user) {
			return res.send({
				success: 0,
				message: "Bad Credentials!"
			})
		}

		next();
	}
}

module.exports = allFunctions;