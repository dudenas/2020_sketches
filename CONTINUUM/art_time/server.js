var express = require('express')
var app = express()
app.listen(8080, () => console.log('listening to port 8080'))

app.use(express.static('public'))