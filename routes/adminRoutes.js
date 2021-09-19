const express = require('express'),
    adminController = require('../controllers/admin'),
    router = express.Router();

router.get('/swupdate/:code',adminController.swupdate)
router.post('/swupdate/:code/add',adminController.swadd)
router.post('/swupdate/:code/remove',adminController.swremove)
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