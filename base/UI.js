/*
===============================================================================

    Class defines UI.

===============================================================================
*/
function UI() {
    if ( !(this instanceof UI) ) return new UI();

    this.camera = new THREE.OrthographicCamera( DOA.Settings.width / - 2, DOA.Settings.width / 2,
                                                DOA.Settings.height / 2, DOA.Settings.height / - 2,
                                                DOA.Settings.minView, DOA.Settings.maxView );
    this.scene = new THREE.Scene();
}

/*
================
updateSize
    Updates camera size and projection in accordance with window size.
================
*/
UI.prototype.updateSize = function () {
    this.camera.left   = DOA.Settings.width  / - 2;
    this.camera.right  = DOA.Settings.width  /   2;
    this.camera.top    = DOA.Settings.height /   2;
    this.camera.bottom = DOA.Settings.height / - 2;
    this.camera.updateProjectionMatrix();
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.UI = new UI();
