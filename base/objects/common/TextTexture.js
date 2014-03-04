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
