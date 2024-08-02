const router = require('express').Router();
const { registerLocationStudent, getLocationStudent, getChildrenList } = require("../controller/location.controller");

//ruta especificas para cada funcion del controlador
router.post('/location/registerLocation',registerLocationStudent );
router.get('/location/getLocationStudent/:matricula', getLocationStudent);
router.post('/location/getChildrenList',getChildrenList); 
module.exports = router;