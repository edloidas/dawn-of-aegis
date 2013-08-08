/**
 * EDLOIDAS DoA
 * DEFAULT SCRIPT
 * 
 * @author edloidas
 * @link edloidas@gmail.com
 */
 
//=============================================================================
// On page ready
//=============================================================================
$(window).ready(function() {

// back to main menu
$('.back').click(function() {
    $(this).parent().addClass('disabled');
    $('#menu').removeClass('disabled');
});

// show settings
$('#game-settings').click(function() {
    $('#menu').addClass('disabled');    
    $('#settings').removeClass('disabled');
    
    $('#settings-resolution').text(defaults.video.resolution);
    $('#settings-renderer').text(defaults.video.renderer);
    $('#settings-sound').text(defaults.audio.mute ? 'off' : 'on');
    $('#settings-language').text(defaults.language.text);
});
    
});