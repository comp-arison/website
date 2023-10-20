const scale = 5;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var speed = urlParams.get('speed');
if (speed == null) {
  if (!!window.chrome) {
    speed = 30;
  } else {
    speed = 10;
  }
}
//var text = urlParams.get('text');
//document.getElementById("text").innerHTML = text;
//var refresh = urlParams.get('refresh');
var refresh = null;

var canvas = document.getElementById("screen");
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
var ctx = canvas.getContext("2d");

function makeArray(w, h, val) {
  var arr = [];
  for(let i = 0; i < h; i++) {
    arr[i] = [];
    for(let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

function generate(chance) { // chance = percent chance of a cell being filled
  for (var y = 1; y < grid.length - 1; y++) {
    for (var x = 1; x < grid[y].length - 1; x++) {
      grid[y][x] = Math.random() < chance;
    }
  }
}

var grid = makeArray(canvas.width / scale, canvas.height / scale, false);
var newgrid = makeArray(canvas.width / scale, canvas.height / scale, false);
generate(Math.random() * 0.2 + 0.15);


var mousex = 0;
var mousey = 0;
var drawcell = true;
var mousedown = false;
var pause = false;
canvas.onmousemove = function(e) {
  mousex = e.clientX - this.getBoundingClientRect().left;
  mousey = e.clientY - this.getBoundingClientRect().top;
};
canvas.onmousedown = function(e) {
  mousedown = true;
  drawcell = !grid[Math.floor(mousey / scale)][Math.floor(mousex / scale)];
};
canvas.onmouseup = function(e) {
  mousedown = false;
};

document.addEventListener('keydown', function(event) {
  if (event.code == "Space") {
    pause = !pause;
  }
  if (event.code == "Backspace") {
    generate(0);
  }
  if (event.code == "KeyR") {
    generate(Math.random() * 0.2 + 0.15);
  }
});


var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var frame = 0;
function mainloop() {
  frame++;
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
  if (canvas.width != canvas.parentElement.clientWidth || canvas.height != canvas.parentElement.clientHeight) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    grid = makeArray(canvas.width / scale, canvas.height / scale, false);
    newgrid = makeArray(canvas.width / scale, canvas.height / scale, false);
    generate(Math.random() * 0.2 + 0.15);
  }
  if (frame % speed == 0 && !pause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (refresh != null && frame % (speed * refresh) == 0) {
      generate(Math.random() * 0.2 + 0.15);
    }
    for (var y = 1; y < grid.length - 1; y++) {
      for (var x = 1; x < grid[y].length - 1; x++) {
        var neighbors = 0;
        if (grid[y-1][x-1]) {neighbors++;}
        if (grid[y-1][x]) {neighbors++;}
        if (grid[y-1][x+1]) {neighbors++;}
        if (grid[y][x+1]) {neighbors++;}
        if (grid[y+1][x+1]) {neighbors++;}
        if (grid[y+1][x]) {neighbors++;}
        if (grid[y+1][x-1]) {neighbors++;}
        if (grid[y][x-1]) {neighbors++;}
        /*if (grid[y][x]) {
          if (neighbors <= 1 || neighbors >= 4) {
            newgrid[y][x] = false;
          } else {
            newgrid[y][x] = grid[y][x];
          }
        } else {
          if (neighbors == 3) {
            newgrid[y][x] = true;
          } else {
            newgrid[y][x] = grid[y][x];
          }
        }*/
        if (neighbors == 0) {newgrid[y][x] = false;}
        if (neighbors == 1) {newgrid[y][x] = false;}
        if (neighbors == 2) {newgrid[y][x] = grid[y][x];}
        if (neighbors == 3) {newgrid[y][x] = true;}
        if (neighbors == 4) {newgrid[y][x] = false;}
        if (neighbors == 5) {newgrid[y][x] = false;}
        if (neighbors == 6) {newgrid[y][x] = false;}
        if (neighbors == 7) {newgrid[y][x] = false;}
        if (neighbors == 8) {newgrid[y][x] = false;}
        if (neighbors > 8) {console.log("WARNING: Cell has " + neighbors + " neighbors????");}
      }
    }
    for (var y = 1; y < grid.length - 1; y++) {
      for (var x = 1; x < grid[y].length - 1; x++) {
        grid[y][x] = newgrid[y][x];
      }
    }
  }
  
  if (mousedown) {
    //console.log(mousex / scale + " " + mousey / scale);
    grid[Math.floor(mousey / scale)][Math.floor(mousex / scale)] = drawcell;
  }
  
  ctx.fillStyle = "white";
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        ctx.fillRect(x * scale, y * scale, scale, scale);
      } else {
        ctx.clearRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime += (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;
  setTimeout(mainloop, Math.max(frameTime, 1) / 1000);
}
mainloop();