var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");

var main = require("../../main.js");

// Load mock data
var data = require("../../mock.json")

describe('sampleTest', function(){

	var mockService = nock("https://api.github.com")
  	.persist() // This will persist mock interception for lifetime of program.
  	.get("/repos/testuser/Hello-World/issues")
  	.reply(200, JSON.stringify(data.issueList) );
  	it('should return valid object properties', function(done) {

      main.findMostFrequentAssignee("testuser", "Hello-World").then(function (results) 
      {
        expect(results).to.have.property("userName");
        expect(results).to.have.property("count");

        var userName = results.userName;
        var count    = results.count;

        // Call back to let mocha know that test case is done. Need this for asychronous operations.
        done();
      });
    });
});