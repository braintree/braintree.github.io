develop = true;

(function () {
  var entities;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.className = 'intro__canvas';
  document.getElementById('sectionIntro').appendChild(canvas);

  function initialize() {
    var dpi = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    entities = [];
    for (var z = 80; z > 2; z -= 2) {
      for (var x = -50; x < canvas.width; x += 900 / z) {
        entities.push(new Orb({
          x: x,
          z: z + (x / 500),
          periodOffset: x * 20
        }));
      }
    }
  }
  initialize();
  window.addEventListener('resize', initialize);

  function tick(t) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.forEach(function (entity) {
      entity.tick(t);
      entity.draw(context);
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function activateRandomOrb() {
    var ball = entities[Math.floor(Math.random() * entities.length)];
    ball.activate();

    setTimeout(activateRandomOrb, Math.random() * 1000);
  }
  setTimeout(activateRandomOrb, Math.random() * 1000);

  console.log(entities.length);
})();
