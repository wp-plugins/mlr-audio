<?php
add_action('admin_menu', 'ml_audio_plugin_settings');
function ml_audio_plugin_settings() {
function ml_audio_plugin_display() { ?>
<?php settings_errors(); ?> 
<form id="ml_audio_opts" method="post" action="options.php">
</div><!----End Wrap---->
<?php }  // End plugin display
//== Register section ==//
add_action( 'admin_init', 'ml_audio_options_mlsettings' );
function ml_audio_options_mlsettings() {	
//== Add our sections ==//
add_settings_section(
//== Add our player settings fields to be included in our section ==//
add_settings_field(
//== Section Callbacks ==//
function ml_audio_options_callback() {
//== Callback functions for the general settings ==//
function ml_audio_select_display_width_callback() {
        $html = '<input type="text" style="width:30px;" id="ml_player_width" name="mlag[audio_width]" value="' .$options['audio_width']. '"> px';
}
function ml_audio_playlist_height_callback() {
	echo $html;	
}
?>