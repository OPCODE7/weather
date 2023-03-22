export default class weatherApi{
    constructor(url,key){
        this.apiKey= key;
        this.url= url;
    }

    fetchData(parameters,result){
        fetch(`${this.url}${parameters[0]},${parameters[1]}&appid=${this.apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => result(data))
        .catch(err => result(err.message));
    }

}