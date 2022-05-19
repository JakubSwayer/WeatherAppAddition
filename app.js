const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const path = require('path')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
  var city = req.body.city_select;
  // var city = "Warszawa";
  console.log(city);
  console.log(req);
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f1231941a3a7d645b987724ca5d85de0&units=metric";
  https.get(url, (resp) => {
    resp.on("data", (data) => {
      var data = JSON.parse(data);
      var temp = Math.round(data.main.temp);
      var description = data.weather[0].description;

      switch (description) {
        case "clear sky":
          description = "Bezchmurne niebo";
          break;
        case "overcast clouds":
          description = "Pochmurne niebo";
          break;
        case "few clouds":
          description = "Pojedyńcze chmury";
          break;
        case "scattered clouds":
          description = "Przelotne zachmurzenie";
          break;
        case "broken clouds":
          description = "Częściowe zachmurzenie";
          break;
        case "shower rain":
          description = "Mrzawka";
          break;
        case "rain":
          description = "Deszcz";
          break;
        case "thunderstorm":
          description = "Burza";
          break;
        case "snow":
          description = "Śnieg";
          break;
        case "mist":
          description = "Mgła";
          break;
      }
      res.render('index', {
        ETemp: temp,
        EDescription: description
      });
    })
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is currently runnnig on some port ¯\_(ツ)_/¯");
})
