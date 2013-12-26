/*
=================
Target
    Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.Target = function ( camera ) {
    if ( !(this instanceof Objects.prototype.Target) ) {
        return new Objects.prototype.Target( camera );
    }
    Objects.prototype.Target.super.constructor.call( this );

    this.camera = camera;
    this.camera.position.delta = { x: 0, y: 0, z: 0 };

    this.delta = 1; // time delta

    this.x = camera.position.x;
    this.y = camera.position.y;
    this.z = camera.position.z;

    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.geometry = new THREE.CircleGeometry( 1 );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
};
extend( Objects.prototype.Target, Objects.prototype.DevActor );
