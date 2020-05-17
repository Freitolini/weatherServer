const request = require('postman-request')

const weather = (latitude,longitude, callback) => {
    
    const weatherURL = "http://api.weatherstack.com/current?access_key=8a321ebb6b53a3daa981a8de1dcc0498&query=" + latitude + ","+ longitude
    request({ url:weatherURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error){
            callback('Unable to find weather. Try another search.',undefined)
        } else{
            callback(undefined,{
                 realTemp: response.body.current.temperature,
                 realFeal: response.body.current.feelslike,
                 location: response.body.location.name,
                 forecast: 'The weather in ' + response.body.location.name + ' is '+ response.body.current.weather_descriptions[0] + ' with temperature of ' + response.body.current.temperature + 'ºC'
            })
        }
    })

}

module.exports = weather