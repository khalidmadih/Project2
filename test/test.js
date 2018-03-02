// ******************************************************************************
//This file is set up to execture a unit test for the application.
// ******************************************************************************

//This section states the dependencies used for the test.
// =============================================================
var expect = require("chai").expect;

//This section sets up the ZipCodeCheck function which outlines what the test is testing for.
// =============================================================
function ZipCodeCheck(zip) {
    if (typeof zip === "number") {

        return true;
    } else return false;
      throw new Error("zip is not a number");
};


describe("ZipCodeCheck", function() {
    it("should only take in numbers", function() {
        expect(ZipCodeCheck(85326)).to.equal(true);
    });
});

describe("ZipCodeCheck", function() {
    it("should not take anything other then numbers", function() {
        expect(ZipCodeCheck("abcde")).to.equal(false);
    });
});