const express=require('express')


const controller=require('../controllers/course.controllers')
const controllerU=require('../controllers/user.cntrollers')
const validation=require('../validator/user.validations')
const message=require('../middlewares/errorMiddleware')
const files=require('../middlewares/fileUpload')
const uploadsFiles=require('../controllers/fileUploadController')
router=express.Router()



// Course APIs

router.post('/courseRegister',controller.courseInsert)
router.get('/getCourse/:Cid/:week',controller.getCourseByCourseId)
router.get('/get/:Cid',controller.pushMultipleObjectInArray)


// User APIs
router.post('/userRegister',validation.usersSign,message.errorResponse,controllerU.UserRegister)
router.put('/assignCourses/:email',validation.courseValidation,message.errorResponse,controllerU.assignCourse)

router.post('/upload/:email', files, controllerU.ImgUpload);

// aws APIs
router.post('/upload',files,uploadsFiles.fileUploadImg)








module.exports=router;