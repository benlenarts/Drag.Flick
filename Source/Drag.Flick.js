/*
---
description: provides the Drag.Flick class which extends Drag by adding momentum to the dragged object.

license: MIT-style

authors:
- Ben Lenarts

requires:
- Fx.Push
- more/1.2.4.2: Drag

provides: [Drag.Flick]

credits:
  Q42 (http://q42.nl), for allowing me to release this code as open-source

...
*/

Drag.Flick = new Class({

  Extends: Drag,

  constants: { 
    sampleFrequency: 50,
    sensitivity: 0.3
  },

  options: {/*
    onMoveEnd: $empty(thisElement),*/
    friction: 0.1,
    bounce: 0
  },

  initialize: function(element, options) {
    this.parent(element, options);
    this.sliding = new Fx.Push(this.element, this.options);
    this.sliding.addEvent('complete', this.fireEvent.bind(this, 'moveEnd'));
    this.addEvent('snap', this.startSampling.bind(this));
  },

  start: function(event) {
    this.sliding.cancel();
    this.parent(event);
    this.samples = {};
    this.speed = {'x': 0, 'y': 0};
  },

  startSampling: function() {
    this.sampleHandle = this.sample.periodical(1000 / this.constants.sampleFrequency, this);
  },

  stop: function(event) {
    this.parent(event);
    $clear(this.sampleHandle);
    var s = this.speed;
    if (this.options.invert) { s.x *= -1; s.y *= -1; }
    this.sliding.start(this.speed.x, this.speed.y);
  },

  sample: function() {
    var ss = this.samples;
    ss.prev = ss.curr;
    ss.curr = $merge({time: $time()}, this.mouse.now);
    if (!ss.prev) return;

    var s = this.speed, dt = ss.curr.time - ss.prev.time, 
        sens = this.constants.sensitivity, sens1 = 1 - sens;
    s.x = ((ss.curr.x - ss.prev.x) / dt) * sens + s.x * sens1;
    s.y = ((ss.curr.y - ss.prev.y) / dt) * sens + s.y * sens1;
  }

});
