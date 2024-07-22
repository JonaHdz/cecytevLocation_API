const router = require('express').Router();
const { registerLocationStudent, getLocationStudent, getChildrenList } = require("../controller/location.controller");
router.post('/location/registerLocation',registerLocationStudent );
router.post('/location/getLocationStudent',getLocationStudent);
router.post('/location/getChildrenList',getChildrenList); 
module.exports = router;