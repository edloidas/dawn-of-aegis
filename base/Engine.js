/*
===============================================================================

    Class defines in-game physics and calculations.

===============================================================================
*/
var Engine = new function() {
    var instance;

    // constructor
    function Engine() {

        if ( !instance ) {
            instance = this;
        } else {
            return instance;
        }
    }
}
