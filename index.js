//Basic Server Structure
//import cors from "cors";

//1. Import Express
const express=require("express");
const CourseInfo=require('./model/courseDb')



//2. Initializing Express
const app=new express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Headers", " X-Requested-With, Content-Type");
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,DELETE");

    res.header('Access-Control-Allow-Credentials', true);
    next();
});
const path=require("path");
var cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));

//3. API Creation
app.get('/',(req,res)=>{
    res.send("congratulations!!! Server is up")
})
app.get('/about',(req,res)=>{
    res.send("from about")
})
// app.get('/api',(req,res)=>{
//     res.json({"name":"meera","place":"clt"})
// })
//create
app.post('/api/create',(req,res)=>{
    try{
    console.log(req.body);//server data
   let course= new CourseInfo(req.body);//passing the data to db
   course.save();//save data into db 
   res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
})
//read
app.get('/api/view',async (req,res)=>{
    try{
        let result=await CourseInfo.find();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error);
    }
})

//update
app.post('api/update',async (req,res)=>{
    try{
let result=await CourseInfo.findByIdAndUpdate(req.body._id,req.body)
res.send("Data Updated")   
}
    catch(error){
        res.status(500).send(error);
    }
})
//Delete
app.post('/api/delete', async (req, res) => {
    // const id = req.params.id
    // const query = { _id: ObjectId(id) }
    try{
    //     let result = await dataCollection.deleteOne(query)
    //     res.send(result)
    //
    let result=await CourseInfo.findByIdAndDelete(req.body._id);
    res.json({"success":"Deleted"})

}
catch(error){
res.status(500).send(error);
}
   
})

//SEARCH
app.post('/api/search',async(req,res)=>{
     console.log("reached")
    try{
let result=await CourseInfo.find(req.body);

res.json(result);

    }
    catch(error) {
        res.status(500).send(error);
        }
});



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });


//4. Setting PORT Number
app.listen(3001,()=>{
    console.log("Server is at port 3001")
})