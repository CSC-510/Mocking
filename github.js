var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var token = "token " + "YOUR TOKEN";
var urlRoot = "https://api.github.com";

function getRepoNames(userName)
{
	var options = {
		url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var repos = JSON.parse(body);
			var names = _.pluck(repos,"name")
			resolve(names);
		});
	});
}

function getIssues(owner, repo )
{
	var options = {
		url: urlRoot + "/repos/" + owner +"/" + repo + "/issues",
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			resolve(obj);
		});
	});
}

function getAnIssue(owner, repo, number )
{
	var options = {
		url: urlRoot + "/repos/" + owner +"/" + repo + "/issues/"+number,
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			resolve(obj);
		});
	});
}

exports.getRepoNames = getRepoNames;
exports.getIssues = getIssues;
exports.getAnIssue = getAnIssue;
