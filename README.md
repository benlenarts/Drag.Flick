Drag.Flick
==========

Drag extension that adds momentum to the dragged object: after the object is released it decelerates instead of stopping immediately. This mimics the flick gesture of certain popular touch interfaces. 

Thanks to Drag's versatile design, this can also be used to make elements scroll like butter.

How to use
----------

Simply instantiate `Drag.Flick` where you would normally use `Drag`:

	#JS
	var myDrag = new Drag.Flick('anElement');

This extension inherits all the options and events from Drag and adds the following: 

  - **friction**: controls how fast the object will decelerate after it's been released (default: 0.1)
  - **bounce**: controls how much the object will 'bounce' off the drag limits after it's been released (default: 0)
  - **onMoveEnd**: Executed when the dragged element comes to a full stop.

