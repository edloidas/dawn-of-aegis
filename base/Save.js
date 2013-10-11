/*
===============================================================================

    Class defines out-of-game settings, that will be used to configure window,
    load resources, check browser compatibility.

===============================================================================
*/
var Save = new function() {
    var instance;

    // constructor
    function Save() {

        if (!instance) {
            instance = this;
        } else {
            return instance;
        }
    }

    this.save = function () {

    }

    this.load = function () {

    }
}
