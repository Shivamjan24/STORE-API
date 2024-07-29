const express=require('express');
const router=express.Router();
const {getproducts,getproductsstatic}=require("../controllers/products")


router.route('/').get(getproducts);
router.route('/static').get(getproductsstatic);


module.exports=router;