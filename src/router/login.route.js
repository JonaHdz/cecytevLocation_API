const router = require('express').Router();
const { login, getAllStudents, testConnection } = require("../controller/login.controller.js");

//ruta para el login
router.post("/login", login);

//endpoints de prueba
router.get("/students", getAllStudents);
router.post("/testConnection", testConnection);

module.exports = router;

//
