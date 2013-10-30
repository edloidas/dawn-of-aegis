/*
===============================================================================

    Class defines out-of-game settings, that will be used to configure window,
    load resources, check browser compatibility.

===============================================================================
*/
var Settings = new function () {
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

    // Window settings
    this.width  = 800;
    this.height = 600;
    this.fps = 60;

    // Camera settings
    this.maxView = 2000;
    this.minView = 1;
    this.fov = 90;
    this.background = 0xFFFFFF;

    this.gameVersion = function () {
        return majorVersion + '/' + minorVersion;
    }

    this.aspect = function () {
        return this.width / this.height;
    }

    this.scaleWindow = function () {
        this.width = (window.innerWidth < 800) ? 800 : window.innerWidth;
        this.height = (window.innerHeight < 600) ? 600 : window.innerHeight;
    }

    this.quickSave = function () {
        localStorage.doa_quicksave = '{"version":' + majorVersion + '.' + minorVersion + ',' +
                                     ' "width":' + this.width + ',' +
                                     ' "height":' + this.height +'}';
    }

    this.quickLoad = function () {
        if (localStorage.doa_quicksave === undefined) {
            return;
        }

        var quicksave = JSON.parse(localStorage.doa_quicksave);
        Settings.width = quicksave.width;
        Settings.height = quicksave.height;
    }
}
