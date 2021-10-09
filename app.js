const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
  const city = req.body.cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=d54fc4af966d5568d291013f0c2b737b";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const x = JSON.parse(data);
      const description = x.weather[0].description;
      const temp = x.main.temp;
      const icon = x.weather[0].icon;
      const iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write("<p>Weather is currently " + description + "</p>");
      res.write("<h1>Temperature is " + temp + "</h1>");
      res.write("<img src = " + iconurl +">");
      res.send();
    })
  });
});

// })

app.listen(3000, function(){
  console.log("we are running");
})
