Drag.Flick = new Class({
  Extends: Drag,

  constants: { 
    sampleFrequency: 50,
    sensitivity: 0.3
  },

  initialize: function() {
    this.options.friction = 0.1;
    this.options.bounce = 0;
    
    this.parent.apply(this, arguments);

    this.addEvent('snap', function(el) {
      this.sampleHandle = this.sample.periodical(1000 / this.constants.sampleFrequency, this);
    });
  },

  start: function(event) {
    if (this.pusher) this.pusher.cancel();

    this.parent(event);

    this.samples = {};
    this.speed = {'x': 0, 'y': 0};
  },

  stop: function(event) {
    function makeObject(prototype) {
      function F() {};
      F.prototype = prototype;
      return new F();
    }
    this.parent(event);
    $clear(this.sampleHandle);
    if (this.options.invert) {
      this.speed.x *= -1;
      this.speed.y *= -1;
    }
    if (this.speed.x || this.speed.y) {
      var options = makeObject(this.options);
      options.onComplete = this.fireEvent.bind(this, 'moveEnd');
      this.pusher = new Fx.Push(this.element, options).start(this.speed.x, this.speed.y);
    } else {
      this.fireEvent('moveEnd');
    }
  },

  sample: function() {
    this.samples.last = this.samples.current;
    this.samples.current = $merge({time: $time()}, this.mouse.now);
    if (this.samples.last) {
      var dt = this.samples.current.time - this.samples.last.time;
      var dx = this.samples.current.x - this.samples.last.x;
      var dy = this.samples.current.y - this.samples.last.y;
      var s = this.constants.sensitivity;
      var rs = 1 - s;
      this.speed.x = this.speed.x * rs + (dx / dt) * s;
      this.speed.y = this.speed.y * rs + (dy / dt) * s;
    }
  }

});
