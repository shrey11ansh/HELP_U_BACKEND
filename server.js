const express= require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const bodyParser=require('body-parser')
const app=express()
const Student =require('./modle/Students.js')

const CONNECTION_URL="mongodb+srv://shreyansh:M10P20d9b16@cluster0.zmehw0l.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


app.use(cors())
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));



app.get('/',(req,res)=>{
    Student.find().exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
})

app.post('/students',(req,res)=>{
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.complaints);
    const students=new Student ({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        complaints:req.body.complaints,
    });
    students.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurd"});
    })
}
)