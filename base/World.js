/*
===============================================================================

    Class defines world.

===============================================================================
*/
var World = new function (object) {
    var instance;
    function World() { if ( !instance ) { instance = this; } else { return instance; } }

    this.scene = new THREE.Scene();
}
