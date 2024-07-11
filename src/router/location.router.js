const router = require('express').Router();
const { registerLocationStudent } = require("../controller/location.controller");
router.post('/location/registerLocation',registerLocationStudent );

module.exports = router;