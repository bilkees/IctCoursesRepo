//Importing
const mongoose= require ("mongoose")
//connect Database
mongoose.connect("mongodb+srv://bilkees:bilkees@cluster0.urlh5.mongodb.net/?retryWrites=true&w=majority")
//Schema
const Schema=mongoose.Schema;
var courseSchema=new Schema({
    cName:String,
    cDesc:String,
    cDuration:Number,
    cStartdate:Date
})
var CourseInfo=mongoose.model("courses",courseSchema)
module.exports= CourseInfo