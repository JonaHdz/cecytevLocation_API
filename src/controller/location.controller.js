const  LocationStudent  = require('../model/locationStudent.model');
const  Student  = require('../model/Student.model');
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
                    idLocationStudent:  uuid.v4(),
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

module.exports = { registerLocationStudent }