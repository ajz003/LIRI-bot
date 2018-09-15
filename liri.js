var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var moment = require("moment");



var spotify = new Spotify(keys.spotify);

var songInfo = process.argv.slice(3).join("+")

console.log(songInfo)

if (process.argv[2] === "spotify-this-song") {

spotify.search({ type: 'track', query: songInfo, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log("Artist: " + data.tracks.items[0].artists[0].name); 
  console.log("Song Name: " + data.tracks.items[0].name); 
  console.log("Song Preview URL: " + data.tracks.items[0].preview_url); 
  console.log("Album: " + data.tracks.items[0].album.name); 

  });

}