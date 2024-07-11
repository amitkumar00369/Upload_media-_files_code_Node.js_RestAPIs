const COURSE=require('../Schema/courseSchema')

const error=require('../utils/error')






const courseInsert=async(req,res)=>{
    try{
        const {name,price,week}=req.body;
        if(!name || !price || !week){
            return res.status(400).json({
                message:'Plese enter price, name, week fields',
                code:400
            })
        }
        console.log(name,price,week)
        const find=await COURSE.findOne({courseName:name})
        const course_ids = await COURSE.aggregate([
            {
                $group: {
                    _id: null,
                    maxField: { $max: "$courseId" }
                }
            }
        ]);

        console.log('finds', find);
        console.log('ids', course_ids[0].maxField);
        if(!find){
            console.log('NOne')
            const courseInsert=await COURSE.create({courseName:name,
                coursePrice:price,
                courseId:course_ids[0].maxField+1,
                createAt:new Date(),
                weekName:week
            })
            return res.status(200).json({message:"Successfull",
                details:courseInsert
            })
            
        
          
        }else{
            console.log("Yes")
            const courseInsert=await COURSE.create({courseName:find.courseName,
                coursePrice:find.coursePrice,
                courseId:find.courseId,
                createAt:find.createAt,
                weekName:week
            })
            return res.status(200).json({message:"Successfull",
                details:courseInsert})
        
 

    }}
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }
}

const getCourseByCourseId=async(req,res)=>{
    const Cid = req.params.Cid;
    const week = req.params.week;
    try{if(!Cid){
        return res.status(error.status.BAD_GATEWAY).json({
            message:"enter correc url address",
            code:error.status.BAD_GATEWAY
        })
    }
        const courses=await COURSE.find({courseId:Cid,weekName:week})
        if(!courses){
            return res.status(error.status.BAD_REQUEST).json({
                message:"No course assign from this courseId",
                code:400
            })

        }
        return res.status(error.status.OK).json({
            message:"All courses from this courseId",
            data:courses,
            code:200
        })

    }

    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }
}

const pushMultipleObjectInArray=async(req,res)=>{
    const Cid=req.params.Cid;
    try{
        const find=await COURSE.find({courseId:Cid});
        if (!find){
            return res.status(error.status.BAD_REQUEST).json({
                message:"No course assign from this courseId",
                code:400
            })

        }
        const list=[]
        for (data of find){
            datas={
                "courseName":data.courseName,
                "coursePrice":data.coursePrice,
                "CourseDate":data.createAt,
                "ID":data._id,
                "weekName":data.weekName
            }
            list.push(datas)

        }
        return res.status(error.status.OK).json({
            message:'Mission Successfull',
            details:list,
            code:200
        })

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }
}

module.exports={courseInsert,getCourseByCourseId,pushMultipleObjectInArray}