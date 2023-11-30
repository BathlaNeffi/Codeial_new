const express= require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');

// routing the request to home controller
router.get('/',homeController.home);

console.log('Added this on line 8 and route>index.js')



module.exports=router;