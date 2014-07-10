module.exports = function( grunt ) {
    grunt.registerTask( 'default', [ 'build', 'connect' ] );

    grunt.registerTask( 'css',     [ 'less' ] );
    grunt.registerTask( 'update',  [ 'concurrent:update' ] );
    grunt.registerTask( 'server',  [ 'connect' ] );

    grunt.registerTask( 'build',   [ 'css', 'update', 'concurrent:concat', 'newer:jshint' ] );
    grunt.registerTask( 'dist',    [ 'build', 'newer:uglify' ] );
}
