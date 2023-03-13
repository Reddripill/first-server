const mongoose = require('mongoose');

const contactScema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		refs: 'User',
	},
	name: {
		type: String,
		required: [true, 'Please add the contact name']
	},
	email: {
		type: String,
		required: [true, 'Please add the contact email']
	},
	phone: {
		type: String,
		required: [true, 'Please add the contact phone number']
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Contacts', contactScema)