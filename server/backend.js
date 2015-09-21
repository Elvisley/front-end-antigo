var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT  = 9908;

const CONFIG = { headers : { 'x-developer-application-key' : '4526dba03ec301339a37021e75abe44c' ,
				 			 'x-access-key' : '98db6260322e013398a6021e75abe44c',
				 			 'content-type': 'application/json'
						 }};

const BASEURL = "https://zup.dev.zup.me/training-budget/v1/";


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s",PORT);
});

app.get('/gastoAnual', function(req, res){
	request.get(BASEURL+"dashboard/expenses_per_month?year="+req.query.ano, CONFIG , function(error, response, body) {
	  res.json(JSON.parse(body));
	});
});

app.get('/treinamentosfuncionario', function(req, res){//id_funcionario
	request.get(BASEURL+"employees/"+req.query.id_funcionario+"/expenses", CONFIG , function(error, response, body) {
	  res.json(JSON.parse(body));
	});
});

app.post('/salvarTreinamento', function(req, res){

	request({
	    url: BASEURL+"employees/"+req.query.id_funcionario+"/expenses", //URL to hit
	    qs: {from: 'teste_zup', time: +new Date()}, //Query string data
	    method: 'POST',
	    headers : CONFIG.headers,
	    json: req.body
	}, function(error, response, body){		
	    if(error) {
	        console.log(error);
	    } else {
	        res.json(true);
		}
	});
});

app.get('/todosfuncionarios', function(req, res){
	request.get(BASEURL+"employees", CONFIG , function(error, response, body) {
	  res.json(JSON.parse(body));
	});
});

app.get('/funcionario', function(req, res){
	request.get(BASEURL+"employees/"+req.query.id_funcionario, CONFIG , function(error, response, body) {
	  res.json(JSON.parse(body));
	});
});

