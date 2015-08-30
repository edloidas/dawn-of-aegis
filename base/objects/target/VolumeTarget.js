/*
=================
VolumeTarget
	Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.VolumeTarget = function ( camera ) {
	if ( !(this instanceof Objects.prototype.VolumeTarget) ) {
		return new Objects.prototype.VolumeTarget( camera );
	}
	Objects.prototype.VolumeTarget.super.constructor.call( this, camera );

	this.isEnabled = false;

	this.omega = DOA.Settings.mouseSensitivity;  // radial speed
	this.velocity = 300; // movement speed
	this.radius = 200;
	this.theta = -90;
	this.phi = 90;

	this.look = function ( wx, wy ) {
		/* See http://mathworld.wolfram.com/SphericalCoordinates.html
		 *    z             y
		 *    |__ y  ==>    |__ x
		 * x /           z /
		 *   x = r * cos(theta) * sin(phi)
		 *   y = r * sin(theta) * sin(phi)
		 *   z = r * cos(phi)
		 */
		this.theta += wx * this.omega;
		this.theta %= 360;
		this.phi += wy * this.omega;
		this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.maxLook, this.phi ) );

		this.x = camera.position.x + this.radius *
			Math.cos( THREE.Math.degToRad( this.theta ) ) * Math.sin( THREE.Math.degToRad( this.phi ) );
		this.y = camera.position.y + this.radius * Math.cos( THREE.Math.degToRad( this.phi ) );
		this.z = camera.position.z + this.radius *
			Math.sin( THREE.Math.degToRad( this.theta ) ) * Math.sin( THREE.Math.degToRad( this.phi ) );

		this.updateMesh();

		this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );

		if ( this.isEnabled ) {
			this.mesh.rotation.x = this.camera.rotation.x;
			this.mesh.rotation.y = this.camera.rotation.y;
			this.mesh.rotation.z = this.camera.rotation.z;
		}
	};

	this.moveForward = function () {
		this.calcDelta();

		camera.position.x += camera.position.delta.x;
		camera.position.y += camera.position.delta.y;
		camera.position.z += camera.position.delta.z;

		this.x += camera.position.delta.x;
		this.y += camera.position.delta.y;
		this.z += camera.position.delta.z;

		this.updateMesh();
	};

	this.moveBackward = function () {
		this.calcDelta();

		camera.position.x -= camera.position.delta.x;
		camera.position.y -= camera.position.delta.y;
		camera.position.z -= camera.position.delta.z;

		this.x -= camera.position.delta.x;
		this.y -= camera.position.delta.y;
		this.z -= camera.position.delta.z;

		this.updateMesh();
	};

	this.moveLeft = function () {
		camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) + Math.PI_2 );
		camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) + Math.PI_2 );

		this.updatePlane();
	};

	this.moveRight = function () {
		camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) - Math.PI_2);
		camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) - Math.PI_2);

		this.updatePlane();
	};

	this.calcDelta = function () {
		camera.position.delta.x = this.delta * this.velocity *
			Math.cos( THREE.Math.degToRad( this.theta ) ) * Math.sin( THREE.Math.degToRad( this.phi ) );
		camera.position.delta.y = this.delta * this.velocity *
			Math.cos( THREE.Math.degToRad( this.phi ) );
		camera.position.delta.z = this.delta * this.velocity *
			Math.sin( THREE.Math.degToRad( this.theta ) ) * Math.sin( THREE.Math.degToRad( this.phi ) );
	};

	this.updateMesh = function () {
		if ( this.isEnabled ) {
			this.mesh.position.x = this.x;
			this.mesh.position.y = this.y;
			this.mesh.position.z = this.z;
		}
	};

	this.updatePlane = function () {
		camera.position.x += camera.position.delta.x;
		camera.position.z += camera.position.delta.z;

		this.x += camera.position.delta.x;
		this.z += camera.position.delta.z;

		if ( this.isEnabled ) {
			this.mesh.position.x = this.x;
			this.mesh.position.z = this.z;
		}
	};
};
extend( Objects.prototype.VolumeTarget, Objects.prototype.Target );
