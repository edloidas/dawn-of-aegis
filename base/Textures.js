/*
===============================================================================

    Set of preloaded textures.

===============================================================================
*/
function Textures() {
    if ( !(this instanceof Textures) ) return new Textures();

    this.default = THREE.ImageUtils.loadTexture( 'base/data/textures/default.png' );

    // HUD
    this.crosshairs = {
        dot      : THREE.ImageUtils.loadTexture( 'base/data/textures/crosshairs/dot.png' ),
        circle   : THREE.ImageUtils.loadTexture( 'base/data/textures/crosshairs/circle.png' ),
        cross    : THREE.ImageUtils.loadTexture( 'base/data/textures/crosshairs/cross.png' ),
        crossdot : THREE.ImageUtils.loadTexture( 'base/data/textures/crosshairs/crossdot.png' ),
        bigcross : THREE.ImageUtils.loadTexture( 'base/data/textures/crosshairs/bigcross.png' )
    }
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Textures = new Textures();
