const express= require("express");
const render = require('xlsx');

require("./db/conn");
const Petinfo = require("./models/pets");
const app = express();
const filePath= render.readFile(require('path').resolve(__dirname, "../PetsInfo.xlsx"));
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/",(req,res)=> {
    res.send("Hello Pet owners");
})

app.post("/pet", async(req,res)=>{
    try{
        // console.log("called");
        const posts=[];
        const worksheet = filePath.Sheets[filePath.SheetNames[0]];
        const sheetData= render.utils.sheet_to_json(worksheet);
        console.log(sheetData);
        const createPet=await Petinfo.insertMany(sheetData);
        res.status(201).send(createPet);
    }catch(e)
    {
        res.status(400).send(e);
    }
    
    

    //This is the promise method using then and catch
    // user.save().then(()=>
    // {
    //     res.status(201).send("Pet is added to the database");
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
    
})
app.get("/pet",async(req,res)=>
{
    try{
        const petData=await Petinfo.find();
        res.send(petData);
    }catch(e){
        res.send(e);
    }
})

app.get("/pet/:id",async(req,res)=>{
    try{
        const _id= req.params.id;
        const petData=await Petinfo.findById({_id});
        if(!petData)
        {
            return res.status(404).send();
        }
        else{
            res.status(500).send(petData);
        }
        
    }catch(e){
        res.send(e);
    }
})
app.patch("/pet/:id",async(req,res)=>{
    try{
        const _id= req.params.id;
        const updatePet = await Petinfo.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updatePet);
    }catch(e)
    {
        res.status(404).send(updatePet);
    }
})

app.delete("/pet/:id",async(req,res)=>{
    try{
        const _id= req.params.id;
        const deletePet=await Petinfo.findByIdAndDelete(_id);
        if(!_id)
        {
            return res.status(400).send();
        }
        else
        {
            res.send(deletePet);
        }
    }catch(err)
    {
        res.status(500).send(err);
    }
})

app.listen(port,()=> {
    console.log(`connection is setup at ${port}`);
})

