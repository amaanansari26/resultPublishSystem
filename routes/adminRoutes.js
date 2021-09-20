const express = require('express'),
    adminController = require('../controllers/admin'),
    router = express.Router();



router.get('/',adminController.adminDb)
router.get('/swupdate/:code',adminController.swupdate)
//subject wise result crud
router.post('/swupdate/:code/add',adminController.swadd)
router.post('/swupdate/:code/remove',adminController.swremove)
//student wise result crud
router.get('/stupdate/:id',adminController.stupdate)
router.post('/stupdate/:id/add',adminController.stadd)
router.post('/stupdate/:id/remove',adminController.stremove)

//add and remove student
router.get('/addstudent',adminController.addRemoveStudent)
router.post('/addstudent/add',adminController.addStudent)
router.post('/addstudent/remove',adminController.removeStudent)

//add and remove subject
router.get('/addsubject',adminController.addRemoveSubject)
router.post('/addsubject/add',adminController.addSubject)
router.post('/addsubject/remove',adminController.removeSubject)
module.exports = router;