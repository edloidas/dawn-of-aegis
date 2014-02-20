module.exports = {
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
};