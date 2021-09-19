const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
    rollnumber:{
        type: Number,
        require:true
        
      },
    subjectcode: {
        type: String,
        require:true
        
    },
    obtainMarks:{
        type: Number
    },
    totalMarks:{
        type: Number
    }
})
module.exports = mongoose.model('Results', resultSchema);