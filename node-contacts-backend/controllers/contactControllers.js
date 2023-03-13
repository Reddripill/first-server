const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel')
// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contacts.find({ user_id: req.user.id });
	res.status(200).json(contacts)
})
// @desc Create new contacts
// @route POST /api/contacts
// @access private
const postContacts = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400);
		throw new Error('All fields mandatory');
	}
	const contact = await Contacts.create({
		name,
		email,
		phone,
		user_id: req.user.id,
	})
	res.status(200).json(contact)
})
// @desc Change contact
// @route PUT /api/contacts
// @access private
const putContact = asyncHandler(async (req, res) => {
	const contact = await Contacts.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error('Contact not found');
	}
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User don't have permissions to change this contact")
	}
	const updatedContact = await Contacts.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)
	res.status(200).json(updatedContact)
})
// @desc Delete contact
// @route DELETE /api/contacts
// @access private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contacts.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error('Contact not found');
	}
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User don't have permissions to delete this contact")
	}
	const deletedContact = await Contacts.findByIdAndRemove(req.params.id)
	res.status(200).json(deletedContact)
})
// @desc Get contact
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contacts.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error('Contact not found');
	}
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User don't have permissions to get this contact")
	}
	res.status(200).json(contact)
})

module.exports = { getContacts, postContacts, putContact, deleteContact, getContact }