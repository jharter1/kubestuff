var express = require('express');

var app = express();
app.get('/', function(req, res) {
    res.send('Hello all ye who enter!');
});
app.listen(3000, function() {
    console.log('Gehoren auf port 3000!');
    console.log(' http://localhost:3000');
})