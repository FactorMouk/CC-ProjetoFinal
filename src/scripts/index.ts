import P5 from 'p5';

//Defining Sketch Draw
// const sketch = (p5: P5) => {
//   let image;

//   p5.preload = () => {
//     image = p5.loadImage(
//       'src/assets/image.png',
//       () => console.log('carregou'),
//       (error) => console.log(error),
//     );
//   };

//   p5.setup = () => {
//     const canvas = p5.createCanvas(768, 768);
//     canvas.parent('canvas-container');
//     console.log(image);
//     image.loadPixels();
//     for (let t = 0; t < 100; t += 0.01) {
//       const x = p5.width * p5.noise(t);
//       const y = p5.height * p5.noise(t + 5);
//       const r = 255 * p5.noise(t + 10);
//       const g = 255 * p5.noise(t + 15);
//       const b = 255 * p5.noise(t + 20);

//       p5.noStroke();
//       p5.fill(r, g, b);
//       p5.ellipse(x, y, p5.random(255), p5.random(255));
//     }
//     for (let t = 0; t < 100; t += 0.01) {
//       const r = 255 * p5.noise(t + 10);
//       const g = 255 * p5.noise(t + 15);
//       const b = 255 * p5.noise(t + 20);

//       p5.noStroke();
//       p5.fill(r, g, b);
//       p5.rect(p5.random(p5.width), p5.random(p5.height), 0.5, 0.5);
//     }
//     p5.noStroke();
//     for (let i = 0; i < 100000; i++) {
//       p5.fill(p5.random(255), p5.random(255), p5.random(255), p5.random(255));
//       p5.ellipse(
//         p5.random(p5.windowWidth),
//         p5.random(p5.windowHeight),
//         p5.random(100),
//       );
//     }
//     for (let t = 0; t < 100; t += 1) {
//       const x1 = p5.width * p5.random(t + 15);
//       const x2 = p5.width * p5.random(t + 25);
//       const x3 = p5.width * p5.random(t + 35);
//       const x4 = p5.width * p5.random(t + 45);
//       const y1 = p5.height * p5.random(t + 55);
//       const y2 = p5.height * p5.random(t + 65);
//       const y3 = p5.height * p5.random(t + 75);
//       const y4 = p5.height * p5.random(t + 85);

//       const r = 255 * p5.random(t + 10);
//       const g = 255 * p5.random(t + 15);
//       const b = 255 * p5.random(t + 20);

//       p5.stroke(r, g, b);

//       p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
//     }
//     for (let t = 0; t < 100; t += 0.005) {
//       const x1 = p5.width * p5.noise(t + 15);
//       const x2 = p5.width * p5.noise(t + 25);
//       const x3 = p5.width * p5.noise(t + 35);
//       const x4 = p5.width * p5.noise(t + 45);
//       const y1 = p5.height * p5.noise(t + 55);
//       const y2 = p5.height * p5.noise(t + 65);
//       const y3 = p5.height * p5.noise(t + 75);
//       const y4 = p5.height * p5.noise(t + 85);

//       const r = 255 * p5.noise(t + 10);
//       const g = 255 * p5.noise(t + 15);
//       const b = 255 * p5.noise(t + 20);

//       p5.stroke(r, g, b);

//       p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
//     }
//     for (let x = 0; x < p5.width; x += 1) {
//       for (let y = 0; y < p5.height; y += 1) {
//         const c = 255 * p5.noise(0.001 * x, 0.001 * y);
//         p5.noStroke();
//         p5.fill(c, p5.random(255));
//         p5.rect(x, y, 0.5, 0.5);
//       }
//     }
//   };

//   p5.draw = () => {};
// };

// document.addEventListener('DOMContentLoaded', () => {
//   new P5(sketch);
// });

const points = [];
let count = 0;

let r;
let g;
let b;

let alpha;

let image;

const sketch = (p5: P5) => {
  p5.preload = () => {
    image = p5.loadImage(
      'src/assets/image.png',
      () => console.log('carregou'),
      (error) => console.log(error),
    );
  };
  p5.setup = () => {
    const canvas = p5.createCanvas(image.width, image.height);
    canvas.parent('canvas-container');
    p5.background(255);
    p5.angleMode(p5.DEGREES);
    p5.noiseDetail(1, 1);

    const density = 80;
    const space = p5.width / density;

    for (let i = 0; i < p5.width; i += space) {
      for (let j = 0; j < p5.height; j += space) {
        const p = p5.createVector(
          i + p5.random(-10, 10),
          j + p5.random(-10, 10),
        );
        points.push(p);
      }
    }
  };
  p5.draw = () => {
    function linhazinha() {
      for (let x = 0; x < points.length; x++) {
        r = p5.map(Math.abs(points[x].x - p5.width / 2), 0, 720, 255, 0);
        g = 100; //map(points[x].x, 0, width, 0, 255)
        b = p5.map(p5.sin(p5.random(360)), -1, 1, 0, 255);
        alpha = p5.map(
          p5.dist(p5.width / 2, p5.height / 2, points[x].x, points[x].y),
          229,
          0,
          255,
          0,
        );
        const c = image.get(points[x].x, points[x].y);
        const cwhite = (p5.red(c) + p5.green(c) + p5.blue(c)) / 3;
        const ct = image.get(points[x].x, points[x].y - 1);
        const ctwhite = (p5.red(ct) + p5.green(ct) + p5.blue(ct)) / 3;
        const cr = image.get(points[x].x + 1, points[x].y);
        const crwhite = (p5.red(cr) + p5.green(cr) + p5.blue(cr)) / 3;
        const cb = image.get(points[x].x, points[x].y + 1);
        const cbwhite = (p5.red(cb) + p5.green(cb) + p5.blue(cb)) / 3;
        const cl = image.get(points[x].x - 1, points[x].y);
        const clwhite = (p5.red(cl) + p5.green(cl) + p5.blue(cl)) / 3;
        const edge = Math.max(
          cwhite - ctwhite,
          cwhite - crwhite,
          cwhite - cbwhite,
          cwhite - clwhite,
        );
        const angle = p5.map(edge, 0, 255, 0, 720);
        points[x].add(p5.createVector(p5.cos(angle), p5.sin(angle)));
        if (x == 10) {
          p5.fill(23);
          p5.ellipse(points[x - 10].x, points[x - 10].y, image.width / 1000);
        }
        p5.fill(
          (cwhite + 3 * r) / 4,
          (cwhite + 3 * g) / 4,
          (cwhite + 3 * b) / 4,
          alpha,
        );
        p5.ellipse(points[x].x, points[x].y, image.width / 1000);
      }
    }
    p5.noStroke();
    if (count < 100) {
      linhazinha();
      count++;
    }
  };
};

document.addEventListener('DOMContentLoaded', () => {
  new P5(sketch);
});
