
/*
	SWFSound v1.1 - (c) 2009 by Baumgartner New Media GmbH
	
	Released under MIT license, http://code.google.com/p/swfsound/
*/

import flash.media.Sound.*;
import flash.external.ExternalInterface;

stop();

var	swfSounds: Array = [];

function flashLoadSound( mp3URL: String, streamMode: Boolean, onLoadCallback: String, onID3Callback: String ): Number
{
	var	mcHolder: MovieClip = createEmptyMovieClip( 'mc_sound_' + swfSounds.length, getNextHighestDepth() );

	var mySound: Sound = new Sound( mcHolder );
	swfSounds.push( mySound );
	var id_sound: Number = (swfSounds.length - 1);

	if ( onLoadCallback != undefined && onLoadCallback != null )
	{
		mySound.onLoad = function()
		{
			ExternalInterface.call( onLoadCallback, id_sound );
		}
	}

	if ( onID3Callback != undefined && onID3Callback != null )
	{
		mySound.onID3 = function()
		{
			ExternalInterface.call( onID3Callback, id );
		}
	}

	mySound.loadSound( mp3URL, streamMode );

	return id_sound;
}

function flashStartSound( id: Number, offset: Number, loopCount: Number, onSoundCompleteCallback )
{
	var mySoundsStatus: Sound = swfSoundsStatus[ id ];
	var mySound: Sound = swfSounds[ id ];	
		mySound.onLoad = function()
			{
				ExternalInterface.call( 'onLoad', id_sound );
			}

	mySound.start( offset, loopCount );

	if ( onSoundCompleteCallback != undefined && onSoundCompleteCallback != null )
	{
		mySound.onSoundComplete = function()
		{
			ExternalInterface.call( onSoundCompleteCallback, id );
		}
	}
}

function flashStopSound( id: Number )
{
	var mySound: Sound = swfSounds[ id ];
	mySound.stop();
}

function flashSetVolume( id: Number, newVolume: Number )
{
	var mySound: Sound = swfSounds[ id ];
	mySound.setVolume( newVolume );
}

function flashGetVolume( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.getVolume();
}

function flashSetPan( id: Number, newPan: Number )
{
	var mySound: Sound = swfSounds[ id ];
	mySound.setPan( newPan );
}

function flashGetPan( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.getPan();
}

function flashGetDuration( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.duration;
}

function flashGetPosition( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.position;
}

function flashGetID3( id: Number ): Object
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.id3;
}

function flashGetBytesTotal( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.getBytesTotal();
}

function flashGetBytesLoaded( id: Number ): Number
{
	var mySound: Sound = swfSounds[ id ];
	return mySound.getBytesLoaded();
}

ExternalInterface.addCallback( 'loadSound', this, flashLoadSound );
ExternalInterface.addCallback( 'startSound', this, flashStartSound );
ExternalInterface.addCallback( 'stopSound', this, flashStopSound );

ExternalInterface.addCallback( 'setVolume', this, flashSetVolume );
ExternalInterface.addCallback( 'setPan', 	this, flashSetPan );

ExternalInterface.addCallback( 'getVolume', this, flashGetVolume );
ExternalInterface.addCallback( 'getPan', 	this, flashGetPan );

ExternalInterface.addCallback( 'getDuration', 	this, flashGetDuration );
ExternalInterface.addCallback( 'getPosition', 	this, flashGetPosition );
ExternalInterface.addCallback( 'getID3', 		this, flashGetID3 );

ExternalInterface.addCallback( 'getBytesTotal', 	this, flashGetBytesTotal );
ExternalInterface.addCallback( 'getBytesLoaded', 	this, flashGetBytesLoaded );

ExternalInterface.call( "swfsound.onload" );
ExternalInterface.call( "swfsound.onLoad" );

