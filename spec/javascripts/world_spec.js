import Cell from "../../app/assets/javascripts/Cell.es6";
import World from "../../app/assets/javascripts/World.es6";
import Helper from './helper';

describe("World", function() {
  var world, cell, helper;

  beforeEach(function () {
    world = new World(3, 3);
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
        world = new World(3, 3);
        helper = new Helper();
        expect(world.cellGrid).toEqual(jasmine.any(Array));
        expect(world.cellGrid[0]).toEqual(jasmine.any(Array));
        expect(world.cellGrid.length).toEqual(3);
        expect(world.cells[helper.getRandomInt(0, world.cells.length)]).toEqual(jasmine.any(Cell));
        expect(world.cells.length).toEqual(9);
      });
    });
  });

  describe("#liveNeighbors", function() {

    beforeEach(function () {
      cell = world.cellGrid[1][1];
      expect(world.liveNeighbors(cell).length).toEqual(0);
    });

    it("should detect a neighbor to the north", function () {
      world.cellGrid[0][1].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the northeast", function () {
      world.cellGrid[0][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the east", function () {
      world.cellGrid[1][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the southeast", function () {
      world.cellGrid[2][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the south", function () {
      world.cellGrid[2][1].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the southwest", function () {
      world.cellGrid[2][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the west", function () {
      world.cellGrid[1][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the northwest", function () {
      world.cellGrid[0][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });
  });

  describe("counting and killing cells", function() {
    
    describe("#liveCells", function() {
      
      it("returns an array of all live cells", function () {
        expect(world.liveCells().length).toEqual(0);
        world.cellGrid[1][1].revive();
        world.cellGrid[2][2].revive();
        expect(world.liveCells().length).toEqual(2);
        world.cellGrid[2][2].die();
        expect(world.liveCells().length).toEqual(1);

        describe("#killAll", function() {
          
          it("should set alive to false for all cells", function () {
            expect(world.liveCells().length).toEqual(1);
            world.killAll();
            expect(world.liveCells().length).toEqual(0);
          });
        });
      });
    });
  });
});