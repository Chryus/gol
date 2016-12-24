import Game from "../../app/assets/javascripts/Game.es6";
import World from "../../app/assets/javascripts/World.es6";
import Cell from "../../app/assets/javascripts/Cell.es6";

describe("Game", function() {
  var game;

  beforeEach(() => {
    game = new Game();
  });
  
  describe("#currentYInRange", () => {
    it("should return true if the current y startpoint is within +- 8 of the previous y startpoint", () => {
      expect(game.currentYInRange(2, 2)).toEqual(true);
      expect(game.currentYInRange(3, 2)).toEqual(true);
      expect(game.currentYInRange(7, 2)).toEqual(true);
      expect(game.currentYInRange(8, 9)).toEqual(false);
    });
  });
});