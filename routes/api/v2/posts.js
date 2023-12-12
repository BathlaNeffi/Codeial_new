const express = require('express');
const router = express.Router();
const postsApiV2=require('../../../controller/api/v2/posts_api');
router.get('/',postsApiV2.index);
module.exports=router;  