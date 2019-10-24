// all mongoose database models
// create a new file for each model

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Test', testSchema);