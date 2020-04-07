// CLIENT SIDE - shows result in the browser called from HTML page 

//console.log('client side java script loaded')
// fetch API - is not a part of javascript, its browser based API, can be used in all browsers, cantbe used in node js


// querySelector MATCHES the first element that matches whatever you provided 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')    // element by its name
// querySelector MATCHES the first element that matches whatever you provided , need to assign unique ID
// if target by element type:  form, input etc
// target by class:    .className
// target by ID:       #message-1 

const messageOne = document.querySelector('#message-1')

//messageOne.textContent = '212'

const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value
    //const server_API_URL = 'http://localhost:3000/weather?address=' + location
    const server_API_URL = '/weather?address=' + location
    //console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch( server_API_URL ).then(( response ) => {        // url we are trying to fetch from
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                //messageTwo.textContent = ''
            } else {
                console.log('Location:',data.location)
                console.log('Forecast:',data.forecast)
                console.log('temphigh:',data.temphigh)
                messageOne.textContent = 'Location: '  + data.location
                messageTwo.textContent = 'Forecast: '  + data.forecast + 
                                        "\nHighTemp: " + data.temphigh +
                                        ", LowTemp: "     + data.templow
            }
        })
    })


}) 




/*
console.log('client side java script loaded')
// fetch API - is not a part of javascript, its browser based API, can be used in all browsers, cantbe used in node js

fetch('http://puzzle.mead.io/puzzle').then((response) => {        // url we are trying to fetch from
    response.json().then((data) => {
        console.log(data)
        console.log(data.puzzle)
    })

    // do something, extract and render, or dump to the console
    // then = promices API
})
*/