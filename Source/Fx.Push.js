/*
---
description: provides the Fx.Push class for a decelerating motion given a start speed.

license: MIT-style

authors:
- Ben Lenarts

requires:
  core/1.2.4: '*'
# actually:
# - core/1.2.4:[Fx, Element.Style]

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
    this.element = this.subject = $(element);
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
    var time = $time();

    if (this.options.friction) {
      if ((Math.abs(this.speed.x) + Math.abs(this.speed.y)) < 0.001) { 
        this.complete();
        return;
      }
    } else if (time > this.time + this.options.duration) {
      this.complete();
      return;
    } 

    if (this.options.friction) {
      var multiplier = 1 - this.options.friction;
      this.speed.x *= multiplier;
      this.speed.y *= multiplier;
    }

    var interval = time - this.lastStepTime;
    this.position.x += this.speed.x * interval;
    this.position.y += this.speed.y * interval;
    if (this.options.limit) {
      var l = this.options.limit;
      if      (this.position.x < l.x[0]) { this.position.x = l.x[0]; this.speed.x = this.options.bounce * -this.speed.x; }
      else if (this.position.x > l.x[1]) { this.position.x = l.x[1]; this.speed.x = this.options.bounce * -this.speed.x; }
      if      (this.position.y < l.y[0]) { this.position.y = l.y[0]; this.speed.y = this.options.bounce * -this.speed.y; }
      else if (this.position.y > l.y[1]) { this.position.y = l.y[1]; this.speed.y = this.options.bounce * -this.speed.y; }
    }
    for (var z in this.options.modifiers){
      var modifier = this.options.modifiers[z];
      if (!modifier) continue;
      this.element[this.options.style ? 'setStyle' : 'set'](modifier, this.position[z].toInt());
      var value = this.position[z].toInt();
      if (this.options.style) this.element.setStyle(modifier, value);
      else this.element[modifier] = value;
    }
    this.lastStepTime = time;
  }
});
 
