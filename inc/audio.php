<?php
/*

function ml_audio_activation() {
register_activation_hook(__FILE__, 'ml_audio_activation');
}
function ml_audio_deactivation() {
register_deactivation_hook(__FILE__, 'ml_audio_deactivation');
}


add_action( 'wp_enqueue_scripts', 'prefix_enqueue_awesome' );
if ( !function_exists( 'prefix_enqueue_awesome' ) ) {
function prefix_enqueue_awesome() {
$plugins_url = plugins_url();
wp_enqueue_style( 'prefix-new-font-awesome', $plugins_url . '/mlr-audio/font-awesome-4.0.3/css/font-awesome.min.css', array(), '4.0.3' );
}
}
	function add_extra_image_size() {
function ml_insert_audio($atts, $content=null){
	global $post;
	$ml_audio_params = get_option('mlag');
$ml_audio_options = shortcode_atts( array (
        'post_type' => 'ml_audio',
		'posts_per_page' => '-1',
        'order' => $ml_order ? $ml_order : '',
        'orderby' => $ml_orderby ? $ml_orderby : '',
        'audio_category' => '' 
    ), $atts );	

	endwhile; endif; wp_reset_query();

	$mlaudio.= '</ul>

return $mlaudio;
}
add_shortcode('ml_audio', 'ml_insert_audio');
?>