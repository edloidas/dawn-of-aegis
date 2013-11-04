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

        this.radius = 200;
        this.velocity = 0;
        this.omega = 0.001; // radial speed
        this.theta = 0;
        this.phi   = 0;

        this.x = camera.position.x + this.radius;
        this.y = camera.position.y;
        this.z = camera.position.z;

        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        this.geometry = new THREE.SphereGeometry( 5 );
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        this.moveForward = function () {}
        this.moveBackward = function () {}
        this.moveLeft = function () {}
        this.moveRight = function () {}

        this.look = function ( wx, wy ) {
            // calculations
            this.theta += wx * this.omega * Math.PI;
            //if ( this.theta >   Math.PI2 ) this.theta -= Math.PI2;
            //if ( this.theta < - Math.PI2 ) this.theta += Math.PI2;

            this.phi += wy * this.omega * Math.PI;
            //if ( this.phi >   Math.PI_2 ) this.phi =   Math.PI_2;
            //if ( this.phi < - Math.PI_2 ) this.phi = - Math.PI_2;

            // this.x = camera.position.x - this.radius * Math.sin( this.phi );
            // this.y = camera.position.y - this.radius * Math.sin( this.theta );
            // this.z = camera.position.z + this.radius * (Math.cos( this.phi ) + Math.cos( this.theta ) -1);
            this.x = camera.position.x + this.radius * Math.cos( this.theta ) * Math.sin( this.phi );
            this.y = camera.position.y + this.radius * Math.sin( this.theta ) * Math.sin( this.phi );
            // this.z = camera.position.z - this.radius * Math.cos( this.phi );

            this.mesh.position.x = this.x;
            this.mesh.position.y = this.y;
            this.mesh.position.z = this.z;

            console.log(camera.position.x+" "+camera.position.y+" "+camera.position.z);
            console.log(this.x+" "+this.y+" "+this.z);
            console.log(this.phi+" "+this.theta);

            // console.log( this.x + " : " + this.y + " : " + this.z );

            this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
        }

        function update() {

        }
    }
    Target.prototype = new Actor();
    this.Target = Target;
}
