
const Student = require('../model/Estudiante.model');
const Teacher = require('../model/Usuario.model');
const Cargo = require('../model/Cargo.model');
const express = require('express');
const token = require('jsonwebtoken');
const moment = require('moment');
const { where } = require('sequelize');
require('dotenv').config();
const key = process.env.JWT_SECRET;

//variables para twilio
// const accountSid = '';
// const authToken = '';
//const client = require('twilio')(accountSid, authToken);

//Comprueba que sea un estudiante, academico o padre de familia
//tambien debe mandar mensaje a padre de familia
const login = async (req, res) => {
    const { user, passwordUser } = req.body;
    console.log("user: ", user + " password     " + passwordUser);
    try {
        const student = await Student.findOne({
            where: {
                matricula: user,
                contrasena: passwordUser
            }
        });
        if (student) {
            var dateNow = moment().subtract(10, 'days').calendar();
            var datehour = moment().format('LT')
            //ENVIO DE MENSAES
            console.log("ES UN ESTUDIANTE");
            const tokenStudent = token.sign({ id: user, type: "estudiante" }, key, { expiresIn: '40m' });
            res.status(200).header('auth-token', tokenStudent).send({
                idUser: student.matricula,
                name: student.nombre + student.appaterno + " " + student.apmaterno,
                type: "Estudiante"
            });
        } else {
            //buscar academico
            const teacher = await Teacher.findOne({
                where: {
                    email: user,
                    password: passwordUser
                }
            })
            if (teacher) {
                //buscar el cargo del academico
                const cargo = await Cargo.findOne({
                    where: {
                        idcargo: teacher.idcargo
                    }
                });
                const tokenAcademic = token.sign({ id: user, type: cargo.cargo }, key, { expiresIn: '40m' });
                res.status(200).header('auth-token', tokenAcademic).send({
                    idUser: teacher.email,
                    name: teacher.nombre,
                    type: cargo.cargo
                });
            } else {
                console.log("numero: " + passwordUser + "\n matricula: " + user);
                const parent = await Student.findOne({
                    where: {
                        matricula: user,
                        telefono: passwordUser
                    }
                });
                if (parent) {
                    //console.log("parent: ", parent);    
                    const tokenParent = token.sign({ id: user, type: "tutor" }, key, { expiresIn: '40m' });
                    res.status(200).header('auth-token', tokenParent).send({
                    idUser : passwordUser,
                    name : parent.nombre + " " + parent.appaterno + " " + parent.apmaterno,
                    type : "Padre"
                    });
                }
                else {
                    res.status(404).send({
                        message: "Usuario no encontrado: " + parent
                    });
                }
            }
        }
    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json({
            message: "All students",
            students
        });
    }
    catch (error) {
        res.json({
            message: "Error"
        });
    }
}

// function sendMessage(student) {
//     var dateNow = moment().subtract(10, 'days').calendar();
//     var datehour = moment().format('LT')
//     //
//     client.messages
//         .create({
//             body: "Estimado pradre de familia. se le informa que su hijo " + student.nameStudent + " " + student.lastNameStudent + " con matricula " + student.idStudent + " registrò su ingreso al plantel a con fecha: " + dateNow + " a las " + datehour + ". \n\nESTE MENSAJE ES INFORMATIVO. FAVOR DE NO CONTESTAR.",
//             from: '+',
//             to: '+'
//         })
//         .then(message => console.log(message.sid))
//         .done();
// }

const testConnection = async (req, res) => {
    try {
        const x = await Student.findAll();
        console.log('Connection has been established successfully:');
        res.json({
            data: x,
            message: "Connection has been established successfully"
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({
            message: "Unable to connect to the database" + error
        });
    }
}

module.exports = {
    login,
    getAllStudents,
    testConnection
}