const apiKey = config.API_KEY;
let weather = {  
    getWeather: function(city) {
        fetch( "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon,description } = data.weather[0];
        const { temp,humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in "+name;
        document.querySelector(".temp").innerText = temp+"°C";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        document.querySelector(".humidity").innerText = humidity+"%";
        document.querySelector(".wspeed").innerText = speed+"km/h";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".weather").classList.remove("loading");

    },
    search: function() {
        this.getWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.getWeather("Dehradun"); //sets default location and starts out with correct info