
const Student = require('../model/Student.model');
const Teacher = require('../model/Teacher.model');
const express = require('express');
const token = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.JWT_SECRET;


const login = async (req, res) => {
    console.log("RECIBO: ", req.body);
    const { idStudent, passwordStudent} = req.body;
    console.log("ID: ", idStudent, "PASS: ", passwordStudent);
    try {
        const student = await Student.findOne({
            where: {
                idStudent : idStudent,
                passwordStudent : passwordStudent
            }
        });
        if (student) {
            const tokenStudent = token.sign({ id: student , type: "student"}, key,{expiresIn: '40m' });
            res.status(200).header('auth-token', tokenStudent).send({
                idUser: student.idStudent,
                nameUser: student.nameStudent,
                lastnameUser: student.lastNameStudent,
                type : "student"
            }); 
        } else {
            const teacher = await Teacher.findOne({
                where: {
                    idteacher : idStudent,
                    passwordTeacher: passwordStudent
                }
            })
            if (teacher) {
                console.log("TEACHER: ", teacher);
                const tokenStudent = token.sign({ id: student , type: "teacher"}, key,{expiresIn: '40m' });
                res.status(200).header('auth-token', tokenStudent).send({
                    idUser: idStudent,
                    nameUser: teacher.nameTeacher,
                    lastnameUser: teacher.lastnameTeacher,
                    type : "teacher"
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

module.exports = {
    login,
    getAllStudents
}