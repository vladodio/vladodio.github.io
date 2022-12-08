const sampling_rate = 0.001;

const line_width = 2;
const point_size = 32;
const line_color = "#c397d8";
const point_color = "#7aa6da";
const control_color = "#e78c45";

const canvas_color = 0;

// demo for 1 control points
function curve1(p) {
  var point;
  var isDragging = false;
  var currentPoint;

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    point = p.createVector(200, 200);
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      if (p.dist(p.mouseX, p.mouseY, point.x, point.y) < point_size) {
        isDragging = true;
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      point.x = p.mouseX;
      point.y = p.mouseY;
    }

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    p.ellipse(point.x, point.y, point_size, point_size);
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

// demo for 2 control points
function curve2(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    points.push(p.createVector(400, 0));
    points.push(p.createVector(0, 400));
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < point_size) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // draw the lines between the points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    p.noFill();
    p.beginShape();
    for (var i = 0; i < points.length; i++) {
      p.vertex(points[i].x, points[i].y);
    }
    p.endShape();

    // draw the points
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

function quadratic_bezier(cPoint1, cPoint2, cPoint3, t) {
  let a = (1 - t) ** 2 * cPoint1;
  let b = 2 * (1 - t) * t * cPoint2;
  let c = t ** 2 * cPoint3;
  return a + b + c;
}

function malformed_quadratic_bezier(cPoint1, cPoint2, cPoint3, t) {
  let a = (1 - t) ** 2 * cPoint1;
  let b = (1 - t) * t * cPoint2;
  let c = t ** 2 * cPoint3;
  return a + b + c;
}

// demo for 3 control points
function curve3(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(200, 200));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = quadratic_bezier(points[0].x, points[1].x, points[2].x, t);
      var y = quadratic_bezier(points[0].y, points[1].y, points[2].y, t);
      curvePoints.push(p.createVector(x, y));
    }

    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item);
    });

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      if (i == 0 || i == points.length - 1) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

// demo for 3 control points INCORRECT
function incorrect_curve3(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(200, 200));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = malformed_quadratic_bezier(
        points[0].x,
        points[1].x,
        points[2].x,
        t
      );
      var y = malformed_quadratic_bezier(
        points[0].y,
        points[1].y,
        points[2].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }

    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item);
    });

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      if (i == 0 || i == points.length - 1) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

function cubic_bezier(cPoint1, cPoint2, cPoint3, cPoint4, t) {
  let a = (1 - t) ** 3 * cPoint1;
  let b = 3 * (1 - t) ** 2 * t * cPoint2;
  let c = 3 * (1 - t) * t ** 2 * cPoint3;
  let d = t ** 3 * cPoint4;
  return a + b + c + d;
}

// demo for 4 control points
function curve4(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(133, 266));
    points.push(p.createVector(266, 133));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = cubic_bezier(
        points[0].x,
        points[1].x,
        points[2].x,
        points[3].x,
        t
      );
      var y = cubic_bezier(
        points[0].y,
        points[1].y,
        points[2].y,
        points[3].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }

    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item);
    });

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      if (i == 0 || i == points.length - 1) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

function beyond_cubic_bezier(cPoint1, cPoint2, cPoint3, cPoint4, cPoint5, t) {
  let a = (1 - t) ** 4 * cPoint1;
  let b = 4 * (1 - t) ** 3 * t * cPoint2;
  let c = 6 * (1 - t) ** 2 * t ** 2 * cPoint3;
  let d = 4 * (1 - t) * t ** 3 * cPoint4;
  let e = t ** 4 * cPoint5;
  return a + b + c + d + e;
}

// demo for 5 control points
function curve5(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(100, 300));
    points.push(p.createVector(200, 200));
    points.push(p.createVector(300, 100));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = beyond_cubic_bezier(
        points[0].x,
        points[1].x,
        points[2].x,
        points[3].x,
        points[4].x,
        t
      );
      var y = beyond_cubic_bezier(
        points[0].y,
        points[1].y,
        points[2].y,
        points[3].y,
        points[4].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }

    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item);
    });

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      if (i == 0 || i == points.length - 1) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}


