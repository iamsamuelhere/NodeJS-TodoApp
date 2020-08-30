const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
tasks=[];

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
   res.render('index',{day:day,tasks:tasks,greet:greet})
})
app.post('/',function(req,res){
  
  if(req.body.Add){
    task=req.body.todo
    tasks.push(task)
  }
  else if(req.body.Remove){
      tasks.pop()
  }

  
  
  res.redirect('/')

  
})
app.use(function(req,res){
  res.status(404).sendFile(__dirname+'/notfound.html')
})


app.listen(process.env.PORT||3000,function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})