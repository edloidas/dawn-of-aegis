/*
===============================================================================

    Element defines additional game variables and methods to perform
    mathematical calculations, simplify inheritance and work with HTML5.

===============================================================================
*/

function extend(Child, Parent) {
    var F = function () {}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

/*
-------------------------------------------------------------------------------
    MATH
-------------------------------------------------------------------------------
*/
Math.PI_2 = Math.PI / 2;
Math.PI2  = Math.PI * 2;
