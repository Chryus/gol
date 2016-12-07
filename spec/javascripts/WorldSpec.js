describe("World", function() {

  beforeEach(function () {
    world = new App.World(3, 3);
  });

  it("should respond to proper methods", function() {
    expect(world.cols).toEqual(3);
    expect(world.rows).toEqual(3);
    expect(world.cells).toEqual(jasmine.any(Array));
    expect(world.cellGrid).toEqual(jasmine.any(Array));
  });

  describe("upon initialization", function() {
    describe("#makeGrid", function () {
      it("should assign 2D array of cell objects to the cellGrid attribute", function () {
        world = new App.World(3, 3);
        expect(world.cellGrid).toEqual(jasmine.any(Array));
        expect(world.cellGrid[0]).toEqual(jasmine.any(Array));
        expect(world.cellGrid.length).toEqual(3);
        expect(world.cells[getRandomInt(0, world.cells.length)]).toEqual(jasmine.any(App.Cell));
        expect(world.cells.length).toEqual(9);
      });
    });
  });
});