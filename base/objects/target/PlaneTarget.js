/*
=================
PlaneTarget
	Entity, that represents target, followed by camera.
	Proper work with the target includes three steps:
	1. Set time delta for the animation frame;
	2. Add actions;
	3. Run animate() method. It will optimize calculations and reset all data.
	Method look() is handled separately.
=================
*/
Objects.prototype.PlaneTarget = function ( camera ) {
	if ( !(this instanceof Objects.prototype.PlaneTarget) ) {
		return new Objects.prototype.PlaneTarget( camera );
	}
	Objects.prototype.PlaneTarget.super.constructor.call( this, camera );

	var self = this; // variable for 'private' methods

	this.omega = DOA.Settings.mouseSensitivity;  // radial speed
	this.velocity = 700; // movement speed
	this.radius = 500;
	this.theta = -90;
	this.phi = 45;

	this.x = 0;
	this.y = 0;
	this.z = 0;

	var dv   = 0, // delta * velocity
		dr   = 0, // delta * radius
		degt = 0,
		degp = 0;

	var flags = 0; // binary data 1111 11 11 11
					 // 1 - top, 2 - bottom, 4 - left, 8 - right
					 // 16 - rotate left, 32 - rotate right
					 // 64 - tilt up, 128 - tilt down
					 // 256 - zoom in, 512 - zoom out

	this.look = function ( wx, wy ) {
		wx = wx || 0;
		wy = wy || 0;

		/* See http://mathworld.wolfram.com/SphericalCoordinates.html
		 *    z             y
		 *    |__ y  ==>    |__ x
		 * x /           z /
		 *   x = r * cos(theta) * sin(phi)
		 *   y = r * sin(theta) * sin(phi)
		 *   z = r * cos(phi)
		 */
		this.theta -= wx * this.omega;
		this.theta %= 360;
		this.phi += wy * this.omega;
		this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.midLook, this.phi ) );

		degt = THREE.Math.degToRad( this.theta );
		degp = THREE.Math.degToRad( this.phi );

		this.camera.position.x = this.x + this.radius *
			Math.cos( degt ) * Math.sin( degp );
		this.camera.position.y = this.y + this.radius *
			Math.cos( degp );
		this.camera.position.z = this.z + this.radius *
			Math.sin( degt ) * Math.sin( degp );

		updateMesh();

		this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
	};

	this.zoom = function ( code ) {
		if ( code < 0 ) {
			this.radius += DOA.Settings.zoomStep;
		} else {
			this.radius -= DOA.Settings.zoomStep;
		}
		this.radius = Math.max( DOA.Settings.nearZoom, Math.min( DOA.Settings.farZoom, this.radius ) );
		this.look();
	};

	this.moveTop     = function () { flags |=   1; };
	this.moveBottom  = function () { flags |=   2; };
	this.moveLeft    = function () { flags |=   4; };
	this.moveRight   = function () { flags |=   8; };

	this.rotateLeft  = function () { flags |=  16; };
	this.rotateRight = function () { flags |=  32; };

	this.tiltUp      = function () { flags |=  64; };
	this.tiltDown    = function () { flags |= 128; };

	this.zoomIn      = function () { flags |= 256; };
	this.zoomOut     = function () { flags |= 512; };

	this.update = function ( delta, direction ) {
		direction = direction || 0;
		flags |= direction;

		dv = delta * this.velocity;
		dr = 0.05 / delta;

		// reset before
		this.camera.position.delta.x = 0;
		this.camera.position.delta.z = 0;

		var deg = 0,
			wx  = 0,
			wy  = 0;

		// !@ theta and phi should be calculated before move the camera.
		// !@ Otherwise, it may cause drift.

		// rotate left and right compensates each other
		if ( !( flags & 16 ) ^ !( flags & 32 ) ) {
			if ( flags & 16 ) {
				this.theta += dr;
			} else { // flags & 32
				this.theta -= dr ;
			}
			this.theta %= 360;
		}

		// tilt up and down compensates each other
		if ( !( flags & 64 ) ^ !( flags & 128 ) ) {
			if ( flags & 64 ) {
				this.phi -= dr;
			} else { // flags & 128
				this.phi += dr;
			}
			this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.midLook, this.phi ) );
		}

		// zoom in and out compensates each other
		if ( !( flags & 256 ) ^ !( flags & 512 ) ) {
			if ( flags & 256 ) {
				this.radius -= dv;
			} else { // flags & 128
				this.radius += dv;
			}
			this.radius = Math.max( DOA.Settings.nearZoom, Math.min( DOA.Settings.farZoom, this.radius ) );
		}

		degt = THREE.Math.degToRad( this.theta );
		degp = THREE.Math.degToRad( this.phi );

		// move top and bottom compensates each other
		if ( !( flags & 1 ) ^ !( flags & 2 ) ) {
			degt = THREE.Math.degToRad( this.theta );
			if ( flags & 1 ) {
				decrementHorizontal( degt );
			} else { // flags & 2
				incrementHorizontal( degt );
			}
		}

		// move left and right compensates each other
		if ( !( flags & 4 ) ^ !( flags & 8 ) ) {
			if ( flags & 4 ) {
				deg = degt + Math.PI_2;
			} else { // flags & 8
				deg = degt - Math.PI_2;
			}
			incrementHorizontal( deg );
		}

		// update position
		if ( flags & 1008 ) { // any flag, except moves
			this.camera.position.x = this.x + this.radius *
				Math.cos( degt ) * Math.sin( degp );
			this.camera.position.y = this.y + this.radius * Math.cos( degp );
			this.camera.position.z = this.z + this.radius *
				Math.sin( degt ) * Math.sin( degp );
		}
		this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
		updateMesh();

		this.camera.position.x += camera.position.delta.x;
		this.camera.position.z += camera.position.delta.z;
		this.x += camera.position.delta.x;
		this.z += camera.position.delta.z;

		updateMesh();
		// reset after
		flags = 0;
	};

	function incrementHorizontal( deg ) {
		self.camera.position.delta.x += dv * Math.cos( deg );
		self.camera.position.delta.z += dv * Math.sin( deg );
	}

	function decrementHorizontal( deg ) {
		self.camera.position.delta.x -= dv * Math.cos( deg );
		self.camera.position.delta.z -= dv * Math.sin( deg );
	}

	function updateMesh() {
		if ( self.isEnabled ) {
			self.mesh.position.x = self.x;
			self.mesh.position.y = self.y;
			self.mesh.position.z = self.z;
		}
	}
};
extend( Objects.prototype.PlaneTarget, Objects.prototype.Target );
