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

    this._key     = null;
    this._group   = 'scene';

    /*
     * Adds object to the scene.
     * Should be overridden, in case to another scene usage,
     * instead of overriding enable().
     */
    this._add = function () {
        DOA.World.scene.add( this.mesh );
    };

    /*
     * Removes object from the scene.
     * Should be overridden, in case to another scene usage,
     * instead of overriding enable().
     */
    this._remove = function () {
        DOA.World.scene.remove( this.mesh );
    };

    // Enables object for renderer. Marks active.
    this.enable = function () {
        // add to scene
        this._add();
        // add to engine's object cache
        this._key = this._key || randomHash();
        DOA.Engine._objects.add( this._key, this );
        DOA.Engine._objects.get( this._key ).group = this._group;
        if ( this.mesh instanceof THREE.Mesh ) {
            this.mesh.position.set( this.x, this.y, this.z );
        }
        return this.mesh;
    };

    // Disables object for the renderer. Marks as suspended.
    this.disable = function () {
        // remove from scene
        this._remove();
        // remove from engine's object cache
        DOA.Engine._objects.get( this._key ).group = undefined;

        return this.mesh;
    };
    this.toggle = function () {
        var obj = DOA.Engine._objects.get( this._key );
        if ( obj === undefined || obj.group === undefined ) {
            this.enable();
        } else {
            this.disable();
        }
    };

    // Method to animate mesh in the Engine cycle.
    this.animate = function ( delta ) {
    };

    this.setX = function ( x ) { this.x = x; this.mesh.position.x = x; };
    this.setY = function ( y ) { this.y = y; this.mesh.position.y = y; };
    this.setZ = function ( z ) { this.z = z; this.mesh.position.z = z; };
    this.setPosition = function ( x, y, z ) {
        if ( typeof x === 'number' ) this.setX( x );
        if ( typeof y === 'number' ) this.setY( y );
        if ( typeof z === 'number' ) this.setZ( z );
    };
};

/*
=================
World
    Entity, that represents space, with a specific properties:
    gravity, world type (map, level), global lightning, etc.
=================
*/
Objects.prototype.World = function () {
    if ( !(this instanceof Objects.prototype.World) ) return new this.World();
};

/*
=================
DevActor
    Represents extended version of an actor,
    with the engine object list support.
=================
*/
Objects.prototype.DevActor = function () {
    if ( !(this instanceof Objects.prototype.DevActor) ) {
        return new Objects.prototype.DevActor();
    }
    Objects.prototype.DevActor.super.constructor.call( this );

    this._group = 'dev';
};
extend( Objects.prototype.DevActor, Objects.prototype.Actor );

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

    material = material || ( new THREE.SpriteMaterial({ color: DOA.Settings.colors.blank }) );

    this.material = material;
    this.mesh = new THREE.Sprite( this.material );
    // Orthogonal camera:
    // For the `useScreenCoordinates: false` scale x and y must be <= 1.0
    // this.mesh.scale.set( 1, 1, 1 );
    // For the `useScreenCoordinates: true` scale is an actual size in px
    this.mesh.scale.set( width, height, depth );
};
extend( Objects.prototype.Sprite, Objects.prototype.Actor );

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

/*
=================
TextTexture
    Creates texture from canvas.
    text - message to be displayed in canvas.

    Texture (canvas) wont be updated properly, after linking it to the sprite.
    So the width and height should be set manually on the init stage.
=================
*/
Objects.prototype.TextTexture = function ( text, param ) {
    if ( !(this instanceof Objects.prototype.TextTexture) ) {
        return new Objects.prototype.TextTexture( text, param );
    }
    Objects.prototype.TextTexture.super.constructor.call( this );

    // initialization
    this.text = text || "";
    this.param = param || {};

    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = this.param.width || 256;
    this.canvas.height = this.param.height || 256;
    this.context = this.canvas.getContext( '2d' );

    this.initParam = function ( param ) {
        param = param || {};

        param.fontface = param.fontface || DOA.Settings.fontface;
        param.fontweight = param.fontweight || "normal";
        param.fontsize = param.fontsize || 24;

        param.borderWidth = param.borderWidth || 0;
        param.borderRadius = param.borderRadius || 0;

        param.color = param.color || DOA.Colors.text;
        param.bgColor = param.bgColor || DOA.Colors.blank;
        param.borderColor = param.borderColor || DOA.Colors.text;

        param.opacity  = param.opacity || 1.0;
        param.bgOpacity  = param.bgOpacity || 0.0;
        param.borderOpacity  = param.borderOpacity || 0.0;
    };
    this.initParam( this.param );

    this.init = function () {
        // for future use
        this.fontsize = this.param.fontsize;
        this.borderWidth = this.param.borderWidth;

        this.context.font = this.param.fontweight + " " +
                            this.param.fontsize + "px " +
                            this.param.fontface;

        // background color
        var color = new THREE.Color( this.param.bgColor );
        this.context.fillStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                            color.b + ", " + this.param.bgOpacity + " )";
        // border color
        color.setHex( this.param.color );
        this.context.strokeStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                              color.b + ", " + this.param.borderOpacity + " )";

        this.context.lineWidth = this.param.borderWidth;

        // 1.4 - extra height for the text below baseline: g, j, p, q
        var x = this.param.borderWidth / 2,
            y = this.param.borderWidth / 2,
            w = this.context.measureText( this.text ).width + this.param.borderWidth,
            h = this.param.fontsize * 1.4 + this.param.borderWidth,
            r = this.param.borderRadius;

        this.context.beginPath();
        this.context.moveTo( x + r, y );
        this.context.lineTo( x + w - r, y );
        this.context.quadraticCurveTo( x + w, y, x + w, y + r );
        this.context.lineTo( x + w, y + h - r );
        this.context.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
        this.context.lineTo( x + r, y + h );
        this.context.quadraticCurveTo( x, y + h, x, y+ h - r );
        this.context.lineTo( x, y + r );
        this.context.quadraticCurveTo( x, y, x + r , y );
        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        // text color
        color.setHex( this.param.color );
        this.context.fillStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                            color.b + ", " + this.param.opacity + " )";

        this.context.fillText( this.text, this.param.borderWidth,
                               this.param.fontsize + this.param.borderWidth );

        this.needsUpdate = true;
    };
    this.init();

    // canvas contents will be used for a texture
    this.image = this.canvas;

    /**
     * Updates canvas content.
     * @param  {String}  text     canvas text.
     * @param  {Object}  param    configuration parameters.
     * @param  {Boolean} isForced flag, that indicates forced update usage.
     *                            Forced update will update canvas size.
     */
    this.update = function ( text, param, isForced ) {
        isForced = isForced || false;

        this.context.save();
        this.context.setTransform( 1, 0, 0, 1, 0, 0 );
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.context.restore();

        if ( isForced ) {
            this.initParam( param );
            this.param = param;
        } else {
            // do copy
            mixin( this.param, param );
        }

        this.text = text || this.text;
        this.init();
    };

    this.forcedUpdate = function ( text, param ) {
        this.update( text, param, true );
    };

    this.getWidth = function () {
        return this.canvas.width;
    };

    this.getHeight = function () {
        return this.canvas.height;
    };
};
extend( Objects.prototype.TextTexture, THREE.Texture );

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
};
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
};
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

    this.isEnabled = true;

    this.delta = 1; // time delta

    this.x = camera.position.x;
    this.y = camera.position.y;
    this.z = camera.position.z;

    this.geometry = new THREE.SphereGeometry( 50, 8, 6 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
};
extend( Objects.prototype.Target, Objects.prototype.Actor );

/*
=================
PlaneTarget
    Entity, that represents target, followed by camera.
    Proper work with the target includes three steps:
    1. Set time delta for the animation frame;
    2. Add actions;
    3. Run animate() method. It will optimize calculations and reset all data.
    Method look() is handled separately.
=================
*/
Objects.prototype.PlaneTarget = function ( camera ) {
    if ( !(this instanceof Objects.prototype.PlaneTarget) ) {
        return new Objects.prototype.PlaneTarget( camera );
    }
    Objects.prototype.PlaneTarget.super.constructor.call( this, camera );

    var self = this; // variable for 'private' methods

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.velocity = 700; // movement speed
    this.radius = 500;
    this.theta = -90;
    this.phi = 45;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    var dv   = 0, // delta * velocity
        dr   = 0, // delta * radius
        degt = 0,
        degp = 0;

    var flags = 0; // binary data 1111 11 11
                   // 1 - top, 2 - bottom, 4 - left, 8 - right
                   // 16 - rotate left, 32 - rotate right
                   // 64 - tilt up, 128 - tilt down
                   // 256 - zoom in, 512 - zoom out

    this.look = function ( wx, wy ) {
        wx = wx || 0;
        wy = wy || 0;

        /* See http://mathworld.wolfram.com/SphericalCoordinates.html
         *    z             y
         *    |__ y  ==>    |__ x
         * x /           z /
         *   x = r * cos(theta) * sin(phi)
         *   y = r * sin(theta) * sin(phi)
         *   z = r * cos(phi)
         */
        this.theta -= wx * this.omega;
        this.theta %= 360;
        this.phi += wy * this.omega;
        this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.midLook, this.phi ) );

        degt = THREE.Math.degToRad( this.theta );
        degp = THREE.Math.degToRad( this.phi );

        this.camera.position.x = this.x + this.radius * Math.cos( degt )
                                                      * Math.sin( degp );
        this.camera.position.y = this.y + this.radius * Math.cos( degp );
        this.camera.position.z = this.z + this.radius * Math.sin( degt )
                                                      * Math.sin( degp );
        updateMesh();

        this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
    };

    this.zoom = function ( code ) {
        if ( code < 0 ) {
            this.radius += DOA.Settings.zoomStep;
        } else {
            this.radius -= DOA.Settings.zoomStep;
        }
        this.radius = Math.max( DOA.Settings.nearZoom, Math.min( DOA.Settings.farZoom, this.radius ) );
        this.look();
    };

    this.moveTop     = function () { flags |=   1; };
    this.moveBottom  = function () { flags |=   2; };
    this.moveLeft    = function () { flags |=   4; };
    this.moveRight   = function () { flags |=   8; };

    this.rotateLeft  = function () { flags |=  16; };
    this.rotateRight = function () { flags |=  32; };

    this.tiltUp      = function () { flags |=  64; };
    this.tiltDown    = function () { flags |= 128; };

    this.zoomIn      = function () { flags |= 256; };
    this.zoomOut     = function () { flags |= 512; };

    this.update = function ( delta, direction ) {
        direction = direction || 0;
        flags |= direction;

        dv = delta * this.velocity;
        dr = 0.05 / delta;

        // reset before
        this.camera.position.delta.x = 0;
        this.camera.position.delta.z = 0;

        var deg = 0,
            wx  = 0,
            wy  = 0;

        // !@ theta and phi should be calculated before move the camera.
        // !@ Otherwise, it may cause drift.

        // rotate left and right compensates each other
        if ( !( flags & 16 ) ^ !( flags & 32 ) ) {
            if ( flags & 16 ) {
                this.theta += dr;
            } else { // flags & 32
                this.theta -= dr ;
            }
            this.theta %= 360;
        }

        // tilt up and down compensates each other
        if ( !( flags & 64 ) ^ !( flags & 128 ) ) {
            if ( flags & 64 ) {
                this.phi -= dr;
            } else { // flags & 128
                this.phi += dr;
            }
            this.phi = Math.max( DOA.Settings.minLook, Math.min( DOA.Settings.midLook, this.phi ) );
        }

        // zoom in and out compensates each other
        if ( !( flags & 256 ) ^ !( flags & 512 ) ) {
            if ( flags & 256 ) {
                this.radius -= dv;
            } else { // flags & 128
                this.radius += dv;
            }
            this.radius = Math.max( DOA.Settings.nearZoom, Math.min( DOA.Settings.farZoom, this.radius ) );
        }

        degt = THREE.Math.degToRad( this.theta );
        degp = THREE.Math.degToRad( this.phi );

        // move top and bottom compensates each other
        if ( !( flags & 1 ) ^ !( flags & 2 ) ) {
            degt = THREE.Math.degToRad( this.theta );
            if ( flags & 1 ) {
                decrementHorizontal( degt );
            } else { // flags & 2
                incrementHorizontal( degt );
            }
        }

        // move left and right compensates each other
        if ( !( flags & 4 ) ^ !( flags & 8 ) ) {
            if ( flags & 4 ) {
                deg = degt + Math.PI_2;
            } else { // flags & 8
                deg = degt - Math.PI_2;
            }
            incrementHorizontal( deg );
        }

        // update position
        if ( flags &  1008 ) { // any flag, except moves
            this.camera.position.x = this.x + this.radius * Math.cos( degt )
                                                          * Math.sin( degp );
            this.camera.position.y = this.y + this.radius * Math.cos( degp );
            this.camera.position.z = this.z + this.radius * Math.sin( degt )
                                                          * Math.sin( degp );
        }
        this.camera.lookAt( new THREE.Vector3( this.x, this.y, this.z ) );
        updateMesh();

        this.camera.position.x += camera.position.delta.x;
        this.camera.position.z += camera.position.delta.z;
        this.x += camera.position.delta.x;
        this.z += camera.position.delta.z;

        updateMesh();
        // reset after
        flags = 0;
    };

    function incrementHorizontal( deg ) {
        self.camera.position.delta.x += dv * Math.cos( deg );
        self.camera.position.delta.z += dv * Math.sin( deg );
    }

    function decrementHorizontal( deg ) {
        self.camera.position.delta.x -= dv * Math.cos( deg );
        self.camera.position.delta.z -= dv * Math.sin( deg );
    }

    function updateMesh() {
        if ( self.isEnabled ) {
            self.mesh.position.x = self.x;
            self.mesh.position.y = self.y;
            self.mesh.position.z = self.z;
        }
    }
};
extend( Objects.prototype.PlaneTarget, Objects.prototype.Target );

/*
=================
VolumeTarget
    Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.VolumeTarget = function ( camera ) {
    if ( !(this instanceof Objects.prototype.VolumeTarget) ) {
        return new Objects.prototype.VolumeTarget( camera );
    }
    Objects.prototype.VolumeTarget.super.constructor.call( this, camera );

    this.isEnabled = false;

    this.omega = DOA.Settings.mouseSensitivity;  // radial speed
    this.velocity = 300; // movement speed
    this.radius = 200;
    this.theta = -90;
    this.phi = 90;

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

        if ( this.isEnabled ) {
            this.mesh.rotation.x = this.camera.rotation.x;
            this.mesh.rotation.y = this.camera.rotation.y;
            this.mesh.rotation.z = this.camera.rotation.z;
        }
    };

    this.moveForward = function () {
        this.calcDelta();

        camera.position.x += camera.position.delta.x;
        camera.position.y += camera.position.delta.y;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.y += camera.position.delta.y;
        this.z += camera.position.delta.z;

        this.updateMesh();
    };

    this.moveBackward = function () {
        this.calcDelta();

        camera.position.x -= camera.position.delta.x;
        camera.position.y -= camera.position.delta.y;
        camera.position.z -= camera.position.delta.z;

        this.x -= camera.position.delta.x;
        this.y -= camera.position.delta.y;
        this.z -= camera.position.delta.z;

        this.updateMesh();
    };

    this.moveLeft = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) + Math.PI_2 );
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) + Math.PI_2 );

        this.updatePlane();
    };

    this.moveRight = function () {
        camera.position.delta.x = -this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) - Math.PI_2);
        camera.position.delta.z = -this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) - Math.PI_2);

        this.updatePlane();
    };

    this.calcDelta = function () {
        camera.position.delta.x = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.y = this.delta * this.velocity * Math.cos( THREE.Math.degToRad( this.phi ) );
        camera.position.delta.z = this.delta * this.velocity * Math.sin( THREE.Math.degToRad( this.theta ) )
                                                             * Math.sin( THREE.Math.degToRad( this.phi ) );
    };

    this.updateMesh = function () {
        if ( this.isEnabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.y = this.y;
            this.mesh.position.z = this.z;
        }
    };

    this.updatePlane = function () {
        camera.position.x += camera.position.delta.x;
        camera.position.z += camera.position.delta.z;

        this.x += camera.position.delta.x;
        this.z += camera.position.delta.z;

        if ( this.isEnabled ) {
            this.mesh.position.x = this.x;
            this.mesh.position.z = this.z;
        }
    };
};
extend( Objects.prototype.VolumeTarget, Objects.prototype.Target );

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Objects = new Objects();
