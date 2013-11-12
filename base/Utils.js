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
    MATH
-------------------------------------------------------------------------------
*/
Math.PI_2 = Math.PI / 2;
Math.PI2  = Math.PI * 2;
