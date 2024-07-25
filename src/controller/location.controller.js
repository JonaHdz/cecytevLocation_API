const LocationStudent = require('../model/LocalizacionEstudiante.model');
const Student = require('../model/Estudiante.model');
const uuid = require('uuid');

const registerLocationStudent = async (req, res) => {
    const { matricula, latitud, longitud } = req.body;
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
                    matricula: matricula
                }
            });
            //localizaicon encontrada
            if (locationStudentFinded) {
                await LocationStudent.update({
                    fechaRegistro: locationStudentFinded.fechaRegistro + ";" + Date.now(),
                    latitud: locationStudentFinded.latitud + ";" + latitud,
                    longitud: locationStudentFinded.longitud + ";" + longitud
                }, {
                    where: {
                        matricula: matricula
                    }
                });
                res.status(200).send({
                    message: "Localizacion de estudiante actualizada"
                });
            } else {
                LocationStudent.create({
                    idLocalizacionEstudiante: uuid.v4(),
                    fechaRegistro: Date.now(),
                    matricula: matricula,
                    latitud: latitud,
                    longitud: longitud
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
    var { matricula, telefono } = req.body;
    try {
        //RECUPERANDO LOCALIZACION DE ALUMNO
        const locationStudent = await LocationStudent.findOne({
            where: {
                matricula: matricula
            }
        })
        if (locationStudent) {
            const locationStudentData = locationStudent.toJSON();
            res.status(200).send({
                idLocalizacionEstudiante: locationStudentData.idLocalizacionEstudiante,
                fechaRegistro: locationStudentData.fechaRegistro,
                matricula: locationStudentData.matricula,
                latitud: locationStudentData.latitud,
                longitud: locationStudentData.longitud
            });
        } else {
            res.status(404).send({
                message: "No se encontró alguna localización previa del estudiante"
            });
        }

    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

const getChildrenList = async (req, res) => {
    console.log("getChildrenList--------------------s");
    const {telephoneParent}  = req.body;
    //var childrenList = await LocationStudent.findAll({
      //  telefono : telefono
    //})
    var childrenList = await Student.findAll({
        where: {
            telefono: telephoneParent
        }
    });
    if (childrenList) {

        const childrenListFiltered = [];
        childrenList.forEach(child => {
            childrenListFiltered.push({
                idStudent: child.matricula,
                name: child.nombre + " " + child.appaterno + " " + child.apmaterno,
            });
        });
        console.log("lista por enviar a app: " + childrenListFiltered);
    res.status(200).send({
        childrenListFiltered
    });
    } else {
        res.status(404).send({
            message: "No se encontraron hijos registrados"
        });
    }
}

module.exports = { registerLocationStudent, getLocationStudent , getChildrenList}

