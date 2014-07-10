/**
 * DAWN OF AEGIS
 * A basic server, using node.js with Express
 * @see https://github.com/visionmedia/express
 * @see https://github.com/senchalabs/connect
 * @see https://github.com/senchalabs/connect#middleware
 * @author edloidas
 */

var publicPath = __dirname;


var express = require( 'express' );
var app = express();


var serveStatic = require( 'serve-static' );
app.use( serveStatic( publicPath ) );

var favicon = require( 'serve-favicon' );
app.use( favicon( publicPath + '/favicon.png' ) );

var morgan  = require( 'morgan' );
app.use( morgan( 'dev' ) );

var compression = require( 'compression' );
app.use( compression( { threshold: 4096 } ) );


app.listen(8888);
