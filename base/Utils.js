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
    var F = function () {};
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
    var filter = {};
    for ( var k in src ){
        if ( ( typeof filter[ k ] === "undefined" ) || ( filter[ k ] !== src[ k ] ) ) {
            dst[ k ] = src[ k ];
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
};

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
};

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
};

/*
=================
remove
    Removes element.
=================
*/
Cache.prototype.remove = function ( key ) {
    delete this._values[ key ];
};

// For group adding use mixin() method

/*
=================
removeKeys
    Removes set of variables.
=================
*/
Cache.prototype.removeKeys = function ( keys ) {
    for ( var k in keys ) {
        delete this._values[ keys[ k ] ];
    }
};

/*
=================
removeGroup
    Removes set of variables.
=================
*/
Cache.prototype.removeGroup = function ( group ) {
    for ( var k in this._values ) {
        if ( this._values[ k ]._group === group ) {
            delete this._values[ keys[ k ] ];
        }
    }
};

/*
=================
contains
    Returns true if key is present in _values, otherwise - false.
=================
*/
Cache.prototype.contains = function ( key ) {
    return key in this._values;
};


/*
-------------------------------------------------------------------------------
    STRING
-------------------------------------------------------------------------------
*/
/*
=================
hashCode
    Javascript implementation of Java's String.hashCode() method.
=================
*/
String.prototype.hashCode = function() {
    if ( this.length === 0 ) return hash;

    var hash = 0;
    for ( var i = 0; i < this.length; i++ ) {
        var char = this.charCodeAt( i );
        hash = ( ( hash << 5 ) - hash ) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
Object.defineProperty( String.prototype, 'hashCode', { writable: false } );

/*
-------------------------------------------------------------------------------
    MATH
-------------------------------------------------------------------------------
*/
Math.PI_2 = Math.PI / 2;
Object.defineProperty( Math, 'PI_2', { writable: false } );

Math.PI2  = Math.PI * 2;
Object.defineProperty( Math, 'PI2', { writable: false } );

/*
=================
logab
    Evaluates LOGa(b) as LN(b)/LN(a)
=================
*/
Math.logab = function ( a, b ) {
    if ( a === 2 ) {
        return Math.log( b ) / Math.LN2;
    } else if ( a === 10 ) {
        return Math.log( b ) / Math.LN10;
    } else {
        return Math.log( b ) / Math.log( a );
    }
};
Object.defineProperty( Math, 'logab', { writable: false } );
