var express =require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser')
var Cors=require('cors')
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
var dbURI='mongodb+srv://deviks:devika@cluster0.rtmta.mongodb.net/Restarent_Db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
var ItemShema=new mongoose.Schema(
    {
        name:String,
        avl_q:Number,
        price:Number,
        filenmae:String
    }
)
var placedShema=new mongoose.Schema(
    {
        name:String,
        price:Number,
        qun:Number,
        bill:Number,
        user_name:String,
    }
)
var orderShema=new mongoose.Schema(
    {
        user_name:String,
        name:String,
        price:Number,
        avl_q:Number,
        filename:String
        
    }
)
var Itemmodel=mongoose.model('Item',ItemShema)
var placedModel=mongoose.model('Placedorder',placedShema);
var orderModel=mongoose.model('Order',orderShema);
app.get("/",function(req,res)
{
    res.send("hiii")
})
app.get("/getdata",function(req,res)
{
    console.log("get items calledd");
   Itemmodel.find({},function(err,data)
    {
        if(!err)
        { 
            res.send(data);
        }
    })
})
app.get("/orders",function(req,res)
{
    console.log("get orders calledd");
  orderModel.find({},function(err,data)
    {
        if(!err)
        { 
            res.send(data);
        }
    })
})
app.get("/placedItems",function(req,res)
{
    console.log("get placedorders  calledd");
   placedModel.find({},function(err,data)
    {
        if(!err)
        { 
            res.send(data);
        }
    })
})
app.post("/register", async (req, res) => {
    console.log("resest body",req.body)
    console.log("posted succesfully in ...placed orders")
    var task=new placedModel(
        {
            name:req.body.name,
            price:req.body.price,
            qun:req.body.q,
            bill:req.body.bill,
            user_name:req.body.user_name
            
        }
    ) 
   task.save(function(err,data)
    {
        
     if(!err)
        {
            res.send({"msg":"update"});
        }
        
    })
    
});
app.post("/reg", async (req, res) => {
    console.log("updating orders data....");
    console.log("i am body",req.body)
    var task=new orderModel(
        {
            user_name:req.body.user_name,
            name:req.body.name,
            price:req.body.price,
            avl_q:req.body.avl_q,
            filename:req.body.filename
        }
    ) 
   task.save(function(err,data)
    {
        if(!err)
        {
            res.send({"msg":"update"});
        }
        
    })
    
});
app.put("/update/:id",function(req,res)
{
    console.log(" i am update to change the availbel qunatity",req.params.id);
    console.log(" i am q value ...",req.body.q);
    Itemmodel.findByIdAndUpdate(req.params.id,{avl_q:req.body.q},function(err,data)
    {
            
          if(!err)
            {
                
                res.send({msg:"update"})
            }
    })
})
app.delete("/delete/:id",function(req,res)
{ 
    console.log("key is",req.params.id)
    console.log("i am delete form index.js");
   orderModel.deleteOne({_id:req.params.id},function(err,data)
   {
      
       if(!err){
           res.send({msg:"delete"})
       }
   })

})

// app.listen(3600,function(){console.log("hi i am from....3600")})
app.listen(process.env.PORT)
