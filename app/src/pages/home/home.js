import weatherApi from "../../services/weather_Api.js";
import Helper from "../../utils/helper.js";

const d = document;
const $citiesListComponent = d.querySelector(".cities-list");
const $searcher = d.querySelector(".search-button"), $fragment = d.createDocumentFragment();
const $modal = d.getElementById("modal"), $opacity = d.querySelector(".opacity");
const $searcherBar = d.querySelector("#search");


$searcherBar.addEventListener("focus", e => {
    $citiesListComponent.classList.remove("d-none");
    const $li= document.createElement("li"), $a = document.createElement("a");
    $a.href = "#";
    $a.id = "geolocation-data";
    $li.append($a);
    $a.textContent = `Use your current location`;
    $citiesListComponent.appendChild($li);
});






d.querySelectorAll(".widgets-weather > section").forEach(section => {
    const $loader = d.createElement("div");
    $loader.classList.add("loader");
    $loader.innerHTML = `<img src="app/public/assets/images/cloud_rain_loader.png" alt="loader-image">`
    section.insertAdjacentElement("beforeend", $loader);
})


let helper = new Helper();
helper.geoLocation();


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
                    if (cities.length > 0 && !helper.sanitizeInput(value)) {
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
                .catch(err => {
                    $opacity.classList.remove("d-none");
                    $modal.classList.remove("d-none");
                    $modal.children[0].textContent = err.message;
                });
        }

    }

    $citiesListComponent.querySelectorAll("a").forEach(el => {
        if (e.target === el) {
            if (el.id === "city-data") {
                d.querySelectorAll(".loader").forEach(loader => loader.classList.remove("d-none"));
                let cityData = el.textContent.split('-');
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityData[0]},${cityData[1]}&appid=`;
                let weather = new weatherApi(url, "1cd917a7c30f93df8a72cc744800691c", "&unit=metric");

                const $cityName = d.querySelector(".city-data"),
                    $currentDate = d.querySelector(".current-date"),
                    $currentTime = d.querySelector(".current-time"),
                    $mainWeather = d.querySelector(".main"),
                    $temp = d.querySelector(".temp"),
                    $description = d.querySelector(".description"),
                    $imageWeather = d.querySelector(".icon-weather");



                $citiesListComponent.classList.add("d-none");
                weather.fetchData()
                    .then(response => response.json())
                    .then(weatherData => {
                        setTimeout(() => {
                            d.querySelectorAll(".loader").forEach(loader => loader.classList.add("d-none"));
                        }, 2000);
                        let weatherMain = weatherData.main;
                        let millisecondsSunrise = weatherData.sys.sunrise;
                        let millisecondsSunset = weatherData.sys.sunset;
                        let timeSunrise = helper.convertMillisecondsToHourAndMinutes(millisecondsSunrise, "am");
                        let timeSunset = helper.convertMillisecondsToHourAndMinutes(millisecondsSunset, "pm");


                        let fullWeatherData = [`${weatherMain.feels_like}° C`, `${weatherMain.temp_min}° C/${weatherMain.temp_max}° C`, `${weatherMain.pressure} hPa`, `${weatherMain.humidity} %`, weatherData.visibility, `${weatherData.wind.speed} m/s`, `${weatherData.clouds.all} %`, timeSunrise, timeSunset]
                        let today = new Date();
                        const $factWeather = d.querySelectorAll("#fact-weather");

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let now = today.toLocaleString('en-US', options);
                        let time = today.toLocaleTimeString();
                        $currentTime.textContent = time;
                        $cityName.textContent = weatherData.name;
                        $currentDate.textContent = now;
                        $temp.textContent = parseInt(weatherMain.temp) + "°C";
                        $mainWeather.textContent = weatherData.weather[0].main;
                        $description.textContent = weatherData.weather[0].description;
                        $imageWeather.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

                        $factWeather.forEach((fact, index) => {
                            fact.textContent = fullWeatherData[index];
                        });
                    })
                    .catch(err => {
                        $opacity.classList.remove("d-none");
                        $modal.classList.remove("d-none");
                        $modal.children[0].textContent = err.message;
                    })

            }
        }
    });


});

function getData() {

}