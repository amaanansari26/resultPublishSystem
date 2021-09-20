const results = require('../models/results')

const Results = require('../models/results'),
    Students = require('../models/students'),
    Subjects = require('../models/subjects'),
    Users=require('../models/user')
    errh=(err)=>{console.log(err)}

exports.swupdate = (req,res)=>{

    Subjects.findOne({'code':req.params.code}).then((sub)=>{
        if(sub){

            Results.find({'subjectcode':sub.code}).then(results=>{

                const rollnos=[]
                results.forEach((result)=>{
                    rollnos.push(result.rollnumber)
                })
                //console.log(rollnos)
                Students.find({'rollno':rollnos}).then((stu)=>{
                    const fresult=[]
                    results.forEach(ele=>{
                        stu.forEach(ele2=>{
                            if(ele.rollnumber==ele2.rollno){
                                fresult.push([ele2.name,ele.rollnumber,ele.obtainMarks,ele.totalMarks,String(ele._id)])
                            }
                        })
                    })
                    //console.log(fresult)
                    return res.render('swupdate',{subject:sub,results:fresult})
                    //console.log(stu)
                    //console.log(results)

                }).catch(errh)

            }).catch(errh)
        }
        //return res.redirect('/')
    }).catch(errh)
    
    //res.render('swupdate.ejs')

}

exports.swadd = (req,res)=>{
    const scode = req.body.scode
    const rollno=req.body.rollno
    const om=req.body.om
    const tm=req.body.tm
    Subjects.findOne({'code':scode}).then((sub)=>{
        if(sub){

            Students.findOne({'rollno':rollno}).then((std)=>{

                if(std){

                    Results.findOneAndRemove({'rollnumber':rollno,'subjectcode':scode}).then((r)=>{

                        const result=new Results({
                            rollnumber:rollno,
                            subjectcode:scode,
                            obtainMarks:om,
                            totalMarks:tm
                        
                        })
                        result.save().then((rr)=>{
                            console.log(rr)
                            res.redirect('/admin/swupdate/'+scode)
                        }).catch(errh)

                    }).catch(errh)

                }else{res.redirect('/admin/swupdate/'+scode)}

            }).catch(errh)

        }else{res.redirect('/admin/swupdate/'+scode)}


    }).catch(errh)
}

exports.swremove = (req,res)=>{
    const id=req.body.id
    const scode=req.params.code
    Results.findByIdAndDelete(id).then(r=>{
        console.log(r)
        res.redirect('/admin/swupdate/'+scode)
    }).catch(errh)
}

exports.stupdate = (req,res)=>{
    id=req.params.id
    //console.log(id)
    if(id){
        Students.findById(id).then(student=>{
            if(student){

                console.log(student)
                Results.find({'rollnumber':student.rollno}).then((results)=>{

                    if(results){
                    
                    const codes=[]
                    results.forEach((result)=>{
                        codes.push(result.subjectcode)
                    })
            
                    Subjects.find().then((subs)=>{
                        //console.log(subs)
                        //console.log(results)
                        if(subs){
                        const fresult=[]
                        subs.forEach(ele=>{
                            results.forEach(ele2=>{
                                if(ele.code==ele2.subjectcode){
                                    ele2.subjectname=ele.name
                                    fresult.push([ele2.subjectcode,ele.name,ele2.obtainMarks,ele2.totalMarks,ele2._id])
                                }
                            })
                        })
                        console.log(results)
                        //console.log(fresult)
                        res.render('stupdate',{student:student,results:fresult,subjects:subs})
            
                    }else{res.redirect('/')}
                    }).catch(errh)
            
                }else{res.redirect('/')}
            
                }).catch(errh)
            


            }
        }).catch(errh)
    }
    
}
exports.stremove = (req,res)=>{
    const rid=req.body.rid
    const sid=req.params.id
    if(rid){
    Results.findByIdAndDelete(rid).then(r=>{
        console.log(r)
        res.redirect('/admin/stupdate/'+sid)
    }).catch(errh)
    
    }else{res.redirect('/admin/stupdate/'+sid)}
}

