module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        concat: {
            options: {
                stripBanners: false, // no comments are stripped
                separator: '\n'
            },
            objects: {
                // Assemble different game objects
                src: [
                    "base/objects/Objects.js",
                    "base/objects/Sprite.js",
                    "base/objects/TexturedPlane.js",
                    "base/objects/DevActor.js",
                    "base/objects/Axis.js",
                    "base/objects/Grid.js",
                    "base/objects/Target.js",
                    "base/objects/PlaneTarget.js",
                    "base/objects/VolumeTarget.js",
                    "base/objects/TextTexture.js",
                    "base/objects/_init.js",
                ],
                dest: 'base/Objects.js',
            },
            player: {
                // Assemble different game objects
                src: [
                    "base/player/Player.js",
                    "base/player/DefaultPlayer.js",
                    "base/player/AltPlayer.js",
                    "base/player/_init.js",
                ],
                dest: 'base/Player.js',
            }
        },
        jshint: {
            options: {
                laxbreak: true
            },
            all: [ 'base/*.js', 'base/objects/*.js' ]
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    "dist/base/loader.js"   : [ "base/loader.js" ],
                    "dist/base/Utils.js"    : [ "base/Utils.js" ],
                    "dist/base/Settings.js" : [ "base/Settings.js" ],
                    "dist/base/Objects.js"  : [ "base/Objects.js" ],
                    "dist/base/Caches.js"   : [ "base/Caches.js" ],
                    "dist/base/Player.js"   : [ "base/Player.js" ],
                    "dist/base/UI.js"       : [ "base/UI.js" ],
                    "dist/base/World.js"    : [ "base/World.js" ],
                    "dist/base/Engine.js"   : [ "base/Engine.js" ],
                    "dist/base/Game.js"     : [ "base/Game.js" ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    hostname: 'localhost',
                    base: '.',
                    keepalive: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );

    // Default task(s).
    grunt.registerTask( 'default', [ 'concat', 'connect' ] );
    grunt.registerTask( 'dist',    [ 'concat', 'jshint', 'uglify' ] );
    grunt.registerTask( 'build',   [ 'concat', 'jshint' ] );
    grunt.registerTask( 'server',  [ 'connect' ] );
};
