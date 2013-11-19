/*
===============================================================================

    Multiple caches, based on Cache.

===============================================================================
*/

function Texture( url ) {
    if ( !(this instanceof Texture) ) return new Texture();

    this.url = url;
    this._texture = null;
}

Texture.prototype.load = function () {
    if ( this._texture === null ) {
        this._texture = THREE.ImageUtils.loadTexture( this.url );
    }
    return this._texture ;
}

Texture.prototype.unload = function () {
    if ( this._texture !== null ) {
        delete this._texture;
    }
    this._texture = null;
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Textures = new Cache();  // Texture files, loaded into RAM
DOA.Materials = new Cache(); // Materials, based on texture and loaded into GPU memory
DOA.Models = new Cache();    // Models, imported from Blender
DOA.Sounds = new Cache();    // Game sounds

/*
---------------------------------------------------------------------------
Textures
    There are 3 different kinds of texture:
    1. GLobal textures, that is used constantly, like users HUD.
    2. Level textures, that will be used on the game level.
    3. Other textures, that may be loaded in the future.
    And 2 types of material:
    1. Already loaded into GPU memory and used ( based on 1 and 2 textures );
    2. Other materials, that may be loaded in the future.
    Textures are loaded into RAM, Materials are loaded into GPU memory.
---------------------------------------------------------------------------
*/

// PRELOADED

DOA.Textures.add( 'default',      new Texture( 'base/data/textures/default.png' ) ).load();

DOA.Textures.add( 'hud_crossdot', new Texture( 'base/data/textures/crosshairs/crossdot.png' ) ).load();

// REGISTERED
DOA.Textures.add( 'hud_dot',      new Texture( 'base/data/textures/crosshairs/dot.png' ) );
DOA.Textures.add( 'hud_circle',   new Texture( 'base/data/textures/crosshairs/circle.png' ) );
DOA.Textures.add( 'hud_cross',    new Texture( 'base/data/textures/crosshairs/cross.png' ) );
DOA.Textures.add( 'hud_bigcross', new Texture( 'base/data/textures/crosshairs/bigcross.png' ) );
