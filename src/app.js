const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to Serve
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Calven J Rodrigues'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Calven J Rodrigues',
        message: 'This website is built as a learning project for an Udemy Courses on Node JS by Andrew Mead. This is a weather app that uses the Weatherstack and Mapbox APIs to provide location specific weather. And lastly, thats not me on the bike below!!'
    })
})

app.get('/help',(req,res)=>{
    
    res.render('help',{
        title: 'Help Me!',
        name: 'Calven J Rodrigues',
        message: 'Even God cannot help those who cannot help themselves.'
    })
})

app.get('/weather',({query},res)=>{
    if(!query.address){
        return res.send({error: 'No Address provided!'})
    }
    geocode(query.address,(error,{lat,lon,locationName}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat,lon, (error, {wDesc,temp,feelsLike,windSpeed,wind_dir,cloudcover,precip}={}) => {
            if(error){
                return res.send({
                    error
                    })
            }
            res.send({
                address: query.address,
                location: locationName,
                forecast: 'Looks like '+wDesc+'. The temperature outside is '+temp+' degress but it feels like '+feelsLike+'. Winds are blowing at '+windSpeed+'kmph from the '+wind_dir+'. The cloud cover is '+cloudcover+'% with a '+precip+'% chance of rain.'

            })

    })
})
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help Article not Found',
        name: 'Calven J Rodrigues',
        title: '404 Error Occurred'
    })    
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page not found',
        name: 'Calven J Rodrigues',
        title: '404 Error Occurred'
    })    
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})