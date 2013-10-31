/*
===============================================================================

    Class compilation defines in-game objects.

===============================================================================
*/
var DOA = new function () {
    var instance;
    function DOA() { if ( !instance ) { instance = this; } else { return instance; } }

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
}
