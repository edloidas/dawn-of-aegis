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

    this._key     = null;

    /*
     * Adds object to the scene.
     * Should be overridden, in case to another scene usage,
     * instead of overriding enable().
     */
    this._add = function () {
        DOA.World.scene.add( this.mesh );
    };

    /*
     * Removes object from the scene.
     * Should be overridden, in case to another scene usage,
     * instead of overriding enable().
     */
    this._remove = function () {
        DOA.World.scene.remove( this.mesh );
    };

    // Enables object for renderer. Marks active.
    this.enable = function () {
        // add to scene
        this._add();
        // add to engine's object cache
        this._key = this._key || randomHash();
        DOA.Engine._objects.add( this._key, this );
        DOA.Engine._objects.get( this._key )._group = 'scene';
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    };

    // Disables object for the renderer. Marks as suspended.
    this.disable = function () {
        // remove from scene
        this._remove();
        // remove from engine's object cache
        DOA.Engine._objects.get( this._key )._group = undefined;

        return this.mesh;
    };

    // Method to animate mesh in the Engine cycle.
    this.animate = function ( delta ) {
    };

    this.setX = function ( x ) { this.x = x; this.mesh.position.x = x; };
    this.setY = function ( y ) { this.y = y; this.mesh.position.y = y; };
    this.setZ = function ( z ) { this.z = z; this.mesh.position.z = z; };
    this.setPosition = function ( x, y, z ) {
        if ( typeof x === 'number' ) this.setX( x );
        if ( typeof y === 'number' ) this.setY( y );
        if ( typeof z === 'number' ) this.setZ( z );
    };
};

/*
=================
World
    Entity, that represents space, with a specific properties:
    gravity, world type (map, level), global lightning, etc.
=================
*/
Objects.prototype.World = function () {
    if ( !(this instanceof Objects.prototype.World) ) return new this.World();
};
