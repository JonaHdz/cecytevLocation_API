const express = require ("express");
const app = express();
const routerLogin = require("../router/login.route");
const routerAttendance = require("../router/attendance.router");
const routerLocation = require("../router/location.router");


const path  = '/api/v1'

app.use(express.json());

//!BORRAR esta GET, ES DE PRUEBA
app.get("/",(req,res) =>{
    res.send("PRUEBA DE API RAIZ")

});
app.use(path,routerLogin);
app.use(path,routerAttendance);
app.use(path,routerLocation);




module.exports = app;
