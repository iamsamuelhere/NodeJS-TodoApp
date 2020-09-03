const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://samuser:9742828481@cluster0.4w4jg.mongodb.net/mydb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>console.log("connected to db"))
.catch((err)=>console.log(err))
app.set('view engine','ejs')
tasks=[];
const todoSchema=new mongoose.Schema({
  topic:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  }
})

const Todo=mongoose.model('todo',todoSchema)


app.get('/',function(req,res){
  var options={weekday:'long',year:'numeric',month:'long',day:'numeric'}
  var today=new Date()
  var hour=today.getHours()
  if(hour>0 && hour<=12){
    var greet="⛅ Good morning"
  }else if(hour<=15){
    var greet="🌤 Good Afternoon"
  }
  else if(hour<19){
    var greet="🌩 Good Evening"
  }
  else{
    var greet="🌜 Good Night"
  }
  day=today.toLocaleDateString('en-US',options)
  
  Todo.find(function(err,stored){
    if(err)
    console.log(err)
    else{
      
      res.render('index',{day:day,tasks:stored,greet:greet})
    }
  }).sort({_id:-1})


   
})
app.post('/',function(req,res){
  
  // if(req.body.Add){
  //   task=req.body
  //  console.log(task)
  //   tasks.push(task)
  // }
  // else if(req.body.Remove){
  //     tasks.pop()
  // }
  
  const userinput=new Todo({
    topic:req.body.todo,
    content:req.body.textarea
  })
  userinput.save();
  
  
  res.redirect('/')

  
})

app.post('/remove',function(req,res){
  Todo.findByIdAndRemove({_id:req.body.Remove},function(err){
    console.log(err)
  
  })
 res.redirect('/')
});





app.post('/checkdel',function(req,res){
  
Todo.findByIdAndRemove({_id:req.body.che},function(err){
  console.log(err)

})
res.redirect('/')
})



app.use(function(req,res){
  res.status(404).sendFile(__dirname+'/notfound.html')
})


app.listen(process.env.PORT||3000,function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})