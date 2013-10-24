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

        if ( !instance ) {
            instance = this;
        } else {
            return instance;
        }
    }

    this.name = "Dawn of Aegis";

    var majorVersion = 0;
    var minorVersion = 1;

    this.width  = 800;
    this.height = 600;

    this.gameVersion = function () {
        return majorVersion + '/' + minorVersion;
    }

    this.aspect = function() {
        return this.width / this.height;
    }

    this.scaleWindow = function () {
        this.width = (window.innerWidth < 800) ? 800 : window.innerWidth;
        this.height = (window.innerHeight < 600) ? 600 : window.innerHeight;
    }
}
