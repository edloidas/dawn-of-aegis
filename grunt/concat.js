module.exports = {
    options: {
        stripBanners: false, // no comments are stripped
        separator: '\n'
    },
    objects: {
        // Assemble different game objects
        src: [
            // main
            "base/objects/Objects.js",
            "base/objects/DevActor.js",
            // common
            "base/objects/common/Sprite.js",
            "base/objects/common/TexturedPlane.js",
            "base/objects/common/TextTexture.js",
            // dev
            "base/objects/dev/Axis.js",
            "base/objects/dev/Grid.js",
            // target
            "base/objects/target/Target.js",
            "base/objects/target/PlaneTarget.js",
            "base/objects/target/VolumeTarget.js",
            // initialization
            "base/objects/_init.js"
        ],
        dest: "base/Objects.js"
    },
    player: {
        // Assemble different game objects
        src: [
            "base/player/Player.js",
            "base/player/DefaultPlayer.js",
            "base/player/AltPlayer.js",
            "base/player/_init.js"
        ],
        dest: "base/Player.js"
    },
    yepnope: {
        src:  [ "bower_components/yepnope/yepnope.js" ],
        dest: "lib/yepnope.js"
    },
    modernizr: {
        src:  [ "bower_components/modernizr/modernizr.js" ],
        dest: "lib/modernizr.js"
    },
    threejs: {
        src:  [ "bower_components/threejs/build/three.js" ],
        dest: "lib/three.js"
    },
    statsjs: {
        src:  [ "bower_components/stats.js/src/Stats.js" ],
        dest: "lib/stats.js"
    },
    datgui: {
        src:  [ "bower_components/dat.gui/dat.gui.js" ],
        dest: "lib/dat.gui.js"
    }
};
