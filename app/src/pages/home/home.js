import weatherApi from "../../services/weather_Api.js";
import { sanitizeInput } from "../../utils/helper.js";

const d = document;
const $citiesListComponent = d.querySelector(".cities-list");
const $searcher = d.querySelector(".search-button"), $fragment = d.createDocumentFragment();



d.addEventListener("click", e => {
    if (e.target === $searcher) {
        $citiesListComponent.querySelectorAll("li").forEach(el => $citiesListComponent.removeChild(el));
        let value = d.querySelector("#search").value.trim();
        let cities;
        if (value.length > 0) {
            $citiesListComponent.classList.remove("d-none");
            fetch("app/src/utils/city_list.json")
                .then(response => response.json())
                .then(data => {
                    cities = data.filter(el => value.toLowerCase().includes(el.name.toLowerCase()));
                    if (cities.length > 0 && !sanitizeInput(value)) {
                        cities.forEach(city => {
                            const $li = document.createElement("li"), $a = document.createElement("a");
                            $a.href = "#";
                            $a.id = "city-data";
                            $li.append($a);
                            $a.textContent = `${city.name}-${city.country}`;
                            $fragment.appendChild($li);
                        });
                    } else {
                        const $li = document.createElement("li"), $a = document.createElement("a");
                        $a.href = "#";
                        $a.id = "not-found";
                        $li.append($a);
                        $a.textContent = `No se encontraron resultados`;
                        $fragment.appendChild($li);
                    }

                    if ($fragment.querySelectorAll("li").length > 0)
                        $citiesListComponent.appendChild($fragment);

                })
                .catch(err => alert('Solicitud fallida', err));
        }

    }

    $citiesListComponent.querySelectorAll("a").forEach(el => {
        if (e.target === el) {
            if (el.id === "city-data") {
                let cityData = el.textContent.split('-');
                let getWeather = new weatherApi("https://api.openweathermap.org/data/2.5/weather?q=", "1cd917a7c30f93df8a72cc744800691c");

                const $cityName = d.querySelector(".city-data"),
                    $currentDate = d.querySelector(".current-date"),
                    $currentTime = d.querySelector(".current-time"),
                    $mainWeather= d.querySelector(".main"),
                    $temp= d.querySelector(".temp"),
                    $description= d.querySelector(".description"),
                    $imageWeather= d.querySelector(".icon-weather");



                $citiesListComponent.classList.add("d-none");
                getWeather.fetchData(cityData, weatherData => {
                    let weatherMain= weatherData.main;
                    let fullWeatherData= [`${weatherMain.feels_like}° C`,`${weatherMain.temp_min}/${weatherMain.temp_max}° C`,`${weatherMain.pressure} hPa`,`${weatherMain.humidity} %`,weatherData.visibility,`${weatherData.wind.speed} m/s`,`${weatherMain.sea_level} hPa`,`${weatherData.clouds.all} %`]
                    let today = new Date();
                    const $factWeather= d.querySelectorAll("#fact-weather"); 
            
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    let now = today.toLocaleString('en-US', options);
                    let time = today.toLocaleTimeString();
                    $currentTime.textContent = time;
                    $cityName.textContent = weatherData.name;
                    $currentDate.textContent = now;
                    $temp.textContent= parseInt(weatherMain.temp) + "°C";
                    $mainWeather.textContent= weatherData.weather[0].main;
                    $description.textContent= weatherData.weather[0].description;
                    $imageWeather.src= `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

                    $factWeather.forEach((fact,index) => {
                        fact.textContent= fullWeatherData[index];
                    });

                
                });
            }
        }
    });

});