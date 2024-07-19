const router = require('express').Router();
const { login, getAllStudents, testConnection } = require("../controller/login.controller.js");


router.post("/login", login);
router.get("/students", getAllStudents);
router.post("/testConnection", testConnection);

module.exports = router;