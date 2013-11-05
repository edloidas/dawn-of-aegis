/*
===============================================================================

    Class compilation defines in-game objects.

===============================================================================
*/
var DOA = new function () {
    var instance;
    function DOA() { if ( !instance ) { instance = this; } else { return instance; } }

    this.PI_2 = Math.PI / 2;
    /*
    ---------------------------------------------------------------------------
    Actor
        Entity, that represents object in space, with x, y, z coordinates.
    ---------------------------------------------------------------------------
    */
    function Actor() {
        this.x = 0; this.y = 0; this.z = 0;
        this.material = null;
        this.geometry = null;
        this.mesh     = null;
        // Can be overriden. Should do all initial work, before adding to the scene.
        this.create = function () { return this.mesh; }
        // Can be overriden. Should do all initial work, before removing from scene.
        this.clear = function () { return this.mesh; }
    }

    /*
    ---------------------------------------------------------------------------
    World
        Entity, that represents space, with a specific properties, like
        gravity, world type (map, level, blank space, etc.), global lightining
        and other.
    ---------------------------------------------------------------------------
    */
    function World() {}


    /*
    ===========================================================================
    PROTOTYPES
    ===========================================================================
    */

    /*
    ---------------------------------------------------------------------------
    Axis
        Represents axis, as three vectors.
    ---------------------------------------------------------------------------
    */
    function Axis() {
        this.enabled = false;

        this.mesh = new THREE.AxisHelper( Settings.maxView );

        this.create = function () {
            this.mesh.position.set( this.x, this.y, this.z );
            return this.mesh;
        }
    }
    Axis.prototype = new Actor();
    this.Axis = Axis;

    /*
    ---------------------------------------------------------------------------
    Axis
        Represents axis, as three vectors.
    ---------------------------------------------------------------------------
    */
    function Grid( step ) {
        step = step || 50;
        this.enabled = false;

        this.mesh = new THREE.GridHelper( Settings.maxView, step );

        this.create = function () {
            this.mesh.position.set( this.x, this.y, this.z );
            return this.mesh;
        }
    }
    Grid.prototype = new Actor();
    this.Grid = Grid;

    /*
    ---------------------------------------------------------------------------
    Target
        Players target.
    ---------------------------------------------------------------------------
    */
    function Target( camera ) {
        this.camera = camera;
        this.enabled = false;

        this.radius = 200;
        this.velocity = 10; // movement speed
        this.omega = 0.1 || Settings.mouseSensitivity;  // radial (rotation) speed
        this.theta = -90;
        this.phi   = 90;

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
            // calculations
            this.theta += wx * this.omega;
            this.theta %= 360;
            this.phi += wy * this.omega;
            this.phi = Math.max( Settings.minLook, Math.min( Settings.maxLook, this.phi ) );

            this.update();

            this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );

            if ( this.enabled ) {
                this.mesh.rotation.x = this.camera.rotation.x;
                this.mesh.rotation.y = this.camera.rotation.y;
                this.mesh.rotation.z = this.camera.rotation.z;
            }
        }

        this.moveForward = function () {
            camera.position.deltaX = this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                   * Math.sin( THREE.Math.degToRad( this.phi ) );
            camera.position.deltaY = this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
            camera.position.deltaZ = this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                   * Math.sin( THREE.Math.degToRad( this.phi ) );


            camera.position.x += camera.position.deltaX;
            camera.position.y += camera.position.deltaY;
            camera.position.z += camera.position.deltaZ;

            this.x += camera.position.deltaX;
            this.y += camera.position.deltaY;
            this.z += camera.position.deltaZ;

            if ( this.enabled ) {
                this.mesh.position.x = this.x;
                this.mesh.position.y = this.y;
                this.mesh.position.z = this.z;
            }
        }

        this.moveBackward = function () {
            camera.position.deltaX = this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                   * Math.sin( THREE.Math.degToRad( this.phi ) );
            camera.position.deltaY = this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
            camera.position.deltaZ = this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                   * Math.sin( THREE.Math.degToRad( this.phi ) );


            camera.position.x -= camera.position.deltaX;
            camera.position.y -= camera.position.deltaY;
            camera.position.z -= camera.position.deltaZ;

            this.x -= camera.position.deltaX;
            this.y -= camera.position.deltaY;
            this.z -= camera.position.deltaZ;

            if ( this.enabled ) {
                this.mesh.position.x = this.x;
                this.mesh.position.y = this.y;
                this.mesh.position.z = this.z;
            }
        }

        this.moveLeft = function () {}
        this.moveRight = function () {}

        this.update = function update() {
            this.x = camera.position.x + this.radius * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                     * Math.sin( THREE.Math.degToRad( this.phi ) );
            this.y = camera.position.y + this.radius * Math.cos( THREE.Math.degToRad( this.phi ) );
            this.z = camera.position.z + this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                     * Math.sin( THREE.Math.degToRad( this.phi ) );
            if ( this.enabled ) {
                this.mesh.position.x = this.x;
                this.mesh.position.y = this.y;
                this.mesh.position.z = this.z;
            }
        }
    }
    Target.prototype = new Actor();
    this.Target = Target;
}
