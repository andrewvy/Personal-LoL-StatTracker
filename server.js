var restify = require('restify');
var config = require('./config');
var db = require('./db');
var api = require('./api');
var scheduler = require('./schedule');


// Set configuration values.

var summonerName = config.summonerName;
var summonerID = config.summonerID;

// Server Functions (Private and Public)

function getID(username) {
	api.getSummonerID(username, function(data) {
		res.send(data);
	});
}

function getLatestGames(req, res, data) {
	// Retrieve from cache. Add DB Logic to retrieve games if cache empty or outdated.
	// For now, retrieve latest games.
	api.getLatestGames(summonerID, function(data) {
		res.send(data.games);
	});
}

function getGames(req, res, data) {
	db.getGames(req.params.i, function(data) {
		res.send(data);		
	});
}

function getRank(req, res, data) {
	api.getCurrentRank(summonerID, function(data) {
		res.send(data);
	});
}

// Initialize Restify and routes

var server = restify.createServer();

server.get('/games/:i', getGames);
server.get('/rank', getRank);

server.listen(8080, function() {
	console.log('API running at %s', server.url);
});