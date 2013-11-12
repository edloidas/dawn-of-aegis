/*
===============================================================================

    Class defines UI.

===============================================================================
*/
var UI = new function () {
    var instance;
    function UI() { if ( !instance ) { instance = this; } else { return instance; } }

    this.camera = new THREE.OrthographicCamera( DOA.Settings.width / - 2, DOA.Settings.width / 2,
                                                DOA.Settings.height / 2, DOA.Settings.height / - 2,
                                                DOA.Settings.minView, DOA.Settings.maxView );
    this.scene = new THREE.Scene();

    this.updateSize = function () {
        this.camera.left   = DOA.Settings.width  / - 2;
        this.camera.right  = DOA.Settings.width  /   2;
        this.camera.top    = DOA.Settings.height /   2;
        this.camera.bottom = DOA.Settings.height / - 2;
        this.camera.updateProjectionMatrix();
    }
}
