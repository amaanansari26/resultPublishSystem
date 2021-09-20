const express = require('express'),
    adminController = require('../controllers/admin'),
    router = express.Router();

const proctect=(req,res,next)=>{
    if(!req.session.isAuth){
        return res.redirect('/admin/login')
    }
    next()
}
router.get('/login',adminController.login)
router.post('/login',adminController.getAuth)
router.get('/logout',adminController.logout)

router.get('/',proctect,adminController.adminDb)
router.get('/swupdate/:code',proctect,adminController.swupdate)
//subject wise result crud
router.post('/swupdate/:code/add',proctect,adminController.swadd)
router.post('/swupdate/:code/remove',proctect,adminController.swremove)
//student wise result crud
router.get('/stupdate/:id',proctect,adminController.stupdate)
router.post('/stupdate/:id/add',proctect,adminController.stadd)
router.post('/stupdate/:id/remove',proctect,adminController.stremove)

//add and remove student
router.get('/addstudent',proctect,adminController.addRemoveStudent)
router.post('/addstudent/add',proctect,adminController.addStudent)
router.post('/addstudent/remove',proctect,adminController.removeStudent)

//add and remove subject
router.get('/addsubject',proctect,adminController.addRemoveSubject)
router.post('/addsubject/add',proctect,adminController.addSubject)
router.post('/addsubject/remove',proctect,adminController.removeSubject)
module.exports = router;