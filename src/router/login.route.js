const router = require('express').Router();
const { login, getAllStudents } = require("../controller/login.controller.js");


router.post("/login", login);
router.get("/students", getAllStudents);

module.exports = router;