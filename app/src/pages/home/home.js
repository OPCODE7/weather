import weatherApi from "../../services/weather_Api.js";
import Helper from "../../utils/helper.js";
import GeoLocation from "../../services/geoLocationApi.js";

const d = document;
const $citiesListComponent = d.querySelector(".cities-list");
const $searcher = d.querySelector(".search-button"), $fragment = d.createDocumentFragment();
const $modal = d.querySelector(".modal"), $opacity = d.querySelector(".opacity");
const $searcherBar = d.querySelector("#search");

let helper = new Helper();
let geoLocation = new GeoLocation();
let dataCitiesClone;

const getCloneResponse = (data) => {
    dataCitiesClone = data;
}

d.addEventListener("DOMContentLoaded", e => {
    let dataCities = fetch("app/src/utils/city_list.json");
    dataCities
        .then(response => response.json())
        .then(data => {
            getCloneResponse(data);
            let randomIndex = Math.floor(Math.random() * data.length);
            let city = data[randomIndex];
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=`;
            getData(url);
        });
});


$searcherBar.addEventListener("focus", e => {
    $citiesListComponent.querySelectorAll("li > a").forEach(a => {
        if (a.id === "geolocation-data") $citiesListComponent.removeChild(a.parentElement);
    });
    $citiesListComponent.classList.remove("d-none");
    const $li = document.createElement("li"), $a = document.createElement("a");
    $a.href = "#";
    $a.id = "geolocation-data";
    $li.append($a);
    $a.textContent = `Use your current location`;
    $citiesListComponent.prepend($li);
});


d.querySelectorAll(".widgets-weather > section").forEach(section => {
    const $loader = d.createElement("div");
    $loader.classList.add("loader");
    $loader.innerHTML = `<img src="app/public/assets/images/cloud_rain_loader.png" alt="loader-image">`
    section.insertAdjacentElement("beforeend", $loader);
})

d.addEventListener("click", e => {

    if (e.target === $searcher) {
        $citiesListComponent.querySelectorAll("li").forEach(el => {
            if (el.children[0].id !== "geolocation-data") $citiesListComponent.remove(el);
        }
        );
        let value = d.querySelector("#search").value.trim();
        let cities;
        if (value.length > 0) {
            $citiesListComponent.classList.remove("d-none");

            dataCitiesClone
            cities = dataCitiesClone.filter(el => value.toLowerCase().includes(el.name.toLowerCase()));
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
        }

    }

    $citiesListComponent.querySelectorAll("a").forEach(el => {
        if (e.target === el) {
            if (el.id === "city-data") {
                let cityData = el.textContent.split('-');
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityData[0]},${cityData[1]}&appid=`;

                getData(url);
            }
            if (el.id === "geolocation-data") {
                let url;

                geoLocation.getLocation((coords) => {
                    url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=`;
                    getData(url);
                })
            }
        }
    });

    if (e.target.matches(".modal-close-button")) {
        $modal.classList.add("d-none");
        $opacity.classList.add("d-none");
    }


});

function getData(_url) {
    d.querySelectorAll(".loader").forEach(loader => loader.classList.remove("d-none"));

    let weather = new weatherApi(_url, "1cd917a7c30f93df8a72cc744800691c", "&units=metric");

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
            let timeStampSunrise = weatherData.sys.sunrise;
            let timeStampSunset = weatherData.sys.sunset;
            let timeSunrise = helper.convertMillisecondsToHourAndMinutes(timeStampSunrise, "am");
            let timeSunset = helper.convertMillisecondsToHourAndMinutes(timeStampSunset, "pm");


            let fullWeatherData = [`${weatherMain.feels_like}° C`, `${weatherMain.temp_min}° C / ${weatherMain.temp_max}° C`, `${weatherMain.pressure} hPa`, `${weatherMain.humidity} %`, weatherData.visibility, `${weatherData.wind.speed} m/s`, `${weatherData.clouds.all} %`, timeSunrise, timeSunset]
            const $factWeather = d.querySelectorAll("#fact-weather");

            let localDate= helper.getDate(weatherData.dt,weatherData.timezone);
            

            $currentTime.textContent = localDate.split(' ').at(-2);
            $cityName.textContent = weatherData.name;
            $currentDate.textContent= localDate.split(' ').splice(0,4).join(' ');
            $temp.textContent = parseInt(weatherMain.temp) + "°C";
            $mainWeather.textContent = weatherData.weather[0].main;
            $description.textContent = weatherData.weather[0].description;
            $imageWeather.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

            $factWeather.forEach((fact, index) => {
                fact.textContent = fullWeatherData[index];
            });

            helper.setBackground(d.body,weatherData.weather[0].icon);
        })
        .catch(err => {
            $opacity.classList.remove("d-none");
            $modal.classList.remove("d-none");
            $modal.children[0].textContent = err.message;
        })

}