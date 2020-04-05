const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
    encodeURIComponent( address ) +
    '.json?access_token=pk.eyJ1Ijoic2VtZW55Y2giLCJhIjoiY2s4ZjRkaWdiMDBmdjNsb3pmZGJqaXJuZCJ9.qqyzlyLDja3NTl1Zg4PErA'
    // request({url:url, json:true}, (error, response) => {
    //         if (error) {
    //             callback('Unable to connect to location services', undefined )
    //         } else if (response.body.features.length === 0 ) {
    //             callback('Unable to find the location', undefined )
    //         } else {
    //             callback(undefined, {
    //                 location: response.body.features[0].place_name,
    //                 latitude: response.body.features[0].center[1],
    //                 longitude: response.body.features[0].center[0]
    //             })
    //         }
    //     })
    // } 
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined )
        } else if ( body.features.length === 0 ) {
            callback('Unable to find the location', undefined )
        } else {
            callback(undefined, {
                location:  body.features[0].place_name,
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }

    })
} 
module.exports = geocode

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