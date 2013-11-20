/*
===============================================================================

    Element defines additional game variables and methods to perform
    mathematical calculations, simplify inheritance and work with HTML5.

===============================================================================
*/

/*
================
extend
    Extends `Child` from `Parent`.
    Fixes constructor and adds parent class link as `super`.
================
*/
function extend( Child, Parent ) {
    var F = function () {}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.super = Parent.prototype;
}

/*
================
mixin
    Copies new properties from `src` to `dst`.
    Properties of the `Object` will be ignored.
================
*/
function mixin( dst, src ) {
    // filters `Object` variables and methods
    var filter = {}
    for ( var x in src ){
        if ( (typeof filter[x] === "undefined") || (filter[x] !== src[x]) ) {
            dst[x] = src[x];
        }
    }
}

/*
-------------------------------------------------------------------------------
    CACHE
-------------------------------------------------------------------------------
*/
function Cache() {
    if ( !(this instanceof Cache) ) return new Cache();

    this._values = {};
}

/*
=================
get
    Gets Element by key.
=================
*/
Cache.prototype.get = function ( key ) {
    return this._values[ key ];
}

/*
=================
set
    Sets element value or adds new element.
=================
*/
Cache.prototype.set = function ( key, value, group ) {
    this._values[ key ] = value;
    this._values[ key ]._group = group;
    return this._values[ key ];
}

/*
=================
add
    Adds only new element.
=================
*/
Cache.prototype.add = function ( key, value, group ) {
    if ( this._values[ key ] === undefined ) {
        this._values[ key ] = value;
        this._values[ key ]._group = group;
    }
    return this._values[ key ];
}

/*
=================
remove
    Removes element.
=================
*/
Cache.prototype.remove = function ( key ) {
    delete this._values[ key ];
}

// For group adding use mixin() method

/*
=================
removeKeys
    Removes set of variables.
=================
*/
Cache.prototype.removeKeys = function ( keys ) {
    for ( i in keys ) {
        delete this._values[ keys[ i ] ];
    }
}

/*
=================
removeGroup
    Removes set of variables.
=================
*/
Cache.prototype.removeGroup = function ( group ) {
    for ( k in this._values ) {
        if ( this._values[ k ]._group === group ) {
            delete this._values[ keys[ i ] ];
        }
    }
}

/*
=================
contains
    Returns true if key is present in _values, otherwise - false.
=================
*/
Cache.prototype.contains = function ( key ) {
    return key in this._values;
}


/*
-------------------------------------------------------------------------------
    MATH
-------------------------------------------------------------------------------
*/
Math.PI_2 = Math.PI / 2;
Math.PI2  = Math.PI * 2;
