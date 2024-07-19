const { UUID } = require("sequelize");
const Attendance = require("../model/Asistencia.model")
const Students = require("../model/Estudiante.model")
const uuid = require('uuid');

const registerAttendance = async (req, res) => {
    const { typeAttendance, idStudent, idTeacher } = req.body;

    try {
        val = await Students.findOne({
            where: {
                idStudent: idStudent
            }
        }); 
        if (!val) {
            res.status(404).send({
                message: "Student not found"
            });
            return;
        }

        Attendance.create({
            idattendances : uuid.v4(),
            dateAttendance: Date.now(),
            typeAttendance: typeAttendance,
            idStudent: idStudent,
            idTeacher: idTeacher
            
        })
        res.status(200).send({
            nameStudent : val.nameStudent,
            lastNameStudent : val.lastNameStudent,
            idStudent : val.idStudent,
        });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }




}

module.exports = { registerAttendance }
