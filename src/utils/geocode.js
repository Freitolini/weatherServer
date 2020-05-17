const request = require('postman-request')

const geocode = (address, callback) => {
    const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZnJlaXRvbGluaSIsImEiOiJjazl4Y2c3bTIwaHRoM2h1aHB3aHZ4Z2dlIn0.gRa1ZJ6PksemqJe4OwvFNw&limit=1"
    request({ url:mapURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        } else{
            callback(undefined,{
                 latitude: response.body.features[0].center[1],
                 longitude: response.body.features[0].center[0],
                 location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode