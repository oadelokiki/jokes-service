const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {

try {
    // TODO - filter the jokes by tags and content
console.log(req.query)
var content  =  req.query["content"];
var id = req.query["tags"]


var jokes =[]
if(content == undefined){
	if(id == undefined){
		 jokes = await Joke.findAll();
	}else{
	
		var allContent = await Joke.findAll();
       		 for(let i = 0 ; i  < allContent.length; i++){
                	if(allContent[i].tags.includes(id)){
		 		jokes.push(allContent[i]);
				console.log("nice")
                	}
        	}

	}
}else{
	var allContent = await Joke.findAll();
	for(let i = 0 ; i  < allContent.length; i++){
		if(allContent[i].joke.includes(content)){
			content = allContent[i].joke;
			break;
		}
	}
	if(id == undefined){
		jokes = await Joke.findAll(
			{
				where: {
					joke: content
				}
			}
		);
	}else{
		var allContent = await Joke.findAll();
                 for(let i = 0 ; i  < allContent.length; i++){
                        if(allContent[i].tags.includes(id)){
                                jokes.push(allContent[i]);
                                console.log("nice")
                        }
                }

	
	}
}
   	
	  res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
