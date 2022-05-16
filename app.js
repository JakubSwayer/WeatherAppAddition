const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));



var city;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res) => {
  city = req.body.city_select;
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f1231941a3a7d645b987724ca5d85de0&units=metric";
  https.get(url, (resp) => {
    resp.on("data", (data) => {
      var data = JSON.parse(data);
      var temp = data.main.temp ;
      var description = data.weather[0].description;
    })
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is currently runnnig on some port ¯\_(ツ)_/¯");
})
