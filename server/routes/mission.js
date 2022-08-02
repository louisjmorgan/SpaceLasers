var express = require('express');
var router = express.Router();
mission_controller = require('../controllers/missionController.js')

/* GET users listing. */
router.get('/', mission_controller.mission_get);

module.exports = router;
