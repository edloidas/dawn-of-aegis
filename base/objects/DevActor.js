/*
=================
DevActor
    Represents extended version of an actor,
    with the engine object list support.
=================
*/
Objects.prototype.DevActor = function () {
    if ( !(this instanceof Objects.prototype.DevActor) ) {
        return new Objects.prototype.DevActor();
    }
    Objects.prototype.DevActor.super.constructor.call( this );

    this.enabled = false;

    this.create = function () {
        DOA.Engine._devobjects.push( this );
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    };
    this.clear = function () {
        DOA.Engine._devobjects.pop( this );
        return this.mesh;
    };
};
extend( Objects.prototype.DevActor, Objects.prototype.Actor );
