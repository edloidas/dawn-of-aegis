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
    }
};
