/*
=================
PlaneTarget
    Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.PlaneTarget = function ( camera ) {
    if ( !(this instanceof Objects.prototype.PlaneTarget) ) {
        return new Objects.prototype.PlaneTarget( camera );
    }
    Objects.prototype.PlaneTarget.super.constructor.call( this, camera );

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.dv = 0; // delta * velocity
    this.velocity = 500; // movement speed
    this.radius = 500;
    this.theta = -90;
    this.phi = 45;

    this.x = 0;
    this.y = 0;
    this.z = 0;

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
        camera.position.delta.x = this.dv * Math.cos( deg );
        camera.position.delta.z = this.dv * Math.sin( deg );
        this.updatePlane();
    };

    this.moveRight = function () {
        var deg = THREE.Math.degToRad( this.theta ) - Math.PI_2;
        camera.position.delta.x = this.dv * Math.cos( deg );
        camera.position.delta.z = this.dv * Math.sin( deg );
        this.updatePlane();
    };

    this.calcDelta = function () {
        camera.position.delta.x = this.dv * Math.cos( THREE.Math.degToRad( this.theta ) );
        camera.position.delta.z = this.dv * Math.sin( THREE.Math.degToRad( this.theta ) );
    };

    this.updateDelta = function ( delta ) {
        this.dv = this.delta * this.velocity;
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
