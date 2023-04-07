import Helper from "../utils/helper.js";

export default class GeoLocation {
    helper= new Helper();

    navigatorCompatibility() {
        return navigator.geolocation ? true : false;
    }

    getLocation(response) {
        if(this.navigatorCompatibility){
            const options = {
                enabledHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
    
            const success = (position) => {
                response(position.coords)
            }
    
            const error = (err) => {
                this.helper.showErrorMessage(".modal",".opacity",err.message);
                
            }
            navigator.geolocation.getCurrentPosition(success, error, options);
        }else{

        }

    }

}