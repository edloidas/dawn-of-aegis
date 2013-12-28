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
    this.velocity = 500; // movement speed
    this.radius = 500;
    this.theta = -90;
    this.phi = 90;

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
        this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.maxLook, this.phi ) );

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

        camera.position.x += camera.position.delta.x;
        camera.position.y += camera.position.delta.y;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.y += camera.position.delta.y;
        this.z += camera.position.delta.z;

        this.updateMesh();
    };

    this.moveBottom = function () {
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
        camera.position.delta.x = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.y = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.z = this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
    };

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
