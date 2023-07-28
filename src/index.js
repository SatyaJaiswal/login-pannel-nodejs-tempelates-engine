const express = require ("express")
const app = express ()
const path = require ("path")
const hbs = require ("hbs")
const model = require("./mongodb")
const userModel = require("./user")
const tempelatePath = path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine" , "hbs")
app.set("views",tempelatePath )
app.use(express.urlencoded ({extended:false}))

app.use(express.static('public'))

app.get("/", (req,res) =>{
    res.render("login")
})

app.get("/signup", (req,res) =>{
    res.render("signup")
})


app.post("/signup",async(req,res)=>{
    const data = new userModel({
        name:req.body.name,
        password:req.body.password
    })
     
    await data.save()
    res.render("home")
})


app.post("/login",async(req,res)=>{
  
    try{
        const user = await userModel.collection.findOne({name:req.body.name})

        if(user.password===req.body.password){
            res.render("home")
        }else{
            res.send("Wrong password or userName")
        }

    }
    catch{
        res.send("Enter valid detaled")
    }
})

app.listen (3300,()=>{
    console.log("port connected")

});