exports.stadd = (req,res)=>{
    const sid=req.params.id,
        scode=req.body.scode,
        om=req.body.om,
        tm=req.body.tm

    if(sid){
        Students.findById(sid).then(student=>{

            Subjects.findOne({'code':scode}).then(sub=>{

                if(sub){
                    Results.findOneAndDelete({'rollnumber':student.rollno,'subjectcode':sub.code}).then(rss=>{

                        const result=new Results({
                            rollnumber:student.rollno,
                            subjectcode:scode,
                            obtainMarks:om,
                            totalMarks:tm
                        
                        })
                        result.save().then(rl=>{
                            res.redirect('/admin/stupdate/'+sid)
    
                        }).catch(errh)
                        
                        
                    }).catch(errh)
                    

                }else{res.redirect('/admin/stupdate/'+sid)}

            }).catch(errh)

        }).catch(errh)
    }else{res.redirect('/admin/stupdate/'+sid)}
}

exports.addRemoveStudent=(req,res)=>{

    Students.find().then(students=>{

        res.render('addStudent',{students})
    }).catch(errh)
}
exports.addStudent=(req,res)=>{
const rollno=req.body.rollno,
    sname=req.body.sname
    if(sname && rollno && !isNaN(rollno)){

        Students.findOneAndDelete({'rollno':rollno}).then(std=>{

            const student=new Students({
                name:sname,
                rollno:rollno
            })
            student.save().then(std=>{
                res.redirect('/admin/addStudent')

            }).catch(errh)

        }).catch(errh)

    }else{res.redirect('/admin/addStudent')}
    
}
exports.removeStudent=(req,res)=>{
    const sid=req.body.sid
        console.log(req.body)
        Students.findById(sid).then(student=>{

            Results.deleteMany({'rollnumber':student.rollno}).then(rss=>{

                Students.findByIdAndDelete(sid).then(ss=>{
                    res.redirect('/admin/addStudent')

                }).catch(errh)

            }).catch(errh)

        }).catch(errh)
        
    }

    exports.addRemoveSubject=(req,res)=>{

        Subjects.find().then(subjects=>{
    
            res.render('addSubject',{subjects:subjects})
        }).catch(errh)
    }

    exports.addSubject=(req,res)=>{
        const scode=req.body.scode,
            sname=req.body.sname
            if(sname && scode){
        
                Subjects.findOneAndDelete({'code':scode}).then(std=>{
        
                    const subject=new Subjects({
                        name:sname,
                        code:scode
                    })
                    subject.save().then(std=>{
                        res.redirect('/admin/addSubject')
        
                    }).catch(errh)
        
                }).catch(errh)
        
            }else{res.redirect('/admin/addSubject')}
            
        }

        exports.removeSubject=(req,res)=>{
            const sid=req.body.sid
                console.log(req.body)
                Subjects.findById(sid).then(subject=>{
        
                    Results.deleteMany({'subjectcode':subject.code}).then(rss=>{
        
                        Subjects.findByIdAndDelete(sid).then(ss=>{
                            res.redirect('/admin/addSubject')
        
                        }).catch(errh)
        
                    }).catch(errh)
        
                }).catch(errh)
                
            }


exports.adminDb=(req,res)=>{
    
    res.render('adminDb')
}
exports.login=(req,res)=>{
    console.log(req.body)
    if(req.session.user){
        return res.redirect('/admin')
    }
    return res.render('login')
}
exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/login')
}
exports.getAuth=(req,res)=>{
    const username=req.body.username,
        password=req.body.password
    
    Users.findOne({'username':username}).then(user=>{
        console.log(user.password)
        console.log(password)
        if(user && user.password==password){
            console.log('trigger')
            console.log(user)
            req.session.user=user
            return res.redirect('/admin')
        }else{return res.redirect('/admin/login')}
    }).catch(errh)
}
