const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please type the user name']
	},
	email: {
		type: String,
		required: [true, 'Please type the email'],
		unique: [true, 'This email already exist']
	},
	password: {
		type: String,
		required: [true, 'Please type the password'],
	},
},
	{
		timestamp: true,
	}
)

module.exports = mongoose.model('User', userSchema);