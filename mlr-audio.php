<?php
/**
 * Plugin Name: MLR Audio
 * Plugin URI: http://matthewlillistone.co.uk/
 * Description: This plugin provides an HTML5 Audio player for your wordpress theme..
 * Version: 0.1
 * Author: Matthew Lillistone
 * Author URI: http://matthewlillistone.co.uk
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU 
 * General Public License as published by the Free Software Foundation; either version 2 of the License, 
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 *
 * @package   MLRAudio
 * @version   0.1
 * @since     0.1
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * @copyright Copyright (c) 2013 - 2014, Matthew Lillistone
 * @link      http://matthewlillistone.co.uk
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

/**
 * Sets up the MLAudio plugin.
 *
 * @since  0.1
 */
final class MLR_Audio_Plugin {

        /**
         * Holds the instance of this class.
         *
         * @since  0.1
         * @access private
         * @var    object
         */
        private static $instance;

        /**
         * Stores the directory path for this plugin.
         *
         * @since  0.1
         * @access private
         * @var    string
         */
        private $directory_path;

        /**
         * Stores the directory URI for this plugin.
         *
         * @since  0.1
         * @access private
         * @var    string
         */
        private $directory_uri;

        /**
         * Plugin setup.
         *
         * @since  0.1
         * @access public
         * @return void
         */
        public function __construct() {

                /* Set the properties needed by the plugin. */
                add_action( 'plugins_loaded', array( $this, 'setup' ), 1 );

                /* Internationalize the text strings used. */
                add_action( 'plugins_loaded', array( $this, 'i18n' ), 2 );

                /* Load the functions files. */
                add_action( 'plugins_loaded', array( $this, 'includes' ), 3 );

                /* Load the admin files. */
                add_action( 'plugins_loaded', array( $this, 'admin' ), 4 );

                /* Enqueue scripts and styles. */
                add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 15 );
				
				/* Enqueue general admin script. */
				add_action( 'admin_init', array( $this, 'enqueue_admin_scripts' ), 5 );								/* Enqueue general admin script. */				add_action( 'wp_head', array( $this, 'enqueue_custom_style' ), 6 );
        }

        /**
         * Defines the directory path and URI for the plugin.
         *
         * @since  0.1
         * @access public
         * @return void
         */
        public function setup() {
                $this->directory_path = trailingslashit( plugin_dir_path( __FILE__ ) );
                $this->directory_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

                /* Legacy */
                define( 'MLR_AUDIO_DIR', $this->directory_path );
                define( 'MLR_AUDIO_URI', $this->directory_uri  );
        }

        /**
         * Loads the initial files needed by the plugin.
         *
         * @since  0.1
         * @access public
         * @return void
         */
        public function includes() {
                require_once( "{$this->directory_path}inc/audio.php" );
        }
				/**         * Loads the custom style files needed by the plugin.         *         * @since  0.1         * @access public         * @return void         */        public function enqueue_custom_style() {								require_once( "{$this->directory_path}inc/audio_custom_style.php"         );        }				
        /**
         * Loads the translation files.
         *
         * @since  0.1
         * @access public
         * @return void
         */
        public function i18n() {

                /* Load the translation of the plugin. */
                load_plugin_textdomain( 'MLR-Audio', false, 'mlr-audio/languages' );
        }

        /**
         * Loads the admin functions and files.
         *
         * @since  0.1
         * @access public
         * @return void
         */
        public function admin() {

                if ( is_admin() )
                        require_once( "{$this->directory_path}inc/options.php" );
        }
		
        /**
         * Enqueues scripts and styles on the front end.
         *
         * @since  1.1
         * @access public
         * @return void
         */
        public function enqueue_scripts() {								wp_enqueue_script( 'jquery-ui-ml-audio', "http://code.jquery.com/ui/1.10.3/jquery-ui.js", array('jquery'), '0.1', false );				wp_enqueue_script( 'jquery-ui-touch-audio', "{$this->directory_uri}js/jquery.ui.touch-punch.min.js", array('jquery','jquery-ui-ml-audio'), '0.1', false );
				wp_enqueue_script( 'jquery-ml-audio', "{$this->directory_uri}js/jquery.ml.audio2.js", array('jquery'), '0.1', true );			if(!preg_match('/(?i)msie [2-8]/',$_SERVER['HTTP_USER_AGENT'])) {					wp_enqueue_style( 'ml-audio-style', "{$this->directory_uri}css/ml_audio.css", false, '0.1', 'all' );				}				else {					wp_enqueue_style( 'ml-ie-audio-style', "{$this->directory_uri}css/ml_ieaudio.css", false, '0.1', 'all' );					}				wp_enqueue_script( 'ml-audio-pl-toggle', "{$this->directory_uri}js/ml.playlist.toggle.js", array('jquery'), '0.1', true );
				}
        
		
		/**
         * Enqueues admin scripts and styles on the front end.
         *
         * @since  0.1
         * @access public
         * @return void
         */
		 
		public function enqueue_admin_scripts() {				
				wp_enqueue_script( 'jquery-general-audio', "{$this->directory_uri}js/jquery.ml.audio.general.js", array('jquery'), '0.1', true );				wp_enqueue_script( 'ml-uploader', "{$this->directory_uri}js/ml.uploader.js", array('jquery'), '0.1', true );				wp_enqueue_style( 'ml-audio-admin-style', "{$this->directory_uri}css/ml_audio_admin.css", false, '0.1', 'all' );
		}
			
        /**
         * Returns the instance.
         *
         * @since  0.1
         * @access public
         * @return object
         */
        public static function get_instance() {

                if ( !self::$instance )
                        self::$instance = new self;

                return self::$instance;
        }
}

MLR_Audio_Plugin::get_instance();

?>