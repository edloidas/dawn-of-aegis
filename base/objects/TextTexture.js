/*
=================
TextTexture
    Creates texture from canvas.
    text - message to be displayed in canvas.
=================
*/
Objects.prototype.TextTexture = function ( text, param ) {
    if ( !(this instanceof Objects.prototype.TextTexture) ) {
        return new Objects.prototype.TextTexture( text, param );
    }
    Objects.prototype.TextTexture.super.constructor.call( this );

    this.canvas = document.createElement( 'canvas' );
    this.context = this.canvas.getContext( '2d' );

    // initialization
    text = text || "";
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

    // for future use
    this.fontsize = param.fontsize;
    this.borderWidth = param.borderWidth;

    this.context.font = param.fontweight + " " +
                        param.fontsize + "px " +
                        param.fontface;

    // background color
    var color = new THREE.Color( param.bgColor );
    this.context.fillStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                        color.b + ", " + param.bgOpacity + " )";
    // border color
    color.setHex( param.color );
    this.context.strokeStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                          color.b + ", " + param.borderOpacity + " )";

    this.context.lineWidth = param.borderWidth;

    // 1.4 - extra height for the text below baseline: g, j, p, q
    var x = param.borderWidth / 2,
        y = param.borderWidth / 2,
        w = this.context.measureText( text ).width + param.borderWidth,
        h = param.fontsize * 1.4 + param.borderWidth,
        r = param.borderRadius;

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
    color.setHex( param.color );
    this.context.fillStyle = "rgba( " + color.r + ", " + color.g + ", " +
                                        color.b + ", " + param.opacity + " )";

    this.context.fillText( text, param.borderWidth, param.fontsize + param.borderWidth );

    // canvas contents will be used for a texture
    this.image = this.canvas;
    this.needsUpdate = true;

    this.updateText = function ( text ) {
        // Need to redraw bg and border.
        this.context.save();
        this.context.setTransform( 1, 0, 0, 1, 0, 0 );
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.context.restore();
        this.context.fillText( text, this.borderWidth, this.fontsize + this.borderWidth );
        this.needsUpdate = true;
    }

    this.getWidth = function () {
        return this.canvas.width;
    }

    this.getHeight = function () {
        return this.canvas.height;
    }
}
extend( Objects.prototype.TextTexture, THREE.Texture );
