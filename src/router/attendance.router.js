
const router = require('express').Router();
const { registerAttendance } = require("../controller/attencance.controller");
//ruta para registrar la asistencia de un estudiante y el modulo
router.post("/registerattendance", registerAttendance);

module.exports = router;