var allMyFriends = require('../data/friends.js');
var path = require('path');

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(allMyFriends);
	})

	app.post('/api/friends', function(req, res){
		// Adding the form data (a friend) as a JSON to the API
		allMyFriends.push(req.body);

		// Since the submitted request was posted as a JSON, we need to convert the scores to integers
		// This way, we can use them to calculate compatibility later
		var allScores = [];
		for(var a=0; a<req.body.scores.length; a++){
			allScores.push(parseInt(req.body.scores[a]));
		}

		var you = {
			name: req.body.name,
			photo: req.body.photo,
			scores: allScores
		};
	 	
	 	console.log("-----------------------------------------------------");
	 	console.log(you);
	 	console.log("-----------------------------------------------------");

	 	
		var totalDifferences = [];

		// In order to match the friend to someone already in the API...
		// loop through the allMyFriends array of friends 
		for(var i=0; i<allMyFriends.length-1; i++){
			var diffSum = 0;
			var diffs=[];
			console.log(allMyFriends[i]);
			// loop through the scores of that friend
			for(var j=0; j<allMyFriends[i].scores.length; j++){
				// calculate the difference in scores between potential friend and user
				var difference = Math.abs(allMyFriends[i].scores[j] - you.scores[j]);
				diffs.push(difference);	
				diffSum+=difference;
			}
			console.log("Differences between " + allMyFriends[i].name +  " and you: " + diffs);
			console.log("The total difference is: " + diffSum);
			totalDifferences.push(diffSum);
			console.log(totalDifferences);
		}

		// Determine the closest match = the one with the "least" amount of difference.
		// Set up a prototype to determine the lowest number in our totalDifferences array
		Array.min = function(totalDifferences){
			return Math.min.apply(Math, totalDifferences);
		};		

		var minimum = Array.min(totalDifferences);
		console.log("The least difference is: " + minimum);
		// Use the indexOf method to get the index of the lowest number
		var matchIndex = totalDifferences.indexOf(minimum);
		// Match it to the index of the corresponding friend
		var match = allMyFriends[matchIndex];
		console.log("Your best match is: " + match.name);

		res.json(match);

		diffSum = 0;
	})
}