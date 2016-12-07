describe("Cell", function() {
  var cell;

  beforeEach(function() {
    cell = new App.Cell(false, 1, 1);
  });

  it("should respond properly to methods", function () {
    expect(cell.alive).toBe(false);
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(1);
  });

  describe("#revive" function() {
    it("brings a cell back from the dead" function() {
      cell.revive();
      expect(cell.alive).toBe(true);
    });
  });

  describe("#die" function() {
    it("kills a cell" function() {
      cell.alive = true
      cell.die()
      expect(cell.alive).toBe(false);
    });
  });

  describe("#alive" function() {
    it("returns the truthiness of a cell's life" function() {
      expect(cell.alive).toBe(false);
    });
  });

  describe("#dead" function() {
    it("returns the truthiness of a cell's death" function() {
      expect(cell.alive).toBe(true);
    });
  });
});