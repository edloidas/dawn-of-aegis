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
		.pipe( gulp.dest( 'lib/' ) );
});

gulp.task( 'update', function() {
	return bower( { cmd: 'update' } );
});

gulp.task( 'fix-path', [ 'bower' ], function() {
	return gulp.src( [
			'lib/stats.js/build/stats.min.js',
			'lib/three.js'
		] )
		.pipe( gulpif( 'lib/stats.js/build/stats.min.js', rename( 'stats.js/build/stats.js' ) ) )
		.pipe( gulp.dest( 'lib/' ) );
});

gulp.task( 'lib', [ 'fix-path' ], function() {
	return gulp.src( [
			'lib/dat.gui/dat.gui.js',
			'lib/dat.gui/dat.color.js',
			'lib/requirejs/require.js',
			'lib/stats.js/build/stats.js',
			'lib/three/three.js'
		] )
		.pipe( gulp.dest( 'lib/' ) );
});


gulp.task( 'clean', function() {
	return del( [
		'lib/dat.gui',
		'lib/requirejs',
		'lib/stats.js',
		'lib/three.js'
	] );
});
