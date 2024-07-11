const mongoose=require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.db).then(()=>{
    console.log("Databse connected")
},(error)=>{
console.log("Error: "+error)
})


