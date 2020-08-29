const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
tasks=[];

app.get('/',function(req,res){
  var options={weekday:'long',year:'numeric',month:'long',day:'numeric'}
  var today=new Date()
  day=today.toLocaleDateString('en-US',options)
   res.render('index',{day:day,tasks:tasks})
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




app.listen(3000,()=>console.log("Server running "))