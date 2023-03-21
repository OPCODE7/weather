export class weatherApi{
    static key= "1cd917a7c30f93df8a72cc744800691c";
    constructor(url){
        this.apiKey= key;
        this.url= url;
    }

    fetchData(parameters){
        fetch(this.url+parameters+this.key)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
    }

}