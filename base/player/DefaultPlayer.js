/*
===============================================================================

    Class defines default player with modified third person look.

===============================================================================
*/
function DefaultPlayer() {
    if ( !(this instanceof DefaultPlayer) ) {
        return new DefaultPlayer();
    }
    DefaultPlayer.super.constructor.call( this );
}

extend( DefaultPlayer, Player );

/*
================
onKeyDown
    Handles key down event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyDown = function ( code ) {
};

/*
================
onKeyUp
    Handles key up event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyUp = function ( code ) {
};

/*
================
onMouseDown
    Handles mouse down event, when player is active.
================
*/
DefaultPlayer.prototype.onMouseDown = function ( code ) {
};

/*
================
onMouseUp
    Handles mouse up event, when player is active.
================
*/
DefaultPlayer.prototype.onMouseUp = function ( code ) {
};

/*
================
onMouseMove
    Handles mouse movement and updates mouse coordinates.
================
*/
DefaultPlayer.prototype.onMouseMove = function ( event ) {
};

/*
================
animate
    Animates player actions, depending on time delta.
================
*/
DefaultPlayer.prototype.animate = function ( delta ) {
};
