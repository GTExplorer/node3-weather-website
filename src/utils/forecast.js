const request = require('request')
 
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/162927498ba191665a0d63235ebec6f6/'+
    latitude + ',' +
    longitude +'?exclude=minutely&units=si'
// *****************  SAVED VERSION 1
//     request({url:url, json:true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather services', undefined )
//         } else if ( response.body.error ) {
//             callback('Unable to find the location', undefined )
//         } else {
//             callback(undefined, {
//                 summary: response.body.daily.data[0].summary,
//                 temperature: response.body.currently.temperature,               
//                 percipitation: response.body.currently.precipProbability
//             })
//         }
//     })
// }
        request({ url, json:true}, (error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather services', undefined )
        } else if ( body.error ) {
            callback('Unable to find the location', undefined )
        } else {
            //const forecast1 = body.daily.data[0].summary+' It is currently '+
            //body.currently.temperature+' degrees out. There is a '+
            //body.currently.precipProbability+'% chance of rain.'
            callback(undefined, {
                forecast:   body.daily.data[0].summary+' It is currently '+
                            body.currently.temperature+' degrees out. There is a '+
                            body.currently.precipProbability+'% chance of rain.'
                //summary:        body.daily.data[0].summary,
                //temperature:    body.currently.temperature,               
                //percipitation:  body.currently.precipProbability
            })
        }

    })
} 

module.exports = forecast

//  LEGACY STUFF
//const url = 'https://api.darksky.net/forecast/162927498ba191665a0d63235ebec6f6/37.8267,-122.4233?exclude=minutely&units=si&lang=es'
/*
request( { url: url, json: true }, (error, response) => {
    //console.log(response)
    //const data = JSON.parse(response.body)
    //console.log(data.currently)
    if (error) {
        console.log('\nUnable to connect')
    } else if (response.body.error ) {
        
    } else {
        console.log('\n'+ response.body.daily.data[0].summary+'\nIt is currently',response.body.currently.temperature,'degrees out.\nThere is a',response.body.currently.precipProbability+'% chance of rain\n')
    }
})
// Geocoding

const mapboxRequest = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2VtZW55Y2giLCJhIjoiY2s4ZjRkaWdiMDBmdjNsb3pmZGJqaXJuZCJ9.qqyzlyLDja3NTl1Zg4PErA'
request( { url: mapboxRequest, json: true }, (error, response) => {
    if (error) {
        console.log('\nUnable to connect to connection services')
    } else if ( response.body.features.length === 0 ) {
        console.log('\nLocation not found')
    } else {
        console.log('\nCoordinates for '+   response.body.features[0].place_name +
                    ': Latitude:' +         response.body.features[0].center[1] + 
                    ': Longitude:' +        response.body.features[0].center[0] + '\n')
    }
})
*/