export default class Helper {
    sanitizeInput(string) {
        let prohibideCharacters = ['/', '-', '*', '?', '+', ',', '!', '¡', '¿'];
        let bool = false;
        prohibideCharacters.forEach(char => {
            if (string.includes(char)) bool = true;
        });

        return bool;
    }

    convertMillisecondsToHourAndMinutes(unixTimestamp, format) {
        let date = new Date(unixTimestamp * 1000);

        let hours = date.getUTCHours();

        let minutes = date.getUTCMinutes();
        return `${hours}:${minutes} ${format}`;
    }

    getDate(dt, timezone) {
        const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
        const utc_milliseconds = utc_seconds * 1000;
        const local_date = new Date(utc_milliseconds).toUTCString();
        return local_date;
    }

    setBackground(body, idIcon) {
        const backgrounds = {
            "01d": `url("app/public/assets/images/clear-sky.jpg")`,
            "01n": `url("app/public/assets/images/clear-night.png")`,
            "02d": `url("app/public/assets/images/few-clouds.jpg")`,
            "02n": `url("app/public/assets/images/few-clouds-night.avif")`,
            "03d": `url("app/public/assets/images/scattered-clouds.jpg")`,
            "03n": `url("app/public/assets/images/scattered-clouds.jpg")`,
            "04d": `url("app/public/assets/images/broken-clouds.jpg")`,
            "04n": `url("app/public/assets/images/broken-clouds.jpg")`,
            "9d": `url("app/public/assets/images/rain.avif")`,
            "9n": `url("app/public/assets/images/rain.avif")`,
            "10d": `url("app/public/assets/images/rain.avif")`,
            "10n": `url("app/public/assets/images/rain.avif")`,
            "11d": `url("app/public/assets/images/thunder-storm.avif")`,
            "11n": `url("app/public/assets/images/thunder-storm.avif")`,
            "13d": `url("app/public/assets/images/snow.png")`,
            "13n": `url("app/public/assets/images/snow.png")`,
            "50d": `url("app/public/assets/images/mist.avif")`,
            "50n": `url("app/public/assets/images/mist.avif")`
        };

        body.style.backgroundImage= backgrounds[idIcon];

    }

}




