import P5 from 'p5';
import LIL from 'lil-gui'

const points = [];

let r;
let g;
let b;

let alpha;

let image;
let canvas;
let input;
let slider;
let slider2;
let slider4;
let slider5;
let slider3;
let button;
let isWaving;

const sketch = (p5: P5) => {
  function lines() {
    for (let x = 0; x < points.length; x++) {
      //r = p5.map(Math.abs(points[x].x - p5.width / 2), 0, 720, 255, 0);
      r = slider2.value()*25.5;
      g = slider4.value()*25.5; //map(points[x].x, 0, width, 0, 255)
      b = slider5.value()*25.5;
      //b = p5.map(p5.sin(p5.random(360)), -1, 1, 0, 255);
      alpha = slider.value();
      const c = image.get(points[x].x, points[x].y);
      const cwhite = (p5.red(c) + p5.green(c) + p5.blue(c)) ;
      const ct = image.get(points[x].x, points[x].y - 1);
      const ctwhite =
        (p5.red(ct) + p5.green(ct) + p5.blue(ct)) ;
      const cr = image.get(points[x].x + 1, points[x].y);
      const crwhite =
        (p5.red(cr) + p5.green(cr) + p5.blue(cr)) ;
      const cb = image.get(points[x].x, points[x].y + 1);
      const cbwhite =
        (p5.red(cb) + p5.green(cb) + p5.blue(cb)) ;
      const cl = image.get(points[x].x - 1, points[x].y);
      const clwhite =
        (p5.red(cl) + p5.green(cl) + p5.blue(cl)) ;
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
      p5.ellipse(points[x].x, points[x].y, image.width / slider3.value());
    }
  }

  function wave() {
    for (let x = 0; x < image.height; x++) {
      points[x].y =
        points[x].y +
        (Math.round(10 * p5.sin(points[x].x / 20)) % image.height);
    }
  }

  p5.setup = () => {
    function createCanvas() {
      canvas = p5.createCanvas(image.width + 200, image.height);
      canvas.parent('canvas-container');
      p5.background(0);
      p5.angleMode(p5.DEGREES);
      p5.noiseDetail(1, 1);
      p5.frameRate(24);

      const density = 80;
      const space = p5.width / density;

      for (let i = 0; i < image.width; i += space) {
        for (let j = 0; j < image.height; j += space) {
          const p = p5.createVector(
            i + p5.random(-10, 10),
            j + p5.random(-10, 10),
          );
          points.push(p);
        }
      }

      slider = p5.createSlider(0, 255, 255, 1);
      slider.position(image.width + 250, 50);
      slider.style('width', '130px');

      slider2 = p5.createSlider(0, 10 , 3, 1);
      slider2.position(image.width + 250, 100);
      slider2.style('width', '130px');

      slider4 = p5.createSlider(0, 10 , 3, 1);
      slider4.position(image.width + 250, 150);
      slider4.style('width', '130px');

      slider5 = p5.createSlider(0, 10 , 3, 1);
      slider5.position(image.width + 250, 200);
      slider5.style('width', '130px');

      slider3 = p5.createSlider(100, 1000, 1000, 100);
      slider3.position(image.width + 250, 250);
      slider3.style('width', '130px');

      button = p5.createButton('Wave');
      button.position(image.width + 250, 300);
      button.mousePressed(() => {
        isWaving = !isWaving;
      });
    }

    function handleFile(file) {
      if (file.type === 'image') {
        image = p5.loadImage(file.data, () => {
          createCanvas();
        });
      } else {
        image = null;
      }
    }

    input = p5.createFileInput(handleFile);
    input.position(0, 0);
  };

  p5.draw = () => {
    p5.noStroke();
    lines();
    if (isWaving) {
      wave();
    }
  };
};

document.addEventListener('DOMContentLoaded', () => {
  new P5(sketch);
});