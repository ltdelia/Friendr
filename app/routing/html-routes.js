var path = require('path');

module.exports = function(app){

	// Routing to the survey page
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// If no pathway is given, default to home page
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
}