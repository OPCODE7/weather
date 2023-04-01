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

}




