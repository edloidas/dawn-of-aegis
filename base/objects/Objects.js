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

    this.objects = null;

    // Can be overridden.
    // Should do all initial work, before adding to the scene.
    this.create = function ( objects ) {
        this.objects = objects || DOA.Engine._objects;
        this.objects.push( this );
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    }
    // Can be overridden.
    // Should do all initial work, before removing from scene.
    this.clear = function () {
        this.objects.pop( this );
        return this.mesh;
    }

    this.setX = function ( x ) { this.x = x; this.mesh.position.x = x; }
    this.setY = function ( y ) { this.y = y; this.mesh.position.y = y; }
    this.setZ = function ( z ) { this.z = z; this.mesh.position.z = z; }
    this.setPosition = function ( x, y, z ) {
        if ( typeof x === 'number' ) this.setX( x );
        if ( typeof y === 'number' ) this.setY( y );
        if ( typeof z === 'number' ) this.setZ( z );
    }
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
