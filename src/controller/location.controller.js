const LocationStudent = require('../model/LocalizacionEstudiante.model');
const Student = require('../model/Estudiante.model');
const uuid = require('uuid');

const registerLocationStudent = async (req, res) => {
    const { idStudent, latitudeStudent, longitudeStudent } = req.body;
    try {

        studentFinded = await Student.findOne({
            where: {
                idStudent: idStudent
            }
        });
        //verificar que el estudiante este registrado en sistema
        if (studentFinded) {
            //verificar que estudiante no haya registrado su ubicacion
            locationStudentFinded = await LocationStudent.findOne({
                where: {
                    idStudent: idStudent
                }
            });
            if (locationStudentFinded) {
                await LocationStudent.update({
                    dateLocation: Date.now(),
                    latitudeStudent: latitudeStudent,
                    longitudeStudent: longitudeStudent
                }, {
                    where: {
                        idStudent: idStudent
                    }
                });
                res.status(200).send({
                    message: "Localizacion de estudiante actualizada"
                });
            } else {
                LocationStudent.create({
                    idLocationStudent: uuid.v4(),
                    dateLocation: Date.now(),
                    idStudent: idStudent,
                    latitudeStudent: latitudeStudent,
                    longitudeStudent: longitudeStudent
                });
                res.status(200).send({
                    message: "Localizacion de estudiante Creada"
                });
            }
        } else {
            res.status(404).send
                ({
                    message: "La matricula de estudiante no se encuentra registada en el sistema"
                });
        }
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

const getLocationStudent = async (req, res) => {
    var { idStudent, telephoneTutor } = req.body;
    try {
        var student = await Student.findOne({
            where: {
                idStudent: idStudent,
                telephoneTutor: telephoneTutor
            }
        }
        )
        //CREDENCIALES VALIDAS
        if (student) {
            //RECUPERANDO LOCALIZACION DE ALUMNO
            const locationStudent = await LocationStudent.findOne({
                where: {
                    idStudent: idStudent
                }
            })
            if (locationStudent) {
                const locationStudentData = locationStudent.toJSON();
                res.status(200).send({
                    idLocationStudent: locationStudentData.idLocationStudent,
                    dateLocation: locationStudentData.dateLocation,
                    idStudent: locationStudentData.idStudent,
                    latitudeStudent: locationStudentData.latitudeStudent,
                    longitudeStudent: locationStudentData.longitudeStudent
                });
            } else {
                res.status(404).send({
                    message: "No se encontró alguna localización previa del estudiante"
                });
            }
        }
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

module.exports = { registerLocationStudent, getLocationStudent }

