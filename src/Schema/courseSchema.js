const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        
    },
    courseId:{
        type:Number,
  
       
    },
    createAt:{
        type:Date,
        // default:Date.now()
    },
    coursePrice:{
        type:Number,
   
    },
    weekName:{
        type:String
    }
})
module.exports=mongoose.model('coursetable',courseSchema)