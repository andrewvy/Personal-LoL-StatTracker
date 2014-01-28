var request = require('request');
var config = require('./config');

var apiKey = '?api_key=' + config.apiKey;
var server = 'https://prod.api.pvp.net'

var getSummonerID = function(name, cb) {
	var url = server + '/api/lol/na/v1.3/summoner/by-name/' + name + apiKey;
	request.get(url, function(req, res, data){
		cb(JSON.parse(data));
	});
}

var getLatestGames = function(summonerid, cb) {
	var url = server + '/api/lol/na/v1.3/game/by-summoner/' + summonerid + '/recent' + apiKey;
	request.get(url, function(req, res, data){
		cb(JSON.parse(data));
	});
}

var getCurrentRank = function(summonerid, cb) {
	var url = server + '/api/lol/na/v2.3/league/by-summoner/' + summonerid + apiKey;
	request.get(url, function(req, res, data){
		cb(JSON.parse(data));
	});
}

module.exports.getSummonerID = getSummonerID;
module.exports.getLatestGames = getLatestGames;
module.exports.getCurrentRank = getLatestGames;