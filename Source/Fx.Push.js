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
    this.position = {};
  },

  start: function(sx, sy) {
    var m = this.options.modifiers, p = this.position, s = this.options.style;
    for (d in m) if (m[d]) this.position[d] = (s ? this.element.getStyle(m[d]) : this.element[m[d]]).toInt();
    this.speed = {x: sx||0, y: sy||0};
    this.time = 0;
    this.startTimer();
    this.onStart();
    this.lastStepTime = this.time;
    return this;
  },

  step: function() {
    var s = this.speed, time = $time();
    var isDone = this.options.friction ? (Math.abs(s.x) + Math.abs(s.y)) < 0.001 : (time > this.time + this.options.duration);
    if (isDone) { 
      this.complete();
      return;
    }

    // decelerate
    var multiplier = 1 - this.options.friction;
    for (d in s) s[d] *= multiplier;

    // move
    var interval = time - this.lastStepTime, p = this.position;
    for (d in p) p[d] += this.speed[d] * interval;

    // limit & bounce
    if (this.options.limit) {
      var l = this.options.limit;
      var b = this.options.bounce;
      for (d in p) {
        if      (p[d] < l[d][0]) { p[d] = l[d][0]; s[d] = b * -s[d]; }
        else if (p[d] > l[d][1]) { p[d] = l[d][1]; s[d] = b * -s[d]; }
      }
    }

    // update DOM
    for (var z in p) {
      var modifier = this.options.modifiers[z];
      if (!modifier) continue;
      var value = p[z].toInt();
      if (this.options.style) this.element.setStyle(modifier, value);
      else this.element[modifier] = value;
    }

    this.lastStepTime = time;
  }
});
