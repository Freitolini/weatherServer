const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/weather')
const geocode = require('./utils/geocode')

// Define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlerbars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Tiago'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Tiago'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Mensagem',
        name: 'Tiago'
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: ' You must provide an address'
        })
    }

    geocode(req.query.address, (error,{ latitude, longitude, location} = {}) =>  {
        if (error){
            return res.send({error})            
        }
        forecast(latitude,longitude, (error,foreCast) => {
            if (error){
                return res.send({error})            
            }
            res.send({
                forecast: foreCast.forecast,
                location: foreCast.location,           
            })  
        })
    })

}) 

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: '404',        
        name: 'Tiago',
        message: 'Help Article not found!'
    })})


app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: ' You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',        
        name: 'Tiago',
        message: 'Page not found!'
    })})

app.listen(3000, () => {
    console.log('Server is up on port 30000')
})

// app.com