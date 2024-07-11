


const {check,body,param}=require("express-validator")
const  users=require('../Schema/courseSchema')

const usersSign=[
    check("name").notEmpty().withMessage('User name is required'),
    check("password").notEmpty().withMessage("Please enter password"),
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".")) {
          throw new Error("ache se likho");
        }
        return true;
    }),
    
    

  

  ];
  const courseValidation=[
    check('courseIds').notEmpty().withMessage('Please enter courseIds'),
    check("email").notEmpty().withMessage("email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".")) {
          throw new Error("ache se likho");
        }
        return true;
    }),
  ]

module.exports={usersSign,courseValidation};