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

	this.f_view   = 0; // as a flags variable in the PlaneTarget
	this.f_scroll = 0; // first four bits of the flags

	// !@ view can be also controlled by the wheel and rmb.

	this.camera = new THREE.PerspectiveCamera( DOA.Settings.fov,
											   DOA.Settings.aspect(),
											   DOA.Settings.minView,
											   DOA.Settings.maxView );
	this.target = new DOA.Objects.PlaneTarget( this.camera );

	// Init position
	this.target.look();
}

extend( DefaultPlayer, Player );

/*
================
onKeyDown
	Handles key down event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyDown = function ( code ) {
	if ( !this.isActive ) return code;
	switch ( code ) {
		case DOA.Controls.arrowup:     // ↑
			this.f_view |= 1;
			break;
		case DOA.Controls.arrowdown:   // ↓
			this.f_view |= 2;
			break;
		case DOA.Controls.arrowleft:   // ←
			this.f_view |= 4;
			break;
		case DOA.Controls.arrowright:  // →
			this.f_view |= 8;
			break;
		case DOA.Controls.rotateleft:  // [
			this.f_view |= 16;
			break;
		case DOA.Controls.rotateright: // ]
			this.f_view |= 32;
			break;
		case DOA.Controls.tiltup:      // '
			this.f_view |= 64;
			break;
		case DOA.Controls.tiltdown:    // ;
			this.f_view |= 128;
			break;
		case DOA.Controls.zoomin:      // +
			this.f_view |= 256;
			break;
		case DOA.Controls.zoomout:     // -
			this.f_view |= 512;
			break;
		default:
			return code;
	}
	return 0;
};

/*
================
onKeyUp
	Handles key up event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyUp = function ( code ) {
	if ( !this.isActive ) return code;

	switch ( code ) {
		case DOA.Controls.arrowup:     // ↑
			this.f_view = ( this.f_view | 1 ) ^ 1;
			break;
		case DOA.Controls.arrowdown:   // ↓
			this.f_view = ( this.f_view | 2 ) ^ 2;
			break;
		case DOA.Controls.arrowleft:   // ←
			this.f_view = ( this.f_view | 4 ) ^ 4;
			break;
		case DOA.Controls.arrowright:  // →
			this.f_view = ( this.f_view | 8 ) ^ 8;
			break;
		case DOA.Controls.rotateleft:  // [
			this.f_view = ( this.f_view | 16 ) ^ 16;
			break;
		case DOA.Controls.rotateright: // ]
			this.f_view = ( this.f_view | 32 ) ^ 32;
			break;
		case DOA.Controls.tiltup:      // '
			this.f_view = ( this.f_view | 64 ) ^ 64;
			break;
		case DOA.Controls.tiltdown:    // ;
			this.f_view = ( this.f_view | 128 ) ^ 128;
			break;
		case DOA.Controls.zoomin:      // +
			this.f_view = ( this.f_view | 256 ) ^ 256;
			break;
		case DOA.Controls.zoomout:     // -
			this.f_view = ( this.f_view | 512 ) ^ 512;
			break;
		default:
			return code;
	}
	return 0;
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
	if ( this.mouseLook ) { // get delta
		this.mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		this.mouseY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		this.target.look( this.mouseX, this.mouseY );
	} else { // get coordinates
		// !@ Uses browser's visible viewport. Only for fullscreen app.
		this.mouseX = event.clientX || 0;
		this.mouseY = event.clientY || 0;

		this.f_scroll = 0;
		if ( this.mouseX === 0 ) {
			this.f_scroll |= 4;
		} else if ( this.mouseX > DOA.Settings.width - 2 ) {
			this.f_scroll |= 8;
		}
		if ( this.mouseY === 0 ) {
			this.f_scroll |= 1;
		} else if ( this.mouseY > DOA.Settings.height - 2 ) {
			this.f_scroll |= 2;
		}
	}
};

/*
================
onWheel
	Handles mouse wheel scroll.
================
*/
Player.prototype.onWheel = function ( code ) {
	// !@ fixed zoom, didn't use time delta
	this.target.zoom( code );
};

/*
================
animate
	Animates player actions, depending on time delta.
================
*/
DefaultPlayer.prototype.animate = function ( delta ) {
	this.target.update( delta, this.f_view | this.f_scroll );
};

DefaultPlayer.prototype.init = function () {
	this.target.enable();
};
