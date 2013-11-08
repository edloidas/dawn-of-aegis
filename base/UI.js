/*
===============================================================================

    Class defines UI.

===============================================================================
*/
var UI = new function () {
    var instance;
    function UI() { if ( !instance ) { instance = this; } else { return instance; } }

    this.camera = new THREE.OrthographicCamera( Settings.width / - 2, Settings.width / 2,
                                                Settings.height / 2, Settings.height / - 2,
                                                Settings.minView, Settings.maxView );
    this.scene = new THREE.Scene();

    this.updateSize = function() {
        UI.camera.left   = Settings.width  / - 2;
        UI.camera.right  = Settings.width  /   2;
        UI.camera.top    = Settings.height /   2;
        UI.camera.bottom = Settings.height / - 2;
        UI.camera.updateProjectionMatrix();
    }
}
