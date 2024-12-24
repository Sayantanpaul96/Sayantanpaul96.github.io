// canvas updation for particle effect.
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

// get mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 300) * (canvas.width / 300),
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  // method for individaul Particles.
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#1b1712bd";
    ctx.fill();
  }
  // check particle, mouse poistion. draw and move particles.
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    // collision detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 5;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 5;
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 5;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 5;
      }
    }
    // move particle
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function initialiseParticles() {
  particleArray = [];
  // reduce number of particles here.
  let numberOfParticles = (canvas.height * canvas.width) / 13000;

  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;

    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#1b1712bd";

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let xValue = particleArray[a].x - particleArray[b].x;
      let yValue = particleArray[a].y - particleArray[b].y;
      let distance = xValue * xValue + yValue * yValue;

      if (distance < (canvas.width / 10) * (canvas.height / 10)) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = "rgba(28, 26, 23," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }

  connect();
}

//resize event.
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 300) * (canvas.width / 300);
  initialiseParticles();
});

// mouse out event
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

initialiseParticles();
animate();
