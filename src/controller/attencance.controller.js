const Attendance = require("../model/Attendance.model")
const Students = require("../model/Student.model")


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