// demo for quadratic spline
function spline(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);
    p.stroke("#f22");

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(100, 300));
    points.push(p.createVector(200, 200));
    points.push(p.createVector(300, 100));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);
    p.stroke("#f22");

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = quadratic_bezier(
        points[0].x,
        points[1].x,
        points[2].x,
        t
      );
      var y = quadratic_bezier(
        points[0].y,
        points[1].y,
        points[2].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = quadratic_bezier(
        points[2].x,
        points[3].x,
        points[4].x,
        t
      );
      var y = quadratic_bezier(
        points[2].y,
        points[3].y,
        points[4].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }

    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item)
    })

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
   	  if (i == 0 || i == points.length - 1 || i==2) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}

// demo for cubic spline
function spline2(p) {
  var points = [];
  var isDragging = false;
  var currentPoint;
  var curvePoints = [];

  p.setup = function () {
    p.createCanvas(Math.min(800, window.innerWidth) - 6, 400);
    p.stroke("#f22");

    // create some points
    points.push(p.createVector(0, 400));
    points.push(p.createVector(100, 300));
    points.push(p.createVector(150, 250));
    points.push(p.createVector(200, 200));
    points.push(p.createVector(250, 150));
    points.push(p.createVector(300, 100));
    points.push(p.createVector(400, 0));
  };

  p.draw = function () {
    p.background(canvas_color);
    p.stroke("#f22");

    // check if the mouse is pressed and if it is over a point
    if (p.mouseIsPressed) {
      for (var i = 0; i < points.length; i++) {
        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 10) {
          isDragging = true;
          currentPoint = points[i];
          break;
        }
      }
    }

    // update the position of the current point if it is being dragged
    if (isDragging) {
      currentPoint.x = p.mouseX;
      currentPoint.y = p.mouseY;
    }

    // calculate the curve points
    curvePoints = [];
    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = cubic_bezier(
        points[0].x,
        points[1].x,
        points[2].x,
        points[3].x,
        t
      );
      var y = cubic_bezier(
        points[0].y,
        points[1].y,
        points[2].y,
        points[3].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }

    for (var t = 0; t <= 1; t += sampling_rate) {
      var x = cubic_bezier(
        points[3].x,
        points[4].x,
        points[5].x,
        points[6].x,
        t
      );
      var y = cubic_bezier(
        points[3].y,
        points[4].y,
        points[5].y,
        points[6].y,
        t
      );
      curvePoints.push(p.createVector(x, y));
    }


    // draw the bezier curve between the first and last points
    p.stroke(line_color);
    p.strokeWeight(line_width);
    curvePoints.forEach((item) => {
      p.point(item)
    })

    // draw the points
    p.stroke(point_color);
    p.fill(0);
    for (var i = 0; i < points.length; i++) {
      if (i == 0 || i == points.length - 1 || i == 3) p.stroke(point_color);
      else p.stroke(control_color);
      p.ellipse(points[i].x, points[i].y, point_size, point_size);
    }
  };

  // stop dragging the current point when the mouse is released
  p.mouseReleased = function () {
    isDragging = false;
  };
}


// create a new instance of the p5 library with the sketch function
let my_pp = new p5(curve1, "curve1");
let my_pp2 = new p5(curve2, "curve2");
let my_pp3 = new p5(curve3, "curve3");
let my_pp4 = new p5(incorrect_curve3, "incorrect_curve3");
let my_pp5 = new p5(curve4, "curve4");
let my_pp6 = new p5(curve5, "curve5");

let my_pp7 = new p5(spline, "spline")
let my_pp8 = new p5(spline2, "spline2")
let my_pp9 = new p5(curve4, "Cubic_demo2");