const _ = require("underscore");
const github = require("./github.js");

// Which person is assigned to most to issues?
async function findMostFrequentAssignee(user, repo) {
	// mock data needs list of issues.
	let issues = await github.getIssues(user, repo);
	let names = issues.map(issue => issue.assignee);
	let frequency = _.countBy(names, function (name) { return name; });
	let max = _.max(_.keys(frequency), function (item) { return frequency[item] });
	return { userName: max, count: frequency[max] };
}

// How many closed issues?
async function countClosed(user, repo) {
	// mock data needs list of issues.
	let issues = await github.getIssues(user, repo);
	let states = issues.map(issue => issue.state);

	return states.length;
}

// How many words in an issue's title version an issue's body?
async function titleBodyWordCountRatio(user, repo, number) {
	// mock data needs list of issues.
	let issue = await github.getAnIssue(user, repo, number);
	let titleWords = issue.title.split(/\W+|\d+/).length;
	let bodyWords = issue.body.split(/\W+|\d+/).length;
	if (bodyWords == 0) {
		return "NA";
		// HINT: http://stackoverflow.com/questions/4964484/why-does-split-on-an-empty-string-return-a-non-empty-array
	}
	let str = (titleWords / bodyWords) + "";
	return str;
}

exports.findMostFrequentAssignee = findMostFrequentAssignee;
exports.countClosed = countClosed;
exports.titleBodyWordCountRatio = titleBodyWordCountRatio;
