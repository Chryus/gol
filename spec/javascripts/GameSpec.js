describe("Game", function() {
  var game;

  beforeEach(function () {
    game = new App.Game();
  });

  it("should respond to proper methods", function() {
    expect(game.canvas).toEqual(jasmine.any(Object));
  });
});