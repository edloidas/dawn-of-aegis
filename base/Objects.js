/*
===============================================================================

    Class compilation defines in-game 3D objects.

===============================================================================
*/
function Objects() {
    if ( !(this instanceof Objects) ) return new Objects();
}

/*
=================
Actor
    Entity, that represents object in space.
=================
*/
Objects.prototype.Actor = function ( x, y, z ) {
    if ( !(this instanceof Objects.prototype.Actor) ) return new Objects.prototype.Actor();

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

    this.material = null;
    this.geometry = null;
    this.mesh     = null;

    this.objects = null;

    // Can be overridden.
    // Should do all initial work, before adding to the scene.
    this.create = function ( objects ) {
        this.objects = objects || DOA.Engine.__objects;
        this.objects.push( this );
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    }
    // Can be overridden.
    // Should do all initial work, before removing from scene.
    this.clear = function () {
        this.objects.pop( this );
        return this.mesh;
    }

    this.setX = function ( x ) { this.x = x; this.mesh.position.x = x; }
    this.setY = function ( y ) { this.y = y; this.mesh.position.y = y; }
    this.setZ = function ( z ) { this.z = z; this.mesh.position.z = z; }
    this.setPosition = function ( x, y, z ) {
        if ( typeof x === 'number' ) this.setX( x );
        if ( typeof y === 'number' ) this.setY( y );
        if ( typeof z === 'number' ) this.setZ( z );
    }
}

/*
=================
World
    Entity, that represents space, with a specific properties:
    gravity, world type (map, level), global lightning, etc.
=================
*/
Objects.prototype.World = function () {
    if ( !(this instanceof Objects.prototype.World) ) return new this.World();
}

/*
---------------------------------------------------------------------------
HUD Objects
---------------------------------------------------------------------------
*/

/*
=================
HudSprite
    Draw sprite image.
=================
*/
Objects.prototype.HudSprite = function ( size, texture, opacity ) {
    if ( !(this instanceof Objects.prototype.HudSprite) ) {
        return new Objects.prototype.HudSprite( size, opacity );
    }
    Objects.prototype.HudSprite.super.constructor.call( this );

    size = size || 32;
    opacity = opacity || 1.0;
    texture = texture || THREE.ImageUtils.loadTexture( 'base/data/textures/default.png' );

    this.material = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: true,
        alignment: THREE.SpriteAlignment.center,
        opacity: opacity,
        color: DOA.Settings.colors.blank
    });

    this.mesh = new THREE.Sprite( this.material );
    // For the `useScreenCoordinates: false` scale x and y must be <= 1.0
    // this.mesh.scale.set( 1, 1, 1 );
    // For the `useScreenCoordinates: true` scale is an actual size in px
    this.mesh.scale.set( size, size, 1.0 );
}
extend( Objects.prototype.HudSprite, Objects.prototype.Actor );


/*
---------------------------------------------------------------------------
Game Objects
---------------------------------------------------------------------------
*/

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
}
extend( Objects.prototype.TexturedPlane, Objects.prototype.Actor );

/*
---------------------------------------------------------------------------
DEV Objects
---------------------------------------------------------------------------
*/
/*
=================
Axis
    Represents axis, as three vectors.
=================
*/
Objects.prototype.DevActor = function () {
    if ( !(this instanceof Objects.prototype.DevActor) ) {
        return new Objects.prototype.DevActor();
    }
    Objects.prototype.DevActor.super.constructor.call( this );

    this.enabled = false;

    this.create = function () {
        DOA.Engine.__devobjects.push( this );
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    }
    this.clear = function () {
        DOA.Engine.__devobjects.pop( this );
        return this.mesh;
    }
}
extend( Objects.prototype.DevActor, Objects.prototype.Actor );

/*
=================
Axis
    Represents axis, as three vectors.
=================
*/
Objects.prototype.Axis = function () {
    if ( !(this instanceof Objects.prototype.Axis) ) {
        return new Objects.prototype.Axis();
    }
    Objects.prototype.Axis.super.constructor.call( this );

    this.mesh = new THREE.AxisHelper( DOA.Settings.maxView );
}
extend( Objects.prototype.Axis, Objects.prototype.DevActor );

/*
=================
Grid
    Represents grid on xz coordinates.
=================
*/
Objects.prototype.Grid = function ( step ) {
    if ( !(this instanceof Objects.prototype.Grid) ) {
        return new Objects.prototype.Grid( step );
    }
    Objects.prototype.Grid.super.constructor.call( this );

    step = step || 50;

    this.mesh = new THREE.GridHelper( DOA.Settings.maxView, step );
}
extend( Objects.prototype.Grid, Objects.prototype.DevActor );

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

    this.enabled = false;
    this.delta = 1; // time delta

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.velocity = 300; // movement speed
    this.radius = 200;
    this.theta = -90;
    this.phi = 90;

    this.x = camera.position.x;
    this.y = camera.position.y;
    this.z = camera.position.z;

    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.geometry = new THREE.CircleGeometry( 1 );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.look = function ( wx, wy ) {
        /* See http://mathworld.wolfram.com/SphericalCoordinates.html
         *    z             y
         *    |__ y  ==>    |__ x
         * x /           z /
         *   x = r * cos(theta) * sin(phi)
         *   y = r * sin(theta) * sin(phi)
         *   z = r * cos(phi)
         */
        this.theta += wx * this.omega;
        this.theta %= 360;
        this.phi += wy * this.omega;
        this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.maxLook, this.phi ) );

        this.x = camera.position.x + this.radius * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        this.y = camera.position.y + this.radius * Math.cos( THREE.Math.degToRad( this.phi ) );
        this.z = camera.position.z + this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                 * Math.sin( THREE.Math.degToRad( this.phi ) );
        this.updateMesh();

        this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );

        if ( this.enabled ) {
            this.mesh.rotation.x = this.camera.rotation.x;
            this.mesh.rotation.y = this.camera.rotation.y;
            this.mesh.rotation.z = this.camera.rotation.z;
        }
    }

    this.moveForward = function () {
        this.calcDelta();

        camera.position.x += camera.position.delta.x;
        camera.position.y += camera.position.delta.y;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.y += camera.position.delta.y;
        this.z += camera.position.delta.z;

        this.updateMesh();
    }

    this.moveBackward = function () {
        this.calcDelta();

        camera.position.x -= camera.position.delta.x;
        camera.position.y -= camera.position.delta.y;
        camera.position.z -= camera.position.delta.z;

        this.x -= camera.position.delta.x;
        this.y -= camera.position.delta.y;
        this.z -= camera.position.delta.z;

        this.updateMesh();
    }

    this.moveLeft = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) + Math.PI_2 );
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) + Math.PI_2 );

        this.updatePlane();
    }

    this.moveRight = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) - Math.PI_2);
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) - Math.PI_2);

        this.updatePlane();
    }


    this.calcDelta = function () {
        camera.position.delta.x = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.y = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.z = this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
    }

    this.updateMesh = function () {
        if ( this.enabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.y = this.y;
            this.mesh.position.z = this.z;
        }
    }

    this.updatePlane = function () {
        camera.position.x += camera.position.delta.x;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.z += camera.position.delta.z;

        if ( this.enabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.z = this.z;
        }
    }
}
extend( Objects.prototype.Target, Objects.prototype.DevActor );

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Objects = new Objects();
