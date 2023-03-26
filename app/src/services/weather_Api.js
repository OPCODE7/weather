export default class weatherApi {
    constructor(url,key,parameters) {
        this.apiKey = key;
        this.url = url;
        this.parameters= parameters;
    }

    fetchData() {
        let data= fetch(this.url+this.apiKey+this.parameters);
        return data;
    }

}