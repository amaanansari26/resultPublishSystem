const express = require('express');

const studentController = require('../controllers/student');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('main.ejs')
})
router.get('/result',(req,res)=>{
    res.render('result.ejs')
})
module.exports = router;