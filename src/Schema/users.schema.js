const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        
        // unique: true,
        // match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    name: {
        type: String,
        
    },
    date: {
        type: Date,
        
    },
    assignCourse: [{
        courseId: {
            type:String
            
        },
        courseName: {
            type: String,
           
        },
        coursePrice:{
            type:Number
        },
        createAt:{
            type:Date
        }
    }],
    image: {
        type: String // URL or path to the image file
    },
    video: {
        type: String // URL or path to the image file
    },
    pdf: {
        type: String // URL or path to the image file
    },
  
    isactive: {
        type: Boolean,
        default: false
    },
    password:{
        type:String
    }
});

// const User = mongoose.model('User', UserSchema);

module.exports =mongoose.model('User', UserSchema);
