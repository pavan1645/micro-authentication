const conn = require("../connections/mongoose");

const userSchema = new conn.Schema({
	name: String,
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
}, { strict: false });


const USER = conn.model("user", userSchema);

module.exports = USER;