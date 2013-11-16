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
    /*
     * If camera rotation on Y is 0, not PI radian, all objects visible by
     * camera must have negative Z coordinates. In this case, the backside
     * of the object is visible only, and Material.side should be set to
     * THREE.DoubleSide, so the object can be drawn.
     */
    this.camera.rotateY( Math.PI );

    this.scene = new THREE.Scene();

    this.menu = null;
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
================
clearMenu
    Removes all elements from the menu recursively.
================
*/
UI.prototype.clearMenu = function ( menu ) {
    menu = menu || this.menu;
    for ( var i in menu.__controllers ) {
        menu.remove( menu.__controllers[i] );
        delete menu.__controllers[i];
        delete menu.__listening[i];
    }
    menu.__controllers = [];
    menu.__listening = [];

    for ( var k in menu.__folders ) {
        UI.prototype.clearMenu( menu.__folders[k] );
        menu.__folders[k].domElement.parentNode.remove();
        delete menu.__folders[k];
    }
}

/*
================
buildSettingsMenu
    Creates new set of controllers, based on DOA.Settings.
================
*/
UI.prototype.buildSettingsMenu = function () {
    this.clearMenu();
    var folder = this.menu.addFolder( 'Common' );
    folder.add( DOA.Settings, 'fps', [ 30, 60 ] ).listen();
    folder.addColor( DOA.Settings.colors, 'mesh' );
    folder.open();

    folder = this.menu.addFolder( 'Graphics' );
    folder.add( DOA.Settings, 'minView', 0.1, 1.0 ).step( 0.1 ).listen();
    folder.add( DOA.Settings, 'maxView', 100, 9000 ).step( 100 ).listen();
    folder.add( DOA.Settings, 'fov', 30, 120 ).step( 15 ).listen();
    folder.open();

    folder = this.menu.addFolder( 'Player' );
    folder.add( DOA.Settings, 'mouseSensitivity', 0.05, 0.5 ).step( 0.05 ).listen();
    folder.open();
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.UI = new UI();
