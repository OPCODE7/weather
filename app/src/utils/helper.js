export default class Helper {
    sanitizeInput(string) {
        let prohibideCharacters = ['/', '-', '*', '?', '+', ',', '!', '¡', '¿'];
        let bool = false;
        prohibideCharacters.forEach(char => {
            if (string.includes(char)) bool = true;
        });

        return bool;
    }

    convertMillisecondsToHourAndMinutes(milliseconds, format) {
        let hours = milliseconds / (1000 * 60 * 60);
        milliseconds -= hours * 60 * 1000;
        let minutos = milliseconds / (1000 * 60);
        console.log(hours, minutos)

        return `${hours}:${minutos}${format}`;
    }

    
}



