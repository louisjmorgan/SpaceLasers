var express = require('express');
var router = express.Router();
mission_controller = require('../controllers/missionController.js')

/* GET users listing. */
router.post('/', mission_controller.mission_post);

module.exports = router;
