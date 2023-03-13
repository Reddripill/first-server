const express = require('express');
const { getContacts, postContacts, putContact, deleteContact, getContact } = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts).post(postContacts)
router.route('/:id').get(getContact).put(putContact).delete(deleteContact)


module.exports = router;