const request = require('request')
const forecast= (lat,lon,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=bcf185f9fb5620a95eea8186b75a67f2&query='+lat+','+lon+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not Connected to WeatherService!')
        }else if(body.error){
            callback('Incorrect Co-ordinates entered!')
        }else{
            callback(
                undefined,{
                    temp:body.current.temperature,
                    feelsLike: body.current.feelslike,
                    wDesc: body.current.weather_descriptions[0],
                    windSpeed: body.current.wind_speed,
                    wind_dir: body.current.wind_dir,
                    cloudcover: body.current.cloudcover,
                    precip: body.current.precip    
                }
            )

        }
    })
}

module.exports = forecast