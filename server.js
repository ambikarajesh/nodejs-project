const express = require('express');;
const fs = require('fs');
const hbs = require('hbs');
var app = express();

app.set('view engine', hbs);
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
})
app.use((req, res, next)=>{
   var log = `${new Date().toString()}: ${req.method} ${req.path} `;
    fs.appendFile('software.log', log+'\n', (error)=>{
        console.log(error)
    })
next();
})

// app.use((req, res, next)=>{
//     res.render('maintain.hbs')
// })
app.use(express.static(__dirname+'/public'))
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle:'Home',
        welcomeMsg:'Hi welcome to Node Express',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About',
    })
})
app.listen(3000)