/*
===============================================================================

	Class defines player.

===============================================================================
*/
function Player() {
	if ( !(this instanceof Player) ) return new Player();

	this.isActive  = false;
	this.mouseLook = false;

	this.mouseX = 0;
	this.mouseY = 0;

	// camera
	// target
}

/*
================
onKeyDown
	Handles key down event, when player is active.
================
*/
Player.prototype.onKeyDown = function ( code ) {
};

/*
================
onKeyUp
	Handles key up event, when player is active.
================
*/
Player.prototype.onKeyUp = function ( code ) {
};

/*
================
onMouseDown
	Handles mouse down event, when player is active.
================
*/
Player.prototype.onMouseDown = function ( code ) {
};

/*
================
onMouseUp
	Handles mouse up event, when player is active.
================
*/
Player.prototype.onMouseUp = function ( code ) {
};

/*
================
onMouseMove
	Handles mouse movement and updates mouse coordinates.
================
*/
Player.prototype.onMouseMove = function ( event ) {
};

/*
================
onWheel
	Handles mouse wheel scroll.
================
*/
Player.prototype.onWheel = function ( event ) {
};

/*
================
animate
	Animates player actions, depending on time delta.
================
*/
Player.prototype.animate = function ( delta ) {
};
