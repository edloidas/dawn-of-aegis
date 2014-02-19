module.exports = {
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
};
