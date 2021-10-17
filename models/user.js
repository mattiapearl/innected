const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Please enter an Email"],
		unique: true,
		lowercase: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		required: [true, "Please enter a Password"],
		minlength: [6, "Your Password must be at least 6 characters long"],
	},
	email_verified: { type: Boolean, default: false },
	is_admin: { type: Boolean, default: false },
});

//this refers to the saved user in the authcontroller, the one about to be sent to the database

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//Static method to login
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect email or password");
	}
	throw Error("incorrect email or password");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
