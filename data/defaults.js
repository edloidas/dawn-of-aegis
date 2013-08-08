/**
 * EDLOIDAS DoA
 * DEFAULT SETTINGS
 * 
 * @author edloidas
 * @link edloidas@gmail.com
 */

//=============================================================================
// Defaults
//     Default settings and values. Should not be modified. Will be used at the
//     start initialization and replaced by the LocalStorage data.
//
//=============================================================================
function defaults() {
    this.video = {
        resolution : 'auto',
        renderer   : 'webgl'
    };
    
    this.audio = {
        mute : true
    };
    
    this.language = {
        text : "eng"
    };
}
var defaults = new defaults;


