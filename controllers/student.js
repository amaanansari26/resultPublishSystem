const results = require('../models/results')

const Results = require('../models/results'),
    Students = require('../models/students'),
    Subjects = require('../models/subjects'),
    errh=(err)=>{console.log(err)}

exports.getStudentResult = (req,res,next)=>{
   Students.findOne({'rollno':req.body.rollno}).then((student)=>{
        
    Results.find({'rollnumber':student.rollno}).then((results)=>{

        const codes=[]
        results.forEach((result)=>{
            codes.push(result.subjectcode)
        })

        Subjects.find({"code":codes}).then((subs)=>{
            //console.log(subs)
            //console.log(results)
            const fresult=[]
            subs.forEach(ele=>{
                results.forEach(ele2=>{
                    if(ele.code==ele2.subjectcode){
                        ele2.subjectname=ele.name
                        fresult.push([ele2.subjectcode,ele.name,ele2.obtainMarks,ele2.totalMarks])
                    }
                })
            })

            console.log(fresult)
            res.render('result',{student:student,results:fresult})
        }).catch(errh)



    }).catch(errh)



}).catch(errh)
    
}