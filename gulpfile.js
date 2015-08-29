var gulp        = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var less        = require( 'gulp-less' );
var minifyCSS   = require( 'gulp-minify-css' );
var bower       = require( 'gulp-bower' );
var rename      = require( 'gulp-rename' );
var concat      = require( 'gulp-concat' );
var gulpif      = require( 'gulp-if');
var unzip       = require( 'decompress-unzip' );
var vinylAssign = require( 'vinyl-assign' );
var fs          = require( 'fs' );
var request     = require( 'request' );
var path        = require( 'path' );
var del         = require( 'del' );

var dir = {
	base:     'base/',
	lib:      'lib/',
	css:      'css/',
	data:     'base/data/',
	libBower: 'lib/bower/'
};


// Common tasks

gulp.task( 'default', [ 'build' ] );

gulp.task( 'build', function () {
	return runSequence(
		[ 'less', 'lib', 'compile-objects', 'compile-player' ],
		'clean'
	);
});


// Styles

gulp.task( 'less', function () {
	return gulp.src( dir.css + 'style.less' )
		.pipe( less() )
		.pipe( minifyCSS() )
		.pipe( gulp.dest( dir.css ) );
});


// Libraries

gulp.task( 'bower', function () {
	return bower( { cmd: 'install' } )
		.pipe( gulp.dest( dir.libBower ) );
});

gulp.task( 'update', function () {
	return bower( { cmd: 'update' } );
});

gulp.task( 'lib', [ 'bower' ], function () {
	function isFileByName( name, file ) {
		 return path.basename( file.path ) === name;
	}

	return gulp.src( [
			dir.libBower + 'dat.gui/dat.gui.js',
			dir.libBower + 'dat.gui/dat.color.js',
			dir.libBower + 'requirejs/require.js',
			dir.libBower + 'stats.js/build/stats.min.js',
			dir.libBower + 'three.js/three.js'
		] )
		.pipe( gulpif( isFileByName.bind( null, 'stats.min.js' ), rename( 'stats.js' ) ) )
		.pipe( gulp.dest( dir.lib ) );
});


// Sources

// compile-objects
// compile-player
(function () {
	var items = [
		[
			'objects',
			'Objects.js',
			[ 'Objects.js', 'DevActor.js', 'astro/**', 'common/**', 'dev/**', 'target/Target.js', 'target/**', '_init.js' ]
		],
		[
			'player',
			'Player.js',
			[ 'Player.js', 'DefaultPlayer.js', 'AltPlayer.js', '_init.js' ]
		]
	];

	items.forEach( function ( item ) {
		item[ 2 ] = item[ 2 ].map( function ( path ) { return dir.base + item[ 0 ] + '/' + path; } );
		gulp.task( 'compile-' + item[ 0 ], function () {
			return gulp.src( item[ 2 ] ).pipe( concat( item[ 1 ] ) ).pipe( gulp.dest( dir.base ) );
		});
	});
})();


// Binary data

gulp.task( 'data', function () {
	var dataUrl = 'https://dl.dropboxusercontent.com/u/40688668/base.zip';
	var zipFile = 'base.zip';

	// TODO Remove the downloaded zip
	 return request( dataUrl )
		.pipe( fs.createWriteStream( zipFile ) )
		.on( 'close', function () {
		 return gulp.src( zipFile )
			.pipe( vinylAssign( { extract: true } ) )
			.pipe( unzip( { strip: 1 } ) );
		});
});


// Clean

gulp.task( 'clean', function () {
	return del( dir.libBower );
});
