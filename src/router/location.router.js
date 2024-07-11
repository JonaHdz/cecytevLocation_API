const router = require('express').Router();
const { registerLocationStudent, getLocationStudent } = require("../controller/location.controller");
router.post('/location/registerLocation',registerLocationStudent );
router.post('/location/getLocationStudent',getLocationStudent)

module.exports = router;