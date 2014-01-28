var mysql = require('mysql');
var config = require('./config');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.dbUser,
  password : config.dbPassword,
  database: 'leagueoflegends'
});

// Set custom queryFormat

connection.config.queryFormat = function (query, values) {
	if (!values) return query;
		return query.replace(/\:(\w+)/g, function (txt, key) {
	if (values.hasOwnProperty(key)) {
		return this.escape(values[key]); 
		}
	return txt;
	}.bind(this));
};



connection.connect(function(err) {
  console.log("MySQL DB connected successfully!");
});

var saveGames = function (data, cb){
	console.log("Grabbing latest games...");
	for (i=0;i<data.games.length;i++){
		var game = data.games[i];
		connection.query("REPLACE INTO games (" +
			"gameId," +
			"gameMode," +
			"gameType," +
			"level," +
			"subType," +
			"spell1," +
			"spell2," +
			"assists," +
			"barracksKilled," +
			"championsKilled," +
			"doubleKills," +
			"firstBlood," +
			"gold," +
			"goldEarned," +
			"goldSpent," +
			"quadraKills," +
			"numDeaths," +
			"killingSprees," +
			"largestCriticalStrike," +
			"item0," +
			"item1," +
			"item2," +
			"item3," +
			"item4," +
			"item5," +
			"item6," +
			"itemsPurchased," +
			"minionsKilled," +
			"neutralMinionsKilled," +
			"neutralMinionsKilledEnemyJungle," +
			"neutralMinionsKilledYourJungle," +
			"pentaKills," +
			"tripleKills," +
			"turretsKilled," +
			"trueDamageTaken," +
			"timePlayed," +
			"totalHeal," +
			"totalDamageTaken," +
			"spell1Cast," +
			"spell2Cast," +
			"spell3Cast," +
			"spell4Cast," +
			"sightWardsBought," +
			"magicDamageTaken," +
			"visionWardsBought," +
			"wardKilled," +
			"wardPlaced," +
			"win," +
			"createDate" +
			") VALUES (" +
			":gameId," +
			":gameMode," +
			":gameType," +
			":level," +
			":subType," +
			":spell1," +
			":spell2," +
			":assists," +
			":barracksKilled," +
			":championsKilled," +
			":doubleKills," +
			":firstBlood," +
			":gold," +
			":goldEarned," +
			":goldSpent," +
			":quadraKills," +
			":numDeaths," +
			":killingSprees," +
			":largestCriticalStrike," +
			":item0," +
			":item1," +
			":item2," +
			":item3," +
			":item4," +
			":item5," +
			":item6," +
			":itemsPurchased," +
			":minionsKilled," +
			":neutralMinionsKilled," +
			":neutralMinionsKilledEnemyJungle," +
			":neutralMinionsKilledYourJungle," +
			":pentaKills," +
			":tripleKills," +
			":turretsKilled," +
			":trueDamageTaken," +
			":timePlayed," +
			":totalHeal," +
			":totalDamageTaken," +
			":spell1Cast," +
			":spell2Cast," +
			":spell3Cast," +
			":spell4Cast," +
			":sightWardsBought," +
			":magicDamageTaken," +
			":visionWardsBought," +
			":wardKilled," +
			":wardPlaced," +
			":win," +
			":createDate" +
			");", { 
			gameId: game.gameId || 0,
			gameMode: game.gameMode || 0,
			gameType: game.gameType || 0,
			level: game.stats.level || 0,
			subType: game.subType || 0,
			spell1: game.spell1 || 0,
			spell2: game.spell2 || 0,
			assists: game.stats.assists || 0,
			barracksKilled: game.stats.barracksKilled || 0,
			championsKilled: game.stats.championsKilled || 0,
			doubleKills: game.stats.doubleKills || 0,
			firstBlood: game.stats.firstBlood || 0,
			gold: game.stats.gold || 0,
			goldEarned: game.stats.goldEarned,
			goldSpent: game.stats.goldSpent,
			quadraKills: game.stats.quadraKills || 0,
			numDeaths: game.stats.numDeaths || 0,
			killingSprees: game.stats.killingSprees || 0,
			largestCriticalStrike: game.stats.largestCriticalStrike  || 0,
			item0: game.stats.item0 || 0,
			item1: game.stats.item1 || 0,
			item2: game.stats.item2 || 0,
			item3: game.stats.item3 || 0,
			item4: game.stats.item4 || 0,
			item5: game.stats.item5 || 0,
			item6: game.stats.item6 || 0,
			itemsPurchased: game.stats.itemsPurchased || 0,
			minionsKilled: game.stats.minionsKilled || 0, 
			neutralMinionsKilled: game.stats.neutralMinionsKilled || 0,
			neutralMinionsKilledEnemyJungle: game.stats.neutralMinionsKilledEnemyJungle || 0,
			neutralMinionsKilledYourJungle: game.stats.neutralMinionsKilledYourJungle || 0,
			pentaKills: game.stats.pentaKills || 0,
			tripleKills: game.stats.tripleKills || 0,
			turretsKilled: game.stats.turretsKilled || 0,
			trueDamageTaken: game.stats.trueDamageTaken || 0,
			timePlayed: game.stats.timePlayed,
			totalHeal: game.stats.totalHeal || 0,
			totalDamageTaken: game.stats.totalDamageTaken || 0,
			spell1Cast: game.stats.spell1Cast || 0,
			spell2Cast: game.stats.spell2Cast || 0,
			spell3Cast: game.stats.spell3Cast || 0,
			spell4Cast: game.stats.spell4Cast || 0,
			sightWardsBought: game.stats.sightWardsBought || 0,
			magicDamageTaken: game.stats.magicDamageTaken || 0,
			visionWardsBought: game.stats.visionWardsBought || 0,
			wardKilled: game.stats.wardKilled || 0,
			wardPlaced: game.stats.wardPlaced || 0,
			win: game.stats.win,
			createDate: game.createDate || 0
		});
	}
	cb();
}

