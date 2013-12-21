/*
=================
Sprite
    Draws sprite image.
    If height is undefined, it will be equals to width.
=================
*/
Objects.prototype.Sprite = function ( material, width, height, depth ) {
    if ( !(this instanceof Objects.prototype.Sprite) ) {
        return new Objects.prototype.Sprite( size, material, opacity );
    }
    Objects.prototype.Sprite.super.constructor.call( this );

    width = width || 32;
    height = height || width;
    depth = depth || 1.0;

    material = material || ( THREE.SpriteMaterial({ color: DOA.Settings.colors.blank }) );

    this.material = material;
    this.mesh = new THREE.Sprite( this.material );
    // Orthogonal camera:
    // For the `useScreenCoordinates: false` scale x and y must be <= 1.0
    // this.mesh.scale.set( 1, 1, 1 );
    // For the `useScreenCoordinates: true` scale is an actual size in px
    this.mesh.scale.set( width, height, depth );
}
extend( Objects.prototype.Sprite, Objects.prototype.Actor );
