const request = require('request')
const geocode = (address,callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2FsdmVuZGV2YnVpbGQiLCJhIjoiY2tkZWIzcWs2MTZhbDJ1cGVnMDkwNXl2YyJ9.hPZXJRm8jF4yribhkQtBrw&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!')
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search!')
        }else{
            callback(undefined,{
                lat: body.features[0].center[1],
                lon:body.features[0].center[0],
                locationName: body.features[0].place_name
        })
    }

})
}

module.exports = geocode

