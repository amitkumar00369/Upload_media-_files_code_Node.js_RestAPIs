const express=require('express')

const cors=require('cors')
const bodyparser=require('body-parser')
require('dotenv').config()
const DB=require('./src/db/db.connect')
const courseRoutes=require('./src/routes/routes')



const app=express()

app.use(cors({
    origin:"*"
}))
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())
app.use('',courseRoutes)


app.listen(process.env.Port,function (){
console.log("This app runnig on port no: ",process.env.Port)
})
