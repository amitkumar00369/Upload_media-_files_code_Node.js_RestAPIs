
const { json } = require('body-parser');
const Users=require('../Schema/users.schema')
const error=require('../utils/error')
const bcrypt=require('bcrypt')
const COURSE=require('../Schema/courseSchema')
const UserRegister=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log('hello',name,email,password)

        const find=await Users.findOne({email:email})
        if(find){
            return res.status(409).json({
                message:"User ALready Exist",
                code:409
            })
        }
        else{
            console.log('vgjabbkcbb')
            const hashPass=await bcrypt.hash(password,10)
            if(!hashPass){
                return res.status(error.status.UNAUTHORIZED).json({
                    message:"Password has not encrypted"
                })
            }
            console.log(hashPass)

            const newUser=await Users.create({name:name,email:email,password:hashPass,date:new Date()})
            return res.status(error.status.OK).json({
                message:'Successfull',
                user:newUser,
                code:error.status.OK
            })
        }


    }
    catch(error){
        return res.status(500).json({
            message:"Internal Server Error",
            code:500

        })
    }
}
const assignCourse = async (req, res) => {
    const email = req.params.email;
    try {
        const find = await Users.findOne({ email: email });
        if (!find) {
            return res.status(404).json({
                message: "User not found",
                code: 404
            });
        } else {
            const { courseIds } = req.body;  // [1,2]
            console.log('courseIds:', courseIds);
            const courseList = [];
          

            for (const id of courseIds) {
                console.log('Processing courseId:', id);
                const course = await COURSE.findOne({ courseId: id });
                if (course) {
                    console.log('Found course:', course);
      
                    const data = {
                        courseId: course.courseId,
                        courseName: course.courseName,
                        coursePrice: course.coursePrice,
                        createAt: course.createAt
                    };
                    courseList.push(data);
                } else {
                    continue;
                }
            }
          
            const updateUser = await Users.updateOne(
                { email: find.email },
                { $set: { assignCourse: courseList } })
            if (!updateUser) {
                    return res.status(400).json({
                        message: "User has not been updated ",
                        code: 400
                    })}
            const UserD = await Users.findOne({ email: email });

    return res.status(200).json({
                message: "Successful",
                userData: UserD,
                courseData: courseList,
                code: 200
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            code: 500
        });
    }
};


const ImgUpload = async (req, res) => {
    const { email } = req.params;
    try {
      const files = req.files;
      if (!files || !files.length) {
        return res.status(400).json({
          message: "Please upload a file",
          code: 400
        });
      }
  
      const user = await Users.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          code: 404
        });
      } 
  
      // Initialize fields to null
      let image = null;
      let video = null;
      let pdf = null;
  
      // Iterate through the files and assign to the respective field
      files.forEach(file => {
        if (file.mimetype.startsWith('image/')) {
          image = file.location;
        } else if (file.mimetype.startsWith('video/')) {
          video = file.location;
        } else if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf') || file.originalname.endsWith('.txt')) {
          pdf = file.location;
        }
      });
  
      // Update user document with the file URLs
      user.image = image;
      user.video = video;
      user.pdf = pdf;
      await user.save();
  
      return res.status(200).json({
        message: "Successfully updated files",
        result: user,
        code: 200
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        code: 500
      });
    }
  };
  
//   module.exports = { ImgUpload };
    



module.exports={UserRegister,assignCourse,ImgUpload};