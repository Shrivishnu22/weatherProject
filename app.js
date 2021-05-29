const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "d67507b91ccaf68e5859f2e4c79ecdd3#";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius</h1> ");
            res.write("<h3>The weather is currently " + desc + "</h3>")
            res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png >")
            res.send()
        })
    });

});

app.listen(5000, function() {
    console.log("Running on port 5000");

});