const { UUID } = require("sequelize");
const Attendance = require("../model/Asistencia.model")
const Students = require("../model/Estudiante.model")
const uuid = require('uuid');

const registerAttendance = async (req, res) => {
    const { typeAttendance, idStudent, idTeacher } = req.body;

    try {
        val = await Students.findOne({
            where: {
                matricula: matricula
            }
        }); 
        if (!val) {
            res.status(404).send({
                message: "Student not found"
            });
            return;
        }

        Attendance.create({
            idAsistencia : uuid.v4(),
            fechaAsistencia: Date.now(),
            tipoAsistencia: typeAttendance,
            matricula: idStudent,
            emailDocente: idTeacher
            
        })
        res.status(200).send({
            nombreEstudiante : val.nombre,
            apeliddoEStudiantes : val.appaterno + " " + val.apmaterno,
            matricula : val.matricula,
        });
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }




}

module.exports = { registerAttendance }
