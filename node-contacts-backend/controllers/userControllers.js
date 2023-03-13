const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register a user
// @route POST /api/Users
// @access public
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('All fields mandatory')
	}
	const availableUser = await Users.findOne({ email });
	if (availableUser) {
		res.status(400);
		throw new Error('User already registered')
	}
	const hashedPassword = await bcrypt.hash(password, 5);
	const user = await Users.create({ username, email, password: hashedPassword });
	if (user) {
		res.status(201)
		res.json({ _id: user.id, email: user.email })
	} else {
		res.status(400);
		throw new Error('User data not valid')
	}
	res.json(user)
})

// @desc Login a user
// @route POST /api/Users
// @access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error('All fields mandatory')
	}
	const user = await Users.findOne({ email });
	if (user && await (bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				user: {
					email: user.email,
					username: user.username,
					id: user.id
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		)
		res.json(accessToken)
	} else {
		res.status(401);
		throw new Error('Email or password not valid')
	}
})

// @desc Get current user
// @route GET /api/Users
// @access private
const currentUser = asyncHandler(async (req, res) => {
	res.json(req.user)
})

module.exports = {
	registerUser,
	loginUser,
	currentUser,
}