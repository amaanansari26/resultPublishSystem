const express = require('express'),
    errh=(err)=>{console.log(err)},
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    app = express(),
    MONGODB_URI ='mongodb+srv://amaan:9013393120@result.xfszh.mongodb.net/resultSystem',
    studentRoutes=require('./routes/studentRoutes'),
    adminRoutes=require('./routes/adminRoutes');
    User = require('./models/user')
    store = new MongoDBStore({
        uri: MONGODB_URI,
        collection: 'sessions'
      })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  app.use((req,res,next)=>{
      if(!req.session.user){
        req.session.isAuth=false
      }else{req.session.isAuth=true}
      
      next()

  })
app.use(studentRoutes)
app.use('/admin',adminRoutes)
app.use('/',(req,res)=>{
    res.sendStatus(404)
})
//routes
//populate


//(new Results({rollnumber:241,subjectcode:"fas",obtainMarks:89,totalMarks:100})).save().then(errh).catch(errh)

//(new Students({name:'mdAmaan',rollno:26})).save().then(errh).catch(errh)
//(new Subjects({name:'DBMS',code:"dwdw"})).save().then(errh).catch(errh)

mongoose.connect(MONGODB_URI).then(
    app.listen(80,()=>{
        console.log('80 is ')
    })
).catch(errh)
