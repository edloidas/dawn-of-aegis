/*
=================
AstroObject
    Common entity, that defines some astronomical object: star, planet, comet,
    black hole, meteor.
    Contains common data for all this objects.
    Can also be used for the imported object.
=================
*/
Objects.prototype.AstroObject = function ( mass, radius ) {
    if ( !(this instanceof Objects.prototype.AstroObject) ) {
        return new Objects.prototype.AstroObject( mass, radius );
    }
    Objects.prototype.AstroObject.super.constructor.call( this );

    this.mass = mass || 0;
    this.radius = radius || 0;
};
extend( Objects.prototype.AstroObject, Objects.prototype.Actor );