var computeStatistics = function() {

	console.log("Computing statistics...");

	var statistics = {
		totalGames: 0,
		championsKilled: 0,
		numDeaths: 0,
		assists: 0, 
		firstBlood: 0, 
		doubleKills: 0, 
		tripleKills: 0, 
		quadraKills: 0, 
		pentaKills: 0, 
		killingSprees: 0, 
		goldEarned: 0, 
		goldSpent: 0, 
		largestCriticalStrike: 0, 
		minionsKilled: 0, 
		neutralMinionsKilled: 0, 
		neutralMinionsKilledEnemyJungle: 0, 
		neutralMinionsKilledYourJungle: 0, 
		totalDamageTaken: 0, 
		magicDamageTaken: 0, 
		trueDamageTaken: 0, 
		totalHeal: 0,
		timePlayed: 0, 
		sightWardsBought: 0, 
		visionWardsBought: 0, 
		wardKilled: 0, 
		wardPlaced: 0, 
		win: 0, 
		loss: 0
	}

	connection.query("SELECT * FROM games", function(err, results) {
		var games = 0;
		for(var i=0;i<results.length; i++) {

			// KDA Totals
			statistics.championsKilled += results[i].championsKilled;
			statistics.numDeaths += results[i].numDeaths;
			statistics.assists += results[i].assists;

			// FB Total
			statistics.firstBlood += results[i].firstBlood;

			// Killing Spree Totals
			statistics.doubleKills += results[i].doubleKills;
			statistics.tripleKills += results[i].tripleKills;
			statistics.quadraKills = statistics.quadraKills + results[i].quadraKills;
			statistics.pentaKills = statistics.pentaKills + results[i].pentaKills;

			if (results[i].killingSprees > statistics.killingSprees) {
				statistics.killingSprees = results[i].killingSprees;
			}

			// Gold
			statistics.goldEarned += results[i].goldEarned;
			statistics.goldSpent += results[i].goldSpent;

			// Critical Strike
			if (results[i].largestCriticalStrike > statistics.largestCriticalStrike) {
				statistics.largestCriticalStrike = results[i].largestCriticalStrike;
			}

			// Minions
			statistics.minionsKilled += results[i].minionsKilled;
			statistics.neutralMinionsKilled += results[i].neutralMinionsKilled;
			statistics.neutralMinionsKilledEnemyJungle += results[i].neutralMinionsKilledEnemyJungle;
			statistics.neutralMinionsKilledYourJungle += results[i].neutralMinionsKilledYourJungle;

			// Damage + Healed
			statistics.totalDamageTaken += results[i].totalDamageTaken;
			statistics.magicDamageTaken += results[i].magicDamageTaken;
			statistics.trueDamageTaken += results[i].trueDamageTaken;
			statistics.totalHeal += results[i].totalHeal;

			// Wards
			statistics.sightWardsBought += results[i].sightWardsBought;
			statistics.visionWardsBought += results[i].visionWardsBought;
			statistics.wardKilled += results[i].wardKilled;
			statistics.wardPlaced += results[i].wardPlaced;

			// Misc
			statistics.totalGames++;
			statistics.timePlayed += results[i].timePlayed;
			if (results[i].win == 1) { statistics.win++; }
			else { statistics.loss++ };

			if (++games == results.length) {
				connection.query("UPDATE statistics SET " +
					"totalGames=:totalGames," +
					"championsKilled=:championsKilled," +
					"numDeaths=:numDeaths," +
					"assists=:assists," + 
					"firstBlood=:firstBlood," + 
					"doubleKills=:doubleKills," + 
					"tripleKills=:tripleKills," + 
					"quadraKills=:quadraKills," + 
					"pentaKills=:pentaKills," + 
					"killingSprees=:killingSprees," + 
					"goldEarned=:goldEarned," + 
					"goldSpent=:goldSpent," + 
					"largestCriticalStrike=:largestCriticalStrike," + 
					"minionsKilled=:minionsKilled," + 
					"neutralMinionsKilled=:neutralMinionsKilled," + 
					"neutralMinionsKilledEnemyJungle=:neutralMinionsKilledEnemyJungle," + 
					"neutralMinionsKilledYourJungle=:neutralMinionsKilledYourJungle," + 
					"totalDamageTaken=:totalDamageTaken," + 
					"magicDamageTaken=:magicDamageTaken," + 
					"trueDamageTaken=:trueDamageTaken," + 
					"totalHeal=:totalHeal," +
					"timePlayed=:timePlayed," + 
					"sightWardsBought=:sightWardsBought," + 
					"visionWardsBought=:visionWardsBought," + 
					"wardKilled=:wardKilled," + 
					"wardPlaced=:wardPlaced," + 
					"win=:win," + 
					"loss=:loss" +
					" WHERE ID='1';"
					, statistics, function(err, res){
						console.log("Statistics saved.");
					});
				}
		}
	});
}

var getGames = function(i, cb) {
	connection.query("SELECT * FROM games ORDER BY createdDate DESC OFFSET :i ROWS FECTH NEXT 15 ROWS ONLY", {i: i}, 			function (err, res) {
		cb(res);
	});
}

var saveCurrentRank = function(data, cb) {
	var rank = {		
	}
	connection.query("INSERT INTO rank (leagueName, leagueRank, points, date) " +
	"VALUES (:leagueName, :leagueRank, :points, currentTimestamp() );", rank, function(err, res) {	
		cb();
	});
}

module.exports.saveGames = saveGames;
module.exports.computeStatistics = computeStatistics;
module.exports.getGames = getGames;
module.exports.saveCurrentRank = saveCurrentRank;