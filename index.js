const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser= require("body-parser");
const port = 3211;

//mongodb connection 
const middel = mongoose.connect('mongodb://127.0.0.1:27017/usersdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("error occured mongodb");
});

// Schema Here 
const schema = {
    name : {type:String},
    email : {type:String},
    message: {type:String},
};
const authentication = {
    number : {type:String},
    password : {type:String},
};

const database = mongoose.model("userComment", schema);

//middelware 
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//routes
app.get("/", (req, res)=>{
    res.sendFile(__dirname+ "/public/index.html");
});
app.post("/", (req,res)=>{
    //coments shown here
    if(req.body.email){
        var m = new database({
            'name':req.body.full_name,
            'email':req.body.email,
            'message':req.body.message
        });
        console.log(req.body.full_name);
        m.save();
    }
    else{
    //login here 
    console.log(req.body.member_number)
    }
});

app.get("/data", (req, res)=>{
    database.find().then((result)=>{
       res.send(`<h1>${result}</h1>`);
    });
});

app.put("/data/:id", (req,res)=>{
    database.findOneAndUpdate({
        _id : req.params.id},{$set:{ 'name':req.body.full_name,
        'email':req.body.email,
        'message':req.body.message}}
        ).then((result)=>{
            console.log(result);
        })
});



app.delete("/delete_page/:id", (req,res)=>{
    database.findOneAndRemove({_id : req.params.id})
.then((result) => {
    console.log(result);
})
});

//app.listen
app.listen(port, ()=>{
    console.log("Hi I am :"+ port);
}); 

