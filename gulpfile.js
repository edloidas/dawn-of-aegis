var gulp = require( 'gulp' );
var bower = require( 'gulp-bower' );
var less = require( 'gulp-less' );
var minifyCSS = require( 'gulp-minify-css' );
var del = require( 'del' );
var rename = require( 'gulp-rename' );
var gulpif = require('gulp-if');
var runSequence = require( 'run-sequence' );

gulp.task( 'default', [ 'build' ] );

gulp.task( 'build', function() {
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

gulp.task( 'bower', function() {
	return bower( { cmd: 'install' } )
		.pipe( gulp.dest( 'lib/bower/' ) );
});

gulp.task( 'update', function() {
	return bower( { cmd: 'update' } );
});

gulp.task( 'lib', [ 'bower' ], function() {
	return gulp.src( [
			'lib/bower/dat.gui/dat.gui.js',
			'lib/bower/dat.gui/dat.color.js',
			'lib/bower/requirejs/require.js',
			'lib/bower/stats.js/build/stats.min.js',
			'lib/bower/three.js/three.js'
		] )
		.pipe( gulpif( 'lib/bower/stats.js/build/stats.min.js', rename( 'stats.js' ) ) )
		.pipe( gulpif( 'bower/stats.js/build/stats.min.js', rename( 'stats.js' ) ) )
		.pipe( gulpif( 'stats.min.js', rename( 'stats.js' ) ) )
		.pipe( gulp.dest( 'lib/' ) );
});


gulp.task( 'clean', function() {
	return del( 'lib/bower' );
});
