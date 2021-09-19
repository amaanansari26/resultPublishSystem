const results = require('../models/results')

const Results = require('../models/results'),
    Students = require('../models/students'),
    Subjects = require('../models/subjects'),
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