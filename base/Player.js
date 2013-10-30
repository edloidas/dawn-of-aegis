/*
===============================================================================

    Class defines player.

===============================================================================
*/
var Player = new function () {
    var instance;
    function Player() { if ( !instance ) { instance = this; } else { return instance; } }

    this.camera = new THREE.PerspectiveCamera( Settings.fov, Settings.aspect(), Settings.minView, Settings.maxView );
}
