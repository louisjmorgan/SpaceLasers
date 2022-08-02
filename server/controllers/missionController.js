var express = require('express');
var router = express.Router();

exports.mission_get = function(req, res) {
  res.json({
    success: true,
    time: null,
    satellite: null,
    power: null,

  })
}

