// See http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/
module.exports = function( grunt ) {
    // measures the time each task takes
    require( 'time-grunt' )( grunt );

    // Replacement for the `grunt.loadNpmTasks()`
    require( 'load-grunt-config' )( grunt );
};
