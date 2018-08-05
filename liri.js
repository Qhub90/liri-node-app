require("dotenv").config();

var keys = require("./keys");


// Twitter function grabs my latest tweets----------------------------------------------------------------------------------------------------------------------------

var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

function getMyTweets(){
client.get('statuses/user_timeline', {screen_name: "Qberto1"}, function(error, tweets, response) {
    for(i = 0; i < tweets.length; i++)
    console.log(tweets[i].text);
 });
}

// SPOTIFY Function-----------------------------------------------------------------------------------------------------------------------------------------------

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Plays a default song if nothing is typed
if (process.argv[3] == null) {
    songName = "The Sign Ace";
}

function songInfo(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data.tracks.items[0].artists[0].name));
        console.log(JSON.stringify(data.tracks.items[0].name));
        console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify));
        console.log(JSON.stringify(data.tracks.items[0].album.name))
    })
};

// OMDB function that consoles my requested data...---------------------------------------

function movieInfo(movieName) {

if (process.argv[3] == null) {
    movieName = "Mr. Nobody";

}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

var request = require('request');


    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Released);
            console.log("IMDB gave it: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes gave it: " + JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);

        }
    })
};

// Do what it says function that currently does not work 

var fs = require("fs");

function doWhatItSays(){
fs.readFile("random.txt", "utf8", function(error, data) {
  
  var dataArr = data.split(",");
      
  if(dataArr.length == 2){
      input(dataArr[0], JSON.parse(dataArr[1]));
      
  }

})
};
// Swich statement that reads handles Liri commands
var liri = function (command, info) {


    switch (command) {
        case "my-tweets":
            getMyTweets();
            break;
        case "spotify-this-song":
            songInfo(info);
            break;
        case "movie-this":
            movieInfo(info);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesnt know that");
    };

}
// Liri function that runs the input function with the arguments it needs
var input = function (argOne) {
    var argTWO ="";

    for(var i = 3; i < process.argv.length; i++) {
        argTWO += process.argv[i] + " ";
    }
    console.log(argTWO)
    liri(argOne, argTWO);
    
    
}
input(process.argv[2])