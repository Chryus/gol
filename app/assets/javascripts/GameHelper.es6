class GameHelper {

  constructor(){}

  currentYInRange (currentY, previousY) {
    if (currentY === previousY) { return true; }
    let min = previousY - 8 // large spaceship height
    let max = previousY + 8
    return currentY >= min && currentY <= max;
  }

  getDirection (startPoint, previousStartPoint) {
    let currentX = startPoint[0];
    let previousX = previousStartPoint[0];
    let currentY = startPoint[1];
    let previousY = previousStartPoint[1];
    let direction = null;
    let currentYInRange = this.currentYInRange(currentY, previousY);

    if (currentX > previousX && currentYInRange) {
      direction = "easterly";
    } else if (currentYInRange) {
      direction = "westerly"
    } else {
      direction;
    }
    return direction;
  }

  roundDownToTen(num) {
    return Math.floor((num + 1)/10)*10;
  }

  normalizeCoord (coord) {
    return coord < 10 ? 0 : Math.floor(coord/10);
  }
}

export default GameHelper