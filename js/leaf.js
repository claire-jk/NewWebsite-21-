var SAKURA_COUNT = 30;
var IMAGE_URL = './image/leaf.png'; // 替換成櫻花瓣圖

var canvas = document.getElementById('leaf');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var _ctx = canvas.getContext('2d');
var IMG_SIZE = 24;

var _img = new Image();
_img.src = IMAGE_URL;
_img.onload = play;

var _sakuras = [];
var windRoots = [];

function setup() {
  addSakura();
  canvas.addEventListener('mousemove', function(e) {
    windRoots.push({x: e.clientX, y: e.clientY, rest:0});
  });
}
setup();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function draw(){
  _ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i=0; i < _sakuras.length; ++i) {
    fall(_sakuras[i]);
  }
  drawSakuras();
}

function getKyori(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getNearWindRoot(sakura) {
  var wind = null;
  var kyoriMin = 100;
  for (var i=0; i < windRoots.length; ++i) {
    var w = windRoots[i];
    var kyori = getKyori(w.x, w.y, sakura.x, sakura.y);
    if (kyori < kyoriMin) {
      wind = w;
      kyoriMin = kyori;
    }
  }
  return wind;
}

function fall(sakura) {
  // 櫻花旋轉
  sakura.rotationZ += sakura.rotationVz + Math.random() * 3;
  sakura.rotationX += sakura.rotationVx + Math.random() * 2;

  // 飄落速度
  var vx = sakura.vx + Math.sin(sakura.rotationZ * Math.PI / 180) * 0.2;
  var vy = sakura.vy + Math.cos(sakura.rotationX * Math.PI / 180) * 0.2;

  // 鼠標互動風向
  var w = getNearWindRoot(sakura);
  if (w) {
    var kyori = getKyori(w.x, w.y, sakura.x, sakura.y);
    if (kyori <= 0) {
      vx += 2;
    } else {
      vx += (sakura.x - w.x) / kyori * 0.5;
      vy += (sakura.y - w.y) / kyori * 0.5;
    }
  }

  sakura.x += vx;
  sakura.y += vy;

  // 花瓣從上方重置
  if(sakura.y > canvas.height) {
    sakura.y = -IMG_SIZE;
    sakura.x = Math.random() * canvas.width;
  }

  // 縮放效果（3D感）
  var scale = 0.5 + (Math.random() * 0.5);
  sakura.scaleX = sakura.scaleY = scale;
}

function drawSakuras() {
  for (var i=0; i < _sakuras.length; ++i) {
    var s = _sakuras[i];

    _ctx.save();
    _ctx.translate(s.x, s.y);
    _ctx.scale(s.scaleX, s.scaleY);
    _ctx.rotate(s.rotationZ * Math.PI / 180);
    _ctx.globalAlpha = 0.8;
    _ctx.drawImage(_img, -IMG_SIZE/2, -IMG_SIZE/2, IMG_SIZE, IMG_SIZE);
    _ctx.restore();
  }
}

function addSakura() {
  for (var i=0; i < SAKURA_COUNT; ++i) {
    var sakura = {};
    sakura.scaleX = sakura.scaleY = Math.random() * 0.7 + 0.3;
    sakura.rotationX = Math.random() * 360;
    sakura.rotationZ = Math.random() * 360;
    sakura.x = Math.random() * canvas.width;
    sakura.y = Math.random() * canvas.height;
    sakura.vx = 0.1 + Math.random() * 0.3;
    sakura.vy = 0.5 + Math.random() * 0.5;
    sakura.rotationVx = Math.random() * 2;
    sakura.rotationVz = Math.random() * 2 + 0.5;

    _sakuras.push(sakura);
  }
}

function play(){
  setInterval(draw, 1000 / 60); // 60 FPS
}