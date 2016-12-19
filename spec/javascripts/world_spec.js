import Cell from "../../app/assets/javascripts/Cell.es6";
import World from "../../app/assets/javascripts/World.es6";
import Helper from './helper';

describe("World", () => {
  var world, cell, helper;

  beforeEach(() => {
    world = new World(3, 3);
  });

  it("should respond to proper methods", () => {
    expect(world.cols).toEqual(3);
    expect(world.rows).toEqual(3);
    expect(world.cells).toEqual(jasmine.any(Array));
    expect(world.cellGrid).toEqual(jasmine.any(Array));
  });

  describe("upon initialization", () => {
    describe("#makeGrid", () => {
      it("should assign 2D array of cell objects to the cellGrid attribute", () => {
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

  describe("#liveNeighbors", () => {

    beforeEach(() => {
      cell = world.cellGrid[1][1];
      expect(world.liveNeighbors(cell).length).toEqual(0);
    });

    it("should detect a neighbor to the north", () => {
      world.cellGrid[0][1].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the northeast", () => {
      world.cellGrid[0][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the east", () => {
      world.cellGrid[1][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the southeast", () => {
      world.cellGrid[2][2].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the south", () => {
      world.cellGrid[2][1].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the southwest", () => {
      world.cellGrid[2][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the west", () => {
      world.cellGrid[1][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });

    it("should detect a neighbor to the northwest", () => {
      world.cellGrid[0][0].revive();
      expect(world.liveNeighbors(cell).length).toEqual(1);
    });
  });

  describe("counting and killing cells", () => {

    describe("randomlyPopulate", () => {
      it("should make at least some cells alive", () => {
        expect(world.liveCells().length).toEqual(0);
        world.randomlyPopulate();
        expect(world.liveCells().length).toBeGreaterThan(0);
      })
    })
    
    describe("#liveCells", () => {
      
      it("returns an array of all live cells", () => {
        expect(world.liveCells().length).toEqual(0);
        world.cellGrid[1][1].revive();
        world.cellGrid[2][2].revive();
        expect(world.liveCells().length).toEqual(2);
        world.cellGrid[2][2].die();
        expect(world.liveCells().length).toEqual(1);

        describe("#killAll", () => {
          
          it("should set alive to false for all cells", () => {
            expect(world.liveCells().length).toEqual(1);
            world.killAll();
            expect(world.liveCells().length).toEqual(0);
          });
        });
      });
    });
  });

  describe("#calcPattern", () => {
    it("should return an array of four cells for a glider pattern, with the first cell equal to the input", () => {
      world = new World(10, 10);
      world.pattern = 'glider';
      expect(world.calcPattern([5, 5]).length).toEqual(5);
      expect(world.calcPattern([5, 5])[0].x).toEqual(5);
      expect(world.calcPattern([5, 5])[0].y).toEqual(5);
    });

    it("should return an array of four cells for a glider pattern", () => {
      world = new World(10, 10);
      world.pattern = 'lightweight';
      expect(world.calcPattern([5, 5]).length).toEqual(9);
      expect(world.calcPattern([5, 5])[0].x).toEqual(5);
      expect(world.calcPattern([5, 5])[0].y).toEqual(5);
    });

    it("should return an array of four cells for a glider pattern", () => {
      world = new World(10, 10);
      world.pattern = 'heavyweight';
      expect(world.calcPattern([5, 5]).length).toEqual(13);
      expect(world.calcPattern([5, 5])[0].x).toEqual(5);
      expect(world.calcPattern([5, 5])[0].y).toEqual(5);
    });


    describe("X input is out of bounds", () => {
      it("should return an empty array if glider x startpoint is less than or equal to one", () => {
        world = new World(10, 10);
        world.pattern = 'glider';
        expect(world.calcPattern([1, 5]).length).toEqual(0);
      });

      it("should return an empty array if lightweight x startpoint is less than or equal to 2", () => {
        world = new World(10, 10);
        world.pattern = 'lightweight';
        expect(world.calcPattern([2, 5]).length).toEqual(0);
      });

      it("should return an empty array if heavyweight x startpoint is less than or equal to 2", () => {
        world = new World(10, 10);
        world.pattern = 'heavyweight';
        expect(world.calcPattern([2, 5]).length).toEqual(0);
      });

      it("should return an empty array if glider x startpoint is greater than cols - 2", () => {
        world = new World(10, 10);
        world.pattern = 'glider';
        expect(world.calcPattern([8, 5]).length).toEqual(0);
      });
    });
  });
});