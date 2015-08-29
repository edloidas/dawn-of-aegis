/*
=================
TexturedPlane
	Draw square without background.
=================
*/
Objects.prototype.TexturedPlane = function ( size, color, opacity ) {
	if ( !(this instanceof Objects.prototype.TexturedPlane) ) {
		return new Objects.prototype.TexturedPlane( size, opacity );
	}
	Objects.prototype.TexturedPlane.super.constructor.call( this );

	size = size || 32;
	color = color || DOA.Settings.colors.blank;
	opacity = opacity || 1.0;

	this.geometry = new THREE.PlaneGeometry( size, size );
	this.material = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		transparent: true,
		opacity: opacity,
		color: color
	});

	this.mesh = new THREE.Mesh(this.geometry, this.material);
};
extend( Objects.prototype.TexturedPlane, Objects.prototype.Actor );
