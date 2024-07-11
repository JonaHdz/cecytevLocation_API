
const router = require('express').Router();
const { registerAttendance } = require("../controller/attencance.controller");

router.post("/registerattendance", registerAttendance);

module.exports = router;