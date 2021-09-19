const express = require('express');

const studentController = require('../controllers/admin');

const router = express.Router();

router.get('/swupdate',(req,res)=>{
    res.render('swupdate.ejs')
})
router.get('/stupdate',(req,res)=>{
    res.render('stupdate.ejs')
})
router.get('/addstudent',(req,res)=>{
    res.render('addStudent.ejs')
})
router.get('/addsubject',(req,res)=>{
    res.render('addSubject.ejs')
})
module.exports = router;