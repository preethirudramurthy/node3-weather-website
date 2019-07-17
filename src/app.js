const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About the App',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help for the App",
        name: "Andrew"
    })
})
// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About the app</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send("Please provide an address")
    } 
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        console.log('Error', error)
        if (error) {
            return res.send({error})
        }
        console.log('Data', latitude, longitude, location)
    
        forecast(latitude, longitude, (error, data) => {
            console.log(error)
            if (error){
                return res.send({error})
            }
            console.log('Data', data)
            res.send(
                {
                'forecast': data,
                'location': req.query.address
            })
        })
    })
    
    

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search criteria'
        })
    } 
    console.log(req.query)
        res.send({
            products : []
        })
    
    
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found'
    })
})
app.listen(3000,() => {
    console.log('Server is up on port 3000')
})