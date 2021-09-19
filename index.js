const express = require('express'),
    errh=(err)=>{console.log(err)},
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    app = express(),
    MONGODB_URI ='mongodb+srv://amaan:9013393120@result.xfszh.mongodb.net/resultSystem',
    studentRoutes=require('./routes/studentRoutes'),
    adminRoutes=require('./routes/adminRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(studentRoutes)
app.use('/admin',adminRoutes)
//routes
//populate
const Results = require('./models/results'),
    Students = require('./models/students'),
    Subjects = require('./models/subjects');

//(new Results({rollnumber:241,subjectcode:"fas",obtainMarks:89,totalMarks:100})).save().then(errh).catch(errh)

(new Students({name:'mdAmaan',rollno:26})).save().then(errh).catch(errh)
//(new Subjects({name:'DBMS',code:"dwdw"})).save().then(errh).catch(errh)

mongoose.connect(MONGODB_URI).then(
    app.listen(80,()=>{
        console.log('80 is ')
    })
).catch(errh)
