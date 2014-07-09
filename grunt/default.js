module.exports = function( grunt ) {
    grunt.registerTask( 'default', [ 'concurrent:concat', 'connect' ] );
    grunt.registerTask( 'dist',    [ 'concurrent:concat', 'newer:jshint', 'newer:uglify' ] );
    grunt.registerTask( 'build',   [ 'concurrent:concat', 'newer:jshint' ] );
    grunt.registerTask( 'css',     [ 'newer:csscomb', 'newer:less' ] );
    grunt.registerTask( 'server',  [ 'connect' ] );
}
