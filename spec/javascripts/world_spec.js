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

    beforeEach(() => {
      world = new World(10, 10);
    });

    describe("glider spaceship", () => {

      beforeEach(() => {
        world.pattern = 'glider';
      });

      it("should return an array of 4 cells for a glider pattern, with the first cell equal to the input", () => {
        expect(world.calcPattern([5, 5]).length).toEqual(5);
        expect(world.calcPattern([5, 5])[0].x).toEqual(5);
        expect(world.calcPattern([5, 5])[0].y).toEqual(5);
      });

       it("should return an empty array if X startpoint is less than or equal to one", () => {
        expect(world.calcPattern([1, 5]).length).toEqual(0);
      });

      it("should return an empty array if Y startpoint is less than or equal to one", () => {
        expect(world.calcPattern([1, 1]).length).toEqual(0);
      });
    });

    describe("lightweight spaceship", () => {

      beforeEach(() => {
        world.pattern = 'lightweight';
      });

      it("should return an array of 9 cells for a lightweight pattern", () => {
        expect(world.calcPattern([5, 5]).length).toEqual(9);
        expect(world.calcPattern([5, 5])[0].x).toEqual(5);
        expect(world.calcPattern([5, 5])[0].y).toEqual(5);
      });

      it("should return an empty array if X startpoint is less than or equal to 3", () => {
        expect(world.calcPattern([3, 5]).length).toEqual(0);
      });

      it("should return an empty array if Y startpoint is less than or equal to 2", () => {
        world.pattern = 'lightweight';
        expect(world.calcPattern([3, 2]).length).toEqual(0);
      });
    });

    describe("heavyweight spaceship", () => {

      beforeEach(() => {
        world.pattern = 'heavyweight';
      });

      it("should return an array of 13 cells for a heavyweight pattern", () => {
        expect(world.calcPattern([5, 5]).length).toEqual(13);
        expect(world.calcPattern([5, 5])[0].x).toEqual(5);
        expect(world.calcPattern([5, 5])[0].y).toEqual(5);
      });

      it("should return an empty array if heavyweight X startpoint is less than or equal to 3", () => {
        expect(world.calcPattern([3, 5]).length).toEqual(0);
      });

      it("should return an empty array if heavyweight Y startpoint is greater than rows - 1", () => {
        expect(world.calcPattern([8, 9]).length).toEqual(0);
      });
    });
  });
});