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

    setBackground(body,idIcon){
        //refactor con idea de midudev
        if(idIcon==="01d"){
            body.style.backgroundImage= `url("app/public/assets/images/clear-sky.jpg")`;
        }else if(idIcon==="01n"){
            body.style.backgroundImage= `url("app/public/assets/images/clear-night.png")`;
        }else if(idIcon==="02d"){
            body.style.backgroundImage= `url("app/public/assets/images/few-clouds.jpg")`;
        }else if(idIcon==="02n"){
            body.style.backgroundImage= `url("app/public/assets/images/few-clouds.jpg")`;
        }else if(idIcon==="03d"){
            body.style.backgroundImage= `url("app/public/assets/images/scattered-clouds.jpg")`;
        }else if(idIcon==="03n"){
            body.style.backgroundImage= `url("app/public/assets/images/scattered-clouds.jpg")`;
        }else if(idIcon==="04d"){
            body.style.backgroundImage= `url("app/public/assets/images/broken-clouds.jpg")`;
        }else if(idIcon==="04n"){
            body.style.backgroundImage= `url("app/public/assets/images/broken-clouds.jpg")`;
        }else if(idIcon==="9d" ||idIcon==="9n" || idIcon==="10d" || idIcon==="10n"){
            body.style.backgroundImage= `url("app/public/assets/images/rain.avif")`;

        }else if(idIcon==="11d" || idIcon==="11n"){
            body.style.backgroundImage= `url("app/public/assets/images/thunder-storm.avif")`;
        }else if(idIcon==="13d" || idIcon==="13n"){
            body.style.backgroundImage= `url("app/public/assets/images/snow.png")`;
            
        }else if(idIcon==="50d" || idIcon==="50n"){
            body.style.backgroundImage= `url("app/public/assets/images/mist.avif")`;
        }
       
    }

}




