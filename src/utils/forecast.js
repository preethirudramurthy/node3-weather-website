const request = require('request')



const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude)
    const url = "https://api.darksky.net/forecast/50be9aeee7e0c28a5c9ed5a9af8dbdf9/"+longitude+","+latitude

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to call weather service', undefined)
        } else if (body.error){
            callback('Unable to find the location', undefined)
        } else {
            const forecast = body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. There is a '+
         body.currently.precipProbability +'% chance of rain'
            callback(undefined, forecast)
        }
    })
}

module.exports = forecast