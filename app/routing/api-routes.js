var allMyFriends = require('../data/friends.js');
var path = require('path');

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(allMyFriends);
	})

	app.post('/api/friends', function(req, res){
		// push the submitted data to the allMyFriends array
		allMyFriends.push(req.body);

		// loop through the allMyFriends array of friends
		for(var i=0; i<allMyFriends.length-1; i++){
			var diffs = [];
			var diffSum = 0;
			// loop through the scores of that friend
			for(var j=0; j<allMyFriends[i].scores.length; j++){
				if(allMyFriends[i] == undefined){
					diffs=[];
				}else{
					// calculate the difference in scores
					var difference = Math.abs(allMyFriends[i].scores[j] - allMyFriends[i+1].scores[j]);	
					diffs.push(difference);

					// add up the difference
					for(var k=0; k<diffs.length; k++){
						diffSum+=diffs[k];
						console.log(diffSum);
					}

				}
			}
		}

		console.log(diffs);

		console.log("The total difference is: " + diffSum);

		// compare the difference between scores, question by question
		// add up the differences, calculate the totalDifference
		// use absolute value of the differences
		// closest match = the one with the "least" amount of difference		

	})
}