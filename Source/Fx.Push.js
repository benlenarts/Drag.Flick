/*
---
description: provides the Fx.Push class for a decelerating motion given a start speed.

license: MIT-style

authors:
- Ben Lenarts

requires:
- core/1.2.4: [Fx, Element.Style]

provides: [Fx.Push]

credits:
  Q42 (http://q42.nl), for allowing me to release this code as open-source

...
*/

Fx.Push = new Class({

  Extends: Fx,

  options: {
    style: true,
    modifiers: { x: 'left', y: 'top' },
    friction: 0,
    limit: false,
    bounce: 0
	},

  initialize: function(element, options) {
    this.element = document.id(element);
    this.parent(options);
  },

  start: function(sx, sy) {
    var m = this.options.modifiers;
    this.position = {x: (this.options.style ? this.element.getStyle(m.x) : this.element[m.x]).toInt(),
                     y: (this.options.style ? this.element.getStyle(m.y) : this.element[m.y]).toInt()};
    this.speed = {x: sx, y: sy};
    this.time = 0;
    this.startTimer();
    this.onStart();
    this.lastStepTime = this.time;
    return this;
  },

  step: function() {
    var s = this.speed;
    var time = $time();
    var isDone = this.options.friction ? (Math.abs(s.x) + Math.abs(s.y)) < 0.001 : (time > this.time + this.options.duration);

    if (isDone) { 
      this.complete();
      return;
    }

    // decelerate
    if (this.options.friction) {
      var multiplier = 1 - this.options.friction;
      s.x *= multiplier;
      s.y *= multiplier;
    }

    // move
    var interval = time - this.lastStepTime;
    var p = this.position;
    p.x += this.speed.x * interval;
    p.y += this.speed.y * interval;

    // bounce?
    if (this.options.limit) {
      var l = this.options.limit;
      var b = this.options.bounce;
      if      (p.x < l.x[0]) { p.x = l.x[0]; s.x = b * -s.x; }
      else if (p.x > l.x[1]) { p.x = l.x[1]; s.x = b * -s.x; }
      if      (p.y < l.y[0]) { p.y = l.y[0]; s.y = b * -s.y; }
      else if (p.y > l.y[1]) { p.y = l.y[1]; s.y = b * -s.y; }
    }

    // update DOM
    for (var z in this.options.modifiers){
      var modifier = this.options.modifiers[z];
      if (!modifier) continue;
      var value = this.position[z].toInt();
      if (this.options.style) this.element.setStyle(modifier, value);
      else this.element[modifier] = value;
    }

    this.lastStepTime = time;
  }
});
