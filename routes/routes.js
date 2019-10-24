// Create multiple route files and import functions from controllers

const express = require('express'),
	router = express.Router(),
	controller = require('../app/controllers/controller');
	
// @route		GET /routes/test
// @desc		test route
// @params	none
// @return	-
// @permission	all
// TODO			-
router.get("/test", controller.test);

module.exports = router;