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

    var that = this; // variable for 'private' methods

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.velocity = 500; // movement speed
    this.radius = 500;
    this.theta = -90;
    this.phi = 45;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    var dv = 0; // delta * velocity
    var flags = 0; // binary data 1111 11 11
                   // 1 - top, 2 - bottom, 4 - left, 8 - right
                   // 16 - rotate left, 32 - rotate right
                   // 64 - tilt top, 128 - tilt bottom

    this.look = function ( wx, wy ) {
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

        camera.position.x = this.x + this.radius * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        camera.position.y = this.y + this.radius * Math.cos( THREE.Math.degToRad( this.phi ) );
        camera.position.z = this.z + this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        this.updateMesh();

        this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
    };

    this.moveTop = function () {
        this.calcDelta();
        camera.position.delta.x = -camera.position.delta.x;
        camera.position.delta.z = -camera.position.delta.z;
        this.updatePlane();
    };

    this.moveBottom = function () {
        this.calcDelta();
        this.updatePlane();
    };

    this.moveLeft = function () {
        var deg = THREE.Math.degToRad( this.theta ) + Math.PI_2;
        camera.position.delta.x = dv * Math.cos( deg );
        camera.position.delta.z = dv * Math.sin( deg );
        this.updatePlane();
    };

    this.moveRight = function () {
        var deg = THREE.Math.degToRad( this.theta ) - Math.PI_2;
        camera.position.delta.x = dv * Math.cos( deg );
        camera.position.delta.z = dv * Math.sin( deg );
        this.updatePlane();
    };

    this.calcDelta = function () {
        camera.position.delta.x = dv * Math.cos( THREE.Math.degToRad( this.theta ) );
        camera.position.delta.z = dv * Math.sin( THREE.Math.degToRad( this.theta ) );
    };

    this.updateDelta = function ( delta ) {
        dv = this.delta * this.velocity;
    }

    this.updateMesh = function () {
        if ( this.enabled ) {
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
    };
};
extend( Objects.prototype.PlaneTarget, Objects.prototype.Target );
