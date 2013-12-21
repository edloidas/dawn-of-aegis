module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: false, // no comments are stripped
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: '\n'
            },
            dist: {
                // Assemble different game objects
                src: [
                    "base/objects/Objects.js",
                    "base/objects/Sprite.js",
                    "base/objects/TexturedPlane.js",
                    "base/objects/DevActor.js",
                    "base/objects/Axis.js",
                    "base/objects/Grid.js",
                    "base/objects/Target.js",
                    "base/objects/TextTexture.js",
                    "base/objects/ObjectsInit.js",
                ],
                dest: 'base/Objects.js',
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat']);
};
