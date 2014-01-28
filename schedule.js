var schedule = require('node-schedule');
var db = require('./db');
var api = require('./api');
var config = require('./config');


// Recurrence Rules

var everyThirtyHour = new schedule.RecurrenceRule();
everyThirtyHour.minute = 30;

var everyThirtyFiveHour = new schedule.RecurrenceRule();
everyThirtyFiveHour.minute = 35;

// Recurrence Functions

var latestGameSaver = schedule.scheduleJob(everyThirtyHour, function(){
    api.getLatestGames(config.summonerID, function(data) {
		db.saveGames(data, function() {
			console.log("Saved latest games.");
		});
	});
});

var boilTheData = schedule.scheduleJob(everyThirtyFiveHour, function(){
	db.computeStatistics();
});