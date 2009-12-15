Drag.Flick
==========

Drag extension that adds inertia to the movement after the object is released, similar to certain popular touch interfaces. 

How to use
----------

Simply replace `Drag` by `Drag.Flick`.

	#JS
	var myDrag = new Drag.Flick('anElement');

The options available are the same as those available to `Drag`, plus the following:

  - **friction**: controls how fast the object will decelerate after it's released
  - **bounce**: controls how much the object will 'bounce' off the drag limits after it's released

