var https = require('https');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Gmaps = require('googlemaps');


var app = express();
var port = 3000;

//'AIzaSyD8zXtIbrMQkWp98afcXUTZ_mk9b9rJaGs';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));




app.get('/', function(err, req, res){
    if(err){
        console.log("Error in get / " + err );
    }
    else {
        res.sendFile('/', function (err, req, res) {

            if (err) {
                console.log("error in sendFile /" + err);
            }
            else {
                res.sendFile(__dirname + '/public/index.html');

            }
        });
    }

});

var incoming = {
    origin : '',
    destination: ''
};

app.post('/api/directions', function (req, res) {

    console.log(req.body.Route.origin);
    incoming.origin = req.body.Route.origin;
    incoming.destination = req.body.Route.destination;

    var routeParams = {
        "origin": incoming.origin,
        "destination": incoming.destination,
        "language": "en",
        "region": "us"
    };

    gmApi.directions(routeParams, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result.routes[0].bounds);

        }

    });

});
        var publicConfig = {
            key: 'AIzaSyD8zXtIbrMQkWp98afcXUTZ_mk9b9rJaGs',
            stagger_time: 1000, // for elevationPath
            encode_polylines: false,
            secure: true, // use https
            // proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
        };

        var gmApi = new Gmaps(publicConfig);

        var geocodeParams = {
            "address": "121, Curtain Road, EC2A 3AD, London UK",
            "components": "components=country:GB",
            "bounds": "55,-1|54,1",
            "language": "en",
            "region": "uk"
        };

        gmApi.geocode(geocodeParams, function (err, result) {
            // console.log(result.results[0].geometry);

        });

        var distanceParams = {
            "origins": incoming.origin,
            "destinations": incoming.destination,
            "language": "en",
            "region": "us"
        };

        gmApi.distance(distanceParams, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result.rows[0].elements);
            }
        });

        var routeParams = {
            "origin": incoming.origin,
            "destination": incoming.destination,
            "language": "en",
            "region": "us"
        };

gmApi.directions(routeParams, function (err, result) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result.routes[0].legs[0].steps);

    }

});



app.listen(port, function () {
    console.log('Listneing on ' + port);
});