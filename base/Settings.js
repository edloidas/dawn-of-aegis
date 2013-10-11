/*
===============================================================================

    Class defines out-of-game settings, that will be used to configure window,
    load resources, check browser compatibility.

===============================================================================
*/
var Settings = new function() {
    var instance;

    // constructor
    function Settings() {

        if (!instance) {
            instance = this;
        } else {
            return instance;
        }
    }

    // private variables
    var majorVersion = 0;
    var minorVersion = 1;

    // public variables
    this.width  = 800;
    this.height = 600;

    this.name = "Dawn of Aegis";
    //      start page
    this.preload = "Loading... Please stand by";
    this.start = "Press any key to continue";

    // public methods
    this.gameVersion = function () {
        return majorVersion + '/' + minorVersion;
    }
}
