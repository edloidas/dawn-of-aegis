/*
===============================================================================

    Element defines out-of-game settings, that will be used to configure
    render engine and game itself.

===============================================================================
*/
// constructor
function Settings() {
    if ( !(this instanceof Settings) ) return new Settings();

    this.version = {
        major: 0,
        minor: 1
    };

    /*
    ---------------------------------------------------------------------------
    Common settings
    ---------------------------------------------------------------------------
    */
    this.width  = 800;
    this.height = 450;

    this.fps = 60;

    this.background = 0xFFFFFF; // renderer background

    this.fontface = "Arial";

    this.colors = {
        mesh  : 0xFF0000,
        text  : 0x000000,
        blank : 0xFFFFFF
    }

    /*
    ---------------------------------------------------------------------------
    Graphics
    ---------------------------------------------------------------------------
    */
    this.maxView    = 2000;
    this.minView    = 0.1;
    this.fov        = 90;
    this.anisotropy = 1; // min - 1, max - depend on renderer.

    /*
    ---------------------------------------------------------------------------
    Player
    ---------------------------------------------------------------------------
    */
    this.minLook = 5,   // deg. Top is 0
    this.maxLook = 175, // deg. Bottom is 180

    this.mouseSensitivity = 0.2 // 0.05 - slow, 0.5 - fast

    this.hudSize    = 32; // [ 32, 64, 128 ]
    this.hudOpacity = 1.0;

    /*
    ---------------------------------------------------------------------------
    Controls
    ---------------------------------------------------------------------------
    */
    this.controls = {
        // mouse
        lmb : 0, // left mouse button
        mmb : 1, // middle mouse button
        rmb : 2, // right mouse button

        // movement
        forward     : 87, // w
        backward    : 83, // s
        strafeleft  : 65, // a
        straferight : 68, // d

        // actions
        use         : 69, // e
        skill       : 81, // q
        skillalt    : 90, // f
        reload      : 82, // r
        crouch      : 67, // c
        inventory   : 73, // i
        objective   : 79, // o
        map         : 77, // m

        menu        : 72, // h
        // debug
        fullscreen  : 88, // x
        devmode     : 90, // z
        debug       : 192 // ~
    }

}

/*
================
gameVersion
    Returns full game version
================
*/
Settings.prototype.gameVersion = function () {
    return this.version.major + '.' + this.version.minor;
}

/*
================
aspect
    Returns aspect ration (like 1.(7) for 16:9)
================
*/
Settings.prototype.aspect = function () {
    return this.width / this.height;
}

/*
================
scaleWindow
    Sets valid width and height of the window
================
*/
Settings.prototype.scaleWindow = function () {
    this.width =  ( window.innerWidth  < 800 ) ? 800 : window.innerWidth;
    this.height = ( window.innerHeight < 450 ) ? 450 : window.innerHeight;
}

/*
================
updateAnisotropy
    Updates anisotropy value for all loaded textures.
================
*/
Settings.prototype.updateAnisotropy = function () {
    // Set anisotropy as one of the `pow` from 2
    this.anisotropy = Math.max( 1, Math.min( DOA.Engine.renderer.getMaxAnisotropy(), this.anisotropy ) );
    this.anisotropy = Math.pow( 2, Math.round( Math.logab( 2, this.anisotropy ) ) );

    for ( k in DOA.Textures._values ) {
        if ( DOA.Textures._values[ k ]._texture instanceof THREE.Texture ) {
            DOA.Textures._values[ k ]._texture.anisotropy = this.anisotropy;
        }
    }
}

/*
================
apply
    Applies settings to the Game objects.
    Should be called after the game is initialized.
================
*/
Settings.prototype.apply = function () {
    // Graphics
    DOA.Player.camera.fov  = this.fov;
    DOA.Player.camera.near = this.minView;
    DOA.Player.camera.far  = this.maxView;
    DOA.Player.camera.updateProjectionMatrix();
    this.updateAnisotropy();

    // Player
    DOA.Player.target.omega = this.mouseSensitivity;

    // Interface
    DOA.UI.updateHud();
}

/*
================
quickSave
    Saves data to local storage
================
*/
Settings.prototype.quickSave = function () {
    localStorage.doa_quicksave = '{"version":'   + this.gameVersion() + ',' +
                                 ' "width":'     + this.width + ',' +
                                 ' "height":'    + this.height + ',' +
                                 ' "fps":'       + this.fps + ',' +
                                 ' "mesh":'      + this.colors.mesh + ',' +
                                 ' "maxView":'   + this.maxView + ',' +
                                 ' "minView":'   + this.minView + ',' +
                                 ' "fov":'       + this.fov + ',' +
                                 ' "mouseSens":' + this.mouseSensitivity + '}';
}

/*
================
quickLoad
    Loads data from local storage
================
*/
Settings.prototype.quickLoad = function () {
    if ( localStorage.doa_quicksave === undefined ) return;

    var slot = JSON.parse( localStorage.doa_quicksave );
    if ( this.gameVersion() == slot.version ) {
        this.width   = slot.width;
        this.height  = slot.height;
        this.fps     = slot.fps;
        this.mesh    = slot.mesh;
        this.maxView = slot.maxView;
        this.minView = slot.minView;
        this.fov     = slot.fov;
        this.mouseSensitivity = slot.mouseSens;
    }
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Settings = new Settings();
// Shortcut for the controls for less code.
DOA.Controls = DOA.Settings.controls;
DOA.Colors = DOA.Settings.colors;
