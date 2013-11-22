/*
===============================================================================

    Class defines UI: HUD (head-up display) with player stats and menu GUI.

===============================================================================
*/
function UI() {
    if ( !(this instanceof UI) ) return new UI();

    this.camera = new THREE.OrthographicCamera( DOA.Settings.width  / - 2, DOA.Settings.width  /   2,
                                                DOA.Settings.height /   2, DOA.Settings.height / - 2,
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

    this.crosshair = null;
}

/*
================
init
    Creates objects of user interface.
================
*/
UI.prototype.init = function () {
    // Interface
    //
    // Add crosshair size and hud size to settings. normal - 32, medium - 48, big - 64
    this.crosshair = new DOA.Objects.Sprite( 32, DOA.Materials.get( 'crosshair' ) );
    this.crosshair.setZ( 1.0 );
    this.scene.add( this.crosshair.create() );

    // Menu
    this.menu = new dat.GUI();
    this.menu.domElement.style.display = 'none';
    this.buildSettingsMenu();
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

    // Updating HUD
    this.crosshair.setPosition( this.camera.right, this.camera.top );
}

/*
================
updateHudSize
    Updates HUD elements texture size.
================
*/
UI.prototype.updateHud = function () {
    // scale
    this.crosshair.mesh.scale.x = DOA.Settings.hudSize;
    this.crosshair.mesh.scale.y = DOA.Settings.hudSize;

    // opacity
    DOA.UI.crosshair.material.opacity = DOA.Settings.hudOpacity;
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
resetMenu
    Resets menu values to the remembered ones.
================
*/
UI.prototype.resetMenu = function () {
    try {
        this.menu.revert();
    } catch ( ex ) {
        // Cannot read property 'selectedIndex' of undefined
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
    folder.add( DOA.Settings, 'fps', [ 30, 60 ] ).name( 'fps counter' ).listen();
    folder.addColor( DOA.Settings.colors, 'mesh' ).name( 'blank color' ).listen();
    folder.open();

    folder = this.menu.addFolder( 'Graphics' );
    folder.add( DOA.Settings, 'minView', 0.1, 1.0 ).step( 0.1 ).name( 'min view' ).listen();
    folder.add( DOA.Settings, 'maxView', 100, 9000 ).step( 100 ).name( 'max view' ).listen();
    folder.add( DOA.Settings, 'fov', 30, 120 ).step( 15 ).name( 'filed of view' ).listen();
    folder.add( DOA.Settings, 'anisotropy', 1, 16 ).step( 1 ).name( 'anisotropy' ).listen();
    folder.open();

    folder = this.menu.addFolder( 'Player' );
    folder.add( DOA.Settings, 'mouseSensitivity', 0.05, 0.5 ).step( 0.05 ).name( 'mouse speed' ).listen();
    folder.add( DOA.Settings, 'hudSize', { normal : 32, big : 64, large : 128 } ).name( 'HUD size' ).listen();
    folder.add( DOA.Settings, 'hudOpacity', 0.0, 1.0 ).step( 0.01 ).name( 'HUD opacity' ).listen();
    folder.open();

    this.menu.add( DOA.UI, 'resetMenu' ).name( 'Reset' );
    this.menu.add( DOA.Settings, 'quickSave' ).name( 'Save' );
    this.menu.add( DOA.Settings, 'quickLoad' ).name( 'Load' );
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.UI = new UI();
