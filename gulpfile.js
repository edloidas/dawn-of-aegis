var gulp        = require( 'gulp' );
var less        = require( 'gulp-less' );
var minifyCSS   = require( 'gulp-minify-css' );
var bower       = require( 'gulp-bower' );
var rename      = require( 'gulp-rename' );
var gulpif      = require( 'gulp-if');
var del         = require( 'del' );
var path        = require( 'path' );
var runSequence = require( 'run-sequence' );


gulp.task( 'default', [ 'build' ] );

gulp.task( 'build', function () {
	return runSequence(
		[ 'less', 'lib' ],
		'clean'
	);
});


gulp.task( 'less', function () {
	return gulp.src( 'css/style.less' )
		.pipe( less() )
		.pipe( minifyCSS() )
		.pipe( gulp.dest( 'css/' ) );
});


gulp.task( 'bower', function () {
	return bower( { cmd: 'install' } )
		.pipe( gulp.dest( 'lib/bower/' ) );
});

gulp.task( 'update', function () {
	return bower( { cmd: 'update' } );
});

gulp.task( 'lib', [ 'bower' ], function () {
	function isFileByName( name, file ) {
		 return path.basename( file.path ) === name;
	}

	return gulp.src( [
			'lib/bower/dat.gui/dat.gui.js',
			'lib/bower/dat.gui/dat.color.js',
			'lib/bower/requirejs/require.js',
			'lib/bower/stats.js/build/stats.min.js',
			'lib/bower/three.js/three.js'
		] )
		.pipe( gulpif( isFileByName.bind( this, 'stats.min.js' ), rename( 'stats.js' ) ) )
		.pipe( gulp.dest( 'lib/' ) );
});


gulp.task( 'clean', function () {
	return del( 'lib/bower' );
});
