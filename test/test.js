var expect = require("chai").expect;

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