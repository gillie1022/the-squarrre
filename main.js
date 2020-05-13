let points = 0;
let best = 0;
class Game {
  constructor() {
    let canvas = document.querySelector("#canvas");
    canvas.width = 500;
    canvas.height = 500;
    let screen = canvas.getContext("2d");
    let gameSize = { x: canvas.width, y: canvas.height };
    this.ocean = new Ocean(gameSize);
    this.island = new Island(gameSize);
    // let bodies = []
    // this.bodies = this.bodies.concat(new Pirate(gameSize))
    this.pirate = new Pirate(gameSize);
    this.doubloon = new Doubloon(gameSize, this.pirate);
    this.cannonBalls = [];
    this.cannonBall = new CannonBall(gameSize);

    let animate = () => {
      this.drawOcean(screen);
      this.drawIsland(screen);
      this.drawPirate(screen);
      this.drawDoubloon(screen);
      for (let i of this.cannonBalls) {
        this.updateCannonballs(screen, i);
      }
      for (let i of this.cannonBalls){if (colliding(this.pirate,i) === true){
        points = 0
      }}
      if (Math.random() > 0.99) {
        this.cannonBalls.push(new CannonBall(gameSize));
      }
      for (let i of this.cannonBalls) {
        this.drawCannonballs(screen, i);
      }
      // this.collision(this.pirate, connonball)
      this.drawBest(screen);
      this.score(this.pirate, this.doubloon, gameSize);
      this.drawPoints(screen);
      requestAnimationFrame(animate);
    };
    animate();
  }

  drawOcean(screen) {
    screen.fillStyle = "#5290f2";
    screen.fillRect(0, 0, this.ocean.size.x, this.ocean.size.y);
  }
  drawIsland(screen) {
    screen.fillStyle = "#e3cbbc";
    screen.fillRect(
      this.island.size.x / 2,
      this.island.size.y / 2,
      this.island.size.x,
      this.island.size.y
    );
  }
  drawPirate(screen) {
    screen.fillStyle = "black";
    let startingXPosition = this.pirate.center.x - this.pirate.size.x / 2;
    let startingYPosition = this.pirate.center.y - this.pirate.size.y / 2;
    let pirateWidth = this.pirate.size.x;
    let pirateHeight = this.pirate.size.y;
    screen.fillRect(
      startingXPosition,
      startingYPosition,
      pirateWidth,
      pirateHeight
    );
  }
  drawDoubloon(screen) {
    screen.fillStyle = "gold";
    let startingXPosition = this.doubloon.center.x;
    let startingYPosition = this.doubloon.center.y;
    let doubloonWidth = this.doubloon.size.x;
    let doubloonHeight = this.doubloon.size.x;
    screen.fillRect(
      startingXPosition,
      startingYPosition,
      doubloonWidth,
      doubloonHeight
    );
  }
  updateCannonballs(screen, cannonBall) {
    screen.fillStyle = "grey";
    if (cannonBall.center.direction === "right") {
      cannonBall.center.x += 3;
    }
    if (cannonBall.center.direction === "left") {
      cannonBall.center.x -= 3;
    }
    if (cannonBall.center.direction === "up") {
      cannonBall.center.y -= 3;
    }
    if (cannonBall.center.direction === "down") {
      cannonBall.center.y += 3;
    }
  }


  drawCannonballs(screen, cannonBall) {
    screen.fillStyle = "grey";
    let startingXPosition = cannonBall.center.x;
    let startingYPosition = cannonBall.center.y;
    let cannonBallWidth = cannonBall.size.x;
    let cannonballHeight = cannonBall.size.y;

    screen.fillRect(
      startingXPosition,
      startingYPosition,
      cannonBallWidth,
      cannonballHeight
    );
  }
  drawPoints(screen) {
    screen.fillStyle = "black";
    screen.font = "32px Comic Sans MS";
    screen.fillText("Score: " + points, 25, 50);
  }
  drawBest(screen) {
    screen.fillStyle = "black";
    screen.font = "32px Comic Sans MS";
    
    if (points > best) {
      best = points;
    }
    screen.fillText("Best: " + best, 25, 475);
  }
  score(pirate, doubloon, gameSize) {
    if (
      doubloon.center.x === pirate.center.x - doubloon.size.x / 2 &&
      doubloon.center.y === pirate.center.y - doubloon.size.y / 2
    ) {
      console.log("SCORE");
      ++points;
      doubloon.getRandomPosition(gameSize, pirate);
    }
  }
}

class Ocean {
  constructor(gameSize) {
    this.size = { x: gameSize.x, y: gameSize.y };
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 };
  }
}
class Island {
  constructor(gameSize) {
    this.size = { x: gameSize.x / 2, y: gameSize.y / 2 };
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 };
  }
}

class Pirate {
  constructor(gameSize) {
    this.size = { x: gameSize.x / 10, y: gameSize.y / 10 };
    this.center = {
      x: gameSize.x * 0.25 + this.size.x,
      y: gameSize.y * 0.75 - this.size.y,
    };
  }
}

class Doubloon {
  constructor(gameSize, pirate) {
    this.size = { x: gameSize.x / 20, y: gameSize.y / 20 };
    this.getRandomPosition(gameSize, pirate);
  }

  getRandomPosition(gameSize, pirate) {
    let xArray = [
      gameSize.x * 0.75 - this.size.x * 2.5,
      gameSize.x * 0.5 - this.size.x / 2,
      gameSize.x * 0.25 + this.size.x * 1.5,
    ];
    let yArray = [
      gameSize.y * 0.25 + this.size.y * 1.5,
      gameSize.y * 0.5 - this.size.y / 2,
      gameSize.y * 0.75 - this.size.y * 2.5,
    ];
    this.center = {
      x: xArray[getRandomInt(xArray.length)],
      y: yArray[getRandomInt(yArray.length)],
    };
    if (
      this.center.x === pirate.center.x - this.size.x / 2 &&
      this.center.y === pirate.center.y - this.size.y / 2
    ) {
      this.getRandomPosition(gameSize, pirate);
    }
  }
}
// top left
// x: gameSize.x * 0.25 + this.size.x * 1.5,
// y: gameSize.y * 0.25 + this.size.y * 1.5,
// top center
// x: gameSize.x * 0.5 - this.size.x/2,
// y: gameSize.y * 0.25 + this.size.y * 1.5,
//  top right
// x: gameSize.x * 0.75 - this.size.x * 2.5,
// y: gameSize.y * 0.25 + this.size.y * 1.5,
// middle left
// x: gameSize.x * 0.25 + this.size.x * 1.5,
// y: gameSize.y * 0.5 - this.size.y / 2,
// middle center
// x: gameSize.x * 0.5 - this.size.x/2,
// y: gameSize.y * 0.5 - this.size.y / 2,
// middle right
// x: gameSize.x * 0.75 - this.size.x * 2.5,
// y: gameSize.y * 0.5 - this.size.y / 2,
// bottom left
// x: gameSize.x * 0.25 + this.size.x * 1.5,
// y: gameSize.y * 0.75 - this.size.y * 2.5,
// bottom center
// x: gameSize.x * 0.5 - this.size.x/2,
// y: gameSize.y * 0.75 - this.size.y * 2.5,
// bottom right
// x: gameSize.x * 0.75 - this.size.x * 2.5,
// y: gameSize.y * 0.75 - this.size.y * 2.5,

class CannonBall {
  constructor(gameSize) {
    this.size = { x: gameSize.x / 20, y: gameSize.y / 20 };
    this.getRandomPosition(gameSize);
  }
  getRandomPosition(gameSize) {
    let positionArray = [
      { x: gameSize.x * 0.25 + this.size.x * 1.5, y: 0, direction: "down" },
      { x: gameSize.x * 0.5 - this.size.x / 2, y: 0, direction: "down" },
      { x: gameSize.x * 0.75 - this.size.x * 2.5, y: 0, direction: "down" },
      {
        x: gameSize.x - this.size.x,
        y: gameSize.y * 0.25 + this.size.y * 1.5,
        direction: "left",
      },
      {
        x: gameSize.x - this.size.x,
        y: gameSize.y * 0.5 - this.size.y / 2,
        direction: "left",
      },
      {
        x: gameSize.x - this.size.x,
        y: gameSize.y * 0.75 - this.size.y * 2.5,
        direction: "left",
      },
      {
        x: gameSize.x * 0.75 - this.size.x * 2.5,
        y: gameSize.y - this.size.y,
        direction: "up",
      },
      {
        x: gameSize.x * 0.5 - this.size.x / 2,
        y: gameSize.y - this.size.y,
        direction: "up",
      },
      {
        x: gameSize.x * 0.25 + this.size.x * 1.5,
        y: gameSize.y - this.size.y,
        direction: "up",
      },
      { x: 0, y: gameSize.y * 0.75 - this.size.y * 2.5, direction: "right" },
      { x: 0, y: gameSize.y * 0.5 - this.size.y / 2, direction: "right" },
      { x: 0, y: gameSize.y * 0.25 + this.size.y * 1.5, direction: "right" },
    ];
    this.center = positionArray[getRandomInt(positionArray.length)];
  }
  //   update(cannonball){
  //     if(cannonball.center.direction === "right"){this.center.x++}
  //     if(direction === "left"){this.center.x--}
  //     if(direction === "up"){this.center.y--}
  //     if(direction === "down"){this.center.y++}
  // }
}
function colliding (pirate, cannonBall) {
  return !(
    pirate === cannonBall ||
        pirate.center.x + pirate.size.x / 2 < cannonBall.center.x - cannonBall.size.x / 2 ||
        pirate.center.y + pirate.size.y / 2 < cannonBall.center.y - cannonBall.size.y / 2 ||
        pirate.center.x - pirate.size.x / 2 > cannonBall.center.x + cannonBall.size.x / 2 ||
        pirate.center.y - pirate.size.y / 2 > cannonBall.center.y + cannonBall.size.y / 2
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let game = new Game();

Keyboarder.on(Keyboarder.KEYS.RIGHT, function () {
  if (game.pirate.center.x < 325) game.pirate.center.x += 75;
});
Keyboarder.on(Keyboarder.KEYS.LEFT, function () {
  if (game.pirate.center.x > 175) game.pirate.center.x -= 75;
});
Keyboarder.on(Keyboarder.KEYS.UP, function () {
  if (game.pirate.center.y > 175) game.pirate.center.y -= 75;
});
Keyboarder.on(Keyboarder.KEYS.DOWN, function () {
  if (game.pirate.center.y < 325) game.pirate.center.y += 75;
});
