import Cell from "../../app/assets/javascripts/Cell.es6";

describe("Cell", function() {
  var cell;

  beforeEach(() => {
    cell = new Cell(false, 1, 1);
  });


  it("should respond properly to methods", () => {
    expect(cell.alive).toBe(false);
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(1);
  });

  describe("#revive", function() {
    it("brings a cell back from the dead", () => {
      cell.revive();
      expect(cell.alive).toBe(true);
    });
  });

  describe("#die", () => {
    it("kills a cell", () => {
      cell.alive = true
      cell.die()
      expect(cell.alive).toBe(false);
    });
  });

  describe("#isAlive", () => {
    it("returns the truthiness of a cell's life", () => {
      expect(cell.isAlive()).toBe(false);
    });
  });

  describe("#dead", () => {
    it("returns the truthiness of a cell's death", () => {
      expect(cell.dead()).toBe(true);
    });
  });
});