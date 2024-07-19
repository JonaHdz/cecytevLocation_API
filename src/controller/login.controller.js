
const Student = require('../model/Estudiante.model');
const Teacher = require('../model/Usuario.model');
const Cargo = require('../model/Cargo.model');
const express = require('express');
const token = require('jsonwebtoken');
const moment = require('moment');
const { where } = require('sequelize');
require('dotenv').config();
const key = process.env.JWT_SECRET;
idCargo
//variables para twilio
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);


const login = async (req, res) => {
    console.log("RECIBO: ", req.body);
    const { idStudent, passwordStudent } = req.body;
    try {
        const student = await Student.findOne({
            where: {
                matricula: idStudent,
                contrasena: passwordStudent
            }
        });
        if (student) {
            //
            var dateNow = moment().subtract(10, 'days').calendar();
            var datehour = moment().format('LT')
            //console.log("valores de estdudent: ", student.dataValues)
            //console.log("Estimado pradre de familia. se le informa que su hijo " + student.nameStudent + " " + student.lastNameStudent + " con matricula " + student.idStudent + " registrò su ingreso al plantel a con fecha: " + dateNow +" a las " + datehour+ ". \n\nESTE MENSAJE ES INFORMATIVO. FAVOR DE NO CONTESTAR.")

            //
            client.messages
                .create({
                    body: "Estimado pradre de familia. se le informa que su hijo " + student.nameStudent + " " + student.lastNameStudent + " con matricula " + student.idStudent + " registrò su ingreso al plantel a con fecha: " + dateNow + " a las " + datehour + ". \n\nESTE MENSAJE ES INFORMATIVO. FAVOR DE NO CONTESTAR.",
                    from: '+15736725260',
                    to: '+522283340036'
                })

            //
            const tokenStudent = token.sign({ id: student, type: "student" }, key, { expiresIn: '40m' });
            res.status(200).header('auth-token', tokenStudent).send({
                matricula: student.idStudent,
                nombre: student.nameStudent,
                apellido: student.appaterno + " " + student.apmaterno,
                type: "student"
            });
        } else {
            const teacher = await Teacher.findOne({
                where: {
                    emailDocente: idStudent,
                    password: passwordStudent
                }
            })
            if (teacher) {
                const cargo = await Cargo.findOne({
                    where: {
                        idcargo: teacher.idcargo
                    }
                });
                console.log("TEACHER: ", teacher);
                const tokenStudent = token.sign({ id: idStudent, type: cargo.cargo }, key, { expiresIn: '40m' });
                res.status(200).header('auth-token', tokenStudent).send({
                    email: idStudent,
                    nombre: teacher.nameTeacher,
                    tipo: cargo.cargo
                });
            } else {
                res.status(404).send({
                    message: "User not found"
                });
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

function sendMessage(student) {
    var dateNow = moment().subtract(10, 'days').calendar();
    var datehour = moment().format('LT')
    //console.log("valores de estdudent: ", student.dataValues)
    //console.log("Estimado pradre de familia. se le informa que su hijo " + student.nameStudent + " " + student.lastNameStudent + " con matricula " + student.idStudent + " registrò su ingreso al plantel a con fecha: " + dateNow +" a las " + datehour+ ". \n\nESTE MENSAJE ES INFORMATIVO. FAVOR DE NO CONTESTAR.")

    //
    client.messages
        .create({
            body: "Estimado pradre de familia. se le informa que su hijo " + student.nameStudent + " " + student.lastNameStudent + " con matricula " + student.idStudent + " registrò su ingreso al plantel a con fecha: " + dateNow + " a las " + datehour + ". \n\nESTE MENSAJE ES INFORMATIVO. FAVOR DE NO CONTESTAR.",
            from: '+15736725260',
            to: '+522283340036'
        })
        .then(message => console.log(message.sid))
        .done();
}

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