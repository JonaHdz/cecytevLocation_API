const router = require('express').Router();
const { check } = require('express-validator');
const { registerLocationStudent, getLocationStudent, getChildrenList } = require("../controller/location.controller");

//ruta especificas para cada funcion del controlador
router.post('/location/registerLocation', [
    check('matricula')
        .notEmpty().withMessage('Campo matcula obligatoria')
        .trim()
        .matches(/^[0-9]+$/).withMessage('matricula invalida'),
    check(latitud)
        .notEmpty().withMessage('Campo latitud obligatoria')
        .trim()
        .matches(/^[0-9.]+$/).withMessage('latitud invalida'),
    check(longitud)
        .notEmpty().withMessage('Campo longitud obligatoria')
        .trim()
        .matches(/^[0-9.]+$/).withMessage('longitud invalida'),],

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    registerLocationStudent);

//Ruta para obtener la localizacion de un estudiante
router.get('/location/getLocationStudent/:matricula', [
    check('matricula')
        .notEmpty().withMessage('Campo matricula obligatoria')
        .trim()
        .matches(/^[0-9]+$/).withMessage('matricula invalida'),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
},
    getLocationStudent);

//Ruta para obtener la lista de hijos de un padre
router.post('/location/getChildrenList', [
    check('telephoneParent')
        .notEmpty().withMessage('Campo telefono obligatoria')
        .trim()
        .matches(/^[0-9]+$/).withMessage('telefono invalido')
        .length({ min: 10, max: 10 }).withMessage('telefono invalido'),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
    , getChildrenList);

module.exports = router;