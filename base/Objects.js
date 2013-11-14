/*
===============================================================================

    Class compilation defines in-game 3D objects.

===============================================================================
*/
function Objects() {
    if ( !(this instanceof Objects) ) return new Objects();
}

/*
=================
Actor
    Entity, that represents object in space.
=================
*/
Objects.prototype.Actor = function ( x, y, z ) {
    if ( !(this instanceof Objects.prototype.Actor) ) return new Objects.prototype.Actor();

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.material = null;
    this.geometry = null;
    this.mesh     = null;

    // Can be overridden.
    // Should do all initial work, before adding to the scene.
    this.create = function () {
        return this.mesh;
    }
    // Can be overridden.
    // Should do all initial work, before removing from scene.
    this.clear = function () {
        return this.mesh;
    }

    this.setX = function ( x ) { this.x = x; this.mesh.position.x = x; }
    this.setY = function ( y ) { this.y = y; this.mesh.position.y = y; }
    this.setZ = function ( z ) { this.z = z; this.mesh.position.z = z; }
}

/*
=================
World
    Entity, that represents space, with a specific properties:
    gravity, world type (map, level), global lightning, etc.
=================
*/
Objects.prototype.World = function () {
    if ( !(this instanceof Objects.prototype.World) ) return new this.World();
}

/*
---------------------------------------------------------------------------
Game Objects
---------------------------------------------------------------------------
*/

/*
=================
Square
    Draw square of two polygons (triangles).
=================
*/
Objects.prototype.Square = function ( size ) {
    if ( !(this instanceof Objects.prototype.Square) ) {
        return new Objects.prototype.Square();
    }
    Objects.prototype.Square.super.constructor.call( this );

    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push( new THREE.Vector3( this.x,         this.y,        this.z ) );
    this.geometry.vertices.push( new THREE.Vector3( this.x,         this.y + size, this.z ) );
    this.geometry.vertices.push( new THREE.Vector3( this.x + size,  this.y + size, this.z ) );
    this.geometry.vertices.push( new THREE.Vector3( this.x + size,  this.y,        this.z ) );

    this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    this.geometry.faces.push( new THREE.Face3( 2, 3, 0 ) );

    this.material = new THREE.MeshBasicMaterial({
        color: DOA.Colors.blank,
        side:  THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.create = function () {
        this.mesh.position.set( this.x, this.y, this.z );
        return this.mesh;
    }
}
extend( Objects.prototype.Square, Objects.prototype.Actor );

/*
=================
Axis
    Represents axis, as three vectors.
=================
*/
Objects.prototype.Axis = function () {
    if ( !(this instanceof Objects.prototype.Axis) ) {
        return new Objects.prototype.Axis();
    }
    Objects.prototype.Axis.super.constructor.call( this );

    this.enabled = false;

    this.mesh = new THREE.AxisHelper( DOA.Settings.maxView );

    this.create = function () {
        this.mesh.position.set( this.x, this.y, this.z );
        return this.mesh;
    }
}
extend( Objects.prototype.Axis, Objects.prototype.Actor );

/*
=================
Grid
    Represents grid on xz coordinates.
=================
*/
Objects.prototype.Grid = function ( step ) {
    if ( !(this instanceof Objects.prototype.Grid) ) {
        return new Objects.prototype.Grid( step );
    }
    Objects.prototype.Grid.super.constructor.call( this );

    step = step || 50;
    this.enabled = false;

    this.mesh = new THREE.GridHelper( DOA.Settings.maxView, step );

    this.create = function () {
        this.mesh.position.set( this.x, this.y, this.z );
        return this.mesh;
    }
}
extend( Objects.prototype.Grid, Objects.prototype.Actor );

/*
=================
Target
    Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.Target = function ( camera ) {
    if ( !(this instanceof Objects.prototype.Target) ) {
        return new Objects.prototype.Target( camera );
    }
    Objects.prototype.Target.super.constructor.call( this );

    this.camera = camera;
    this.camera.position.delta = { x: 0, y: 0, z: 0 };

    this.enabled = false;
    this.delta = 1; // time delta

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.velocity = 300; // movement speed
    this.radius = 200;
    this.theta = -90;
    this.phi = 90;

    this.x = camera.position.x;
    this.y = camera.position.y;
    this.z = camera.position.z;

    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.geometry = new THREE.CircleGeometry( 1 );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

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

        this.x = camera.position.x + this.radius * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        this.y = camera.position.y + this.radius * Math.cos( THREE.Math.degToRad( this.phi ) );
        this.z = camera.position.z + this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        this.updateMesh();

        this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );

        if ( this.enabled ) {
            this.mesh.rotation.x = this.camera.rotation.x;
            this.mesh.rotation.y = this.camera.rotation.y;
            this.mesh.rotation.z = this.camera.rotation.z;
        }
    }

    this.moveForward = function () {
        this.calcDelta();

        camera.position.x += camera.position.delta.x;
        camera.position.y += camera.position.delta.y;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.y += camera.position.delta.y;
        this.z += camera.position.delta.z;

        this.updateMesh();
    }

    this.moveBackward = function () {
        this.calcDelta();

        camera.position.x -= camera.position.delta.x;
        camera.position.y -= camera.position.delta.y;
        camera.position.z -= camera.position.delta.z;

        this.x -= camera.position.delta.x;
        this.y -= camera.position.delta.y;
        this.z -= camera.position.delta.z;

        this.updateMesh();
    }

    this.moveLeft = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) + Math.PI_2 );
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) + Math.PI_2 );

        this.updatePlane();
    }

    this.moveRight = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) - Math.PI_2);
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) - Math.PI_2);

        this.updatePlane();
    }


    this.calcDelta = function () {
        camera.position.delta.x = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.y = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.z = this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
    }

    this.updateMesh = function () {
        if ( this.enabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.y = this.y;
            this.mesh.position.z = this.z;
        }
    }

    this.updatePlane = function () {
        camera.position.x += camera.position.delta.x;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.z += camera.position.delta.z;

        if ( this.enabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.z = this.z;
        }
    }
}
extend( Objects.prototype.Target, Objects.prototype.Actor );

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Objects = new Objects();
