import GameHelper from "../../app/assets/javascripts/GameHelper.es6";

describe("GameHelper", function() {
  var helper;

  beforeEach(() => {
    helper = new GameHelper();
  });
  
  describe("#currentYInRange", () => {
    it("should return true if the current y startpoint is within +- 8 of the previous y startpoint", () => {
      expect(helper.currentYInRange(2, 2)).toEqual(true);
      expect(helper.currentYInRange(3, 2)).toEqual(true);
      expect(helper.currentYInRange(7, 2)).toEqual(true);
      expect(helper.currentYInRange(1, 20)).toEqual(false);
    });
  });
});