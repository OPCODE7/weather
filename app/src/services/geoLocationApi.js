export default class GeoLocation {
    getLocation(done) {
        const options = {
            enabledHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (position) => {

            done(position.coords)
        }

        const error = (err) => {
            console.log(err.code, err.message)
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

}