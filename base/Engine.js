/*
===============================================================================

    Class defines out-of-game settings, that will be used to configure window,
    load resources, check browser compatibility.

===============================================================================
*/
var Engine = new function() {
    var instance;

    // constructor
    function Engine() {

        if (!instance) {
            instance = this;
        } else {
            return instance;
        }
    }
}
