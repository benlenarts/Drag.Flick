Drag.Flick
==========

Drag extension that adds momentum to the dragged object: after the object is released it decelerates instead of stopping immediately. This mimics the flick gesture of certain popular touch interfaces. 

How to use
----------

Simply instantiate `Drag.Flick` where you would normally use `Drag`:

	#JS
	var myDrag = new Drag.Flick('anElement');

This extension adds the following options and events: 

  - **friction**: controls how fast the object will decelerate after it's released
  - **bounce**: controls how much the object will 'bounce' off the drag limits after it's released
  - **onMoveEnd**: Executed when the dragged element comes to a full stop.

