const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')  // adding hbs for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlebars for Express config
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static( publicDirectoryPath ))

// ============== INDEX ==============
app.get('', (req, res) => {
    res.render('index',               // view to render (no ext needed), values
    {  title: 'Weather App from Render2',
        name: 'Name set by render in APP.JS'
    })
})

// ============== ABOUT ==============
app.get('/about', (req, res) => {
    res.render('about.hbs',               // view to render (no ext needed), values
    {  title: 'About via HBS Title render',
        name: 'Render name from About'
    })
})
app.get('/about/*', (req, res) => {
    res.render('404',{
        text: 'About article not found'
    })
})

// ============== HELP ==============
app.get('/help', (req, res) => {
    res.render('help',{
        sometext: 'NodeJS rulez',
        title: 'help',
        name: 'Render name from Help'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: '404name',
        errorMessage: 'Help article not found'
    })
})

// ============== WEATHER ==============
app.get('/weather', (req, res) => {
    if(  !req.query.address ) {
        return res.send({
                    error: 'You must provide an address'
                })
    }
    geocode( req.query.address, (error, {latitude,longitude,location} = {} ) => {    // ={} - destructuring if default is empty
        if( error ) {
            return res.send({
                error: 'Location is not found'
            })
        }
        // callback chaining
        forecast(latitude,longitude, (error, {forecast,temperature}) => {   // temperature is not used
            if( error ) {
                return res.send({
                    error: 'Weather data is not found:'
                })
            }
            return res.send({
                address:     req.query.address,
                location:    location,
                latitude:    latitude,
                longitude:   longitude,
                forecast:    forecast
            })
        })
        console.log('\n')
    })

})

// ============== PRODUCTS EXAMPLE ==============
// Ex: http://localhost:3000/products?key=value   or   http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    // console.log(req.query.search)  - { search: 'games', rating: '5' }
    if(  !req.query.search ) {
        return res.send({
                    error: 'You must provide search term'
                })
    }
    res.send({
        products: []
    })
})

// ============== 404 NOTY FOUND ==============
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: '404name',
        errorMessage: '404 page not not found'
    })
})


app.listen(3000, () => {
    console.log('Service is up on port 3000')
})
