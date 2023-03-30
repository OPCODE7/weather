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


}



