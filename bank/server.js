  
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const port = process.env.PORT || 1309

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bankDB', { useNewUrlParser: true, useUnifiedTopology: true  })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')));



app.use('/', api)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port,function(){
   console.log(`Running on port ${port}`)
})