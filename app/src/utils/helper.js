export function sanitizeInput(string){
    let prohibideCharacters= ['/','-','*','?','+',',','!','¡','¿'];
    let bool= false;
    prohibideCharacters.forEach(char => {
        if(string.includes(char)) bool= true;
    });

    return bool;
}