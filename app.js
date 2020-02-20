var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require("body-parser");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


var tasks = [] //current tasks
var ctasks = [] //completed tasks


app.get('/', function(req, res){
	res.render('home',{tasks:tasks, ctasks:ctasks});
}); 

app.post('/createTask', function(req, res){
	var newTask = req.body.newTask;
	var fromTime = req.body.fromTime;
	var toTime = req.body.toTime;

	tasks.push({"taskName":newTask,
				 "fromT":fromTime,
				 "toT":toTime
				});

	res.redirect('/tasksrunning');
});

app.get('/tasksrunning', function(req, res){
	tasks.forEach(function(i){
		if(i.fromT == ""){
			console.log("A task is pending: "+i.taskName)
		} else{
			x = moment().format('LT');
			console.log("A task is pending: "+i.taskName);
			console.log("Event Time: "+i.fromT);
			console.log("Its been: "+ x);
		}
	})
	res.redirect('/')
})

app.post('/dismissTask', function(req, res){
	
	var ctask = req.body.check;
	
	if(typeof ctask === "string"){
		ctasks.push(ctask);
		tasks.splice(tasks.indexOf(ctask),1);
	} 
	else if(typeof ctask === "object"){
		for(var i=0; i< ctask.length; i++){
			ctasks.push(ctask[i]);
			tasks.splice(tasks.indexOf(ctask[i]),1);
		}		
	} 
	res.redirect("/");
});

app.listen(3000, function(){
	console.log("server is listening");
});