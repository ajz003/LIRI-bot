require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var input = process.argv.slice(3).join("+");
var command = process.argv[2];

if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        input = dataArr[1];
        whatDo();
    });
} else {
    whatDo();
}


// ---------- Functions

function whatDo() {
    if (command === "spotify-this-song") {
        if (process.argv[3] === undefined) {
            input = "The Sign Ace of Base"
        }
        spotify.search({
            type: 'track',
            query: input,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }
    if (command === "concert-this") {
        request('https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
                var event = JSON.parse(body);
                for (var i = 0; i < event.length; i++) {
                    console.log("Venue: " + event[0].venue.name);
                    console.log("Location: " + event[0].venue.city + ", " + event[0].venue.country);
                    console.log("Date: " + moment(event[0].datetime).format('MM/DD/YYYY'));
                    console.log("-------------------------------------");
                }
            }
        })
    }
    if (command === "movie-this") {
        if (process.argv[3] === undefined) {
            input = "Mr. Nobody"
        }
        request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var movie = JSON.parse(body);
                console.log("Title: " + movie.Title);
                console.log("Year: " + movie.Year);
                console.log("IMDB Rating: " + movie.imdbRating);
                console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
                console.log("Country/Countries of Production: " + movie.Country);
                console.log("Language(s): " + movie.Language);
                console.log("Plot: " + movie.Plot);
                console.log("Actors: " + movie.Actors);
            }
        })
    }
}