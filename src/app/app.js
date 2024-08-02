const express = require ("express");
const app = express();
const routerLogin = require("../router/login.route");
const routerAttendance = require("../router/attendance.router");
const routerLocation = require("../router/location.router");

//ruta base para la api
const path  = '/api/v1'
//middleware para que el servidor pueda recibir y enviar json
app.use(express.json());

//!BORRAR esta GET, ES DE PRUEBA
app.get("/",(req,res) =>{
    res.send("PRUEBA DE API RAIZ")

});
//rutas de la api
app.use(path,routerLogin);
app.use(path,routerAttendance);
app.use(path,routerLocation);


module.exports = app;
