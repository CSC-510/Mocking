const got  = require('got');

const token = "token " + "YOUR TOKEN";
const urlRoot = "https://api.github.com";

async function getRepos(userName) {
	const url = urlRoot + '/users/' + userName + "/repos";
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		},
		json: true
	};

	// Send a http request to url
	let repos = (await got(url, options)).body;
	return repos;
}

async function getIssues(owner, repo) {
	const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues";
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		},
		json: true
	};

	// Send a http request to url
	let issues = (await got(url, options)).body;
	return issues;
}

async function getAnIssue(owner, repo, number) {
	const url = urlRoot + "/repos/" + owner + "/" + repo + "/issues/" + number;
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		},
		json: true
	};

	// Send a http request to url
	let issue = (await got(url, options)).body;
	return issue;
}

exports.getRepos = getRepos;
exports.getIssues = getIssues;
exports.getAnIssue = getAnIssue;
