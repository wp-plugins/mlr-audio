/*
 * @package   MLRAudio
 * @version   0.1
 * @since     0.1
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */
jQuery(function($) {
				var supportsAudio = !!document.createElement('audio').canPlayType;
				if(supportsAudio) {
					var index = 0,
					playing = false,
					seek = false,
					mlPlayerWidth = $('.player').attr('playwidth'),
					auto = $('.player').attr('mlautoplay'),
					mlPlaylistHeight = $('.player').attr('playheight'),
					mlImageon = $('.cover').attr('imageon'),
					mlImagepos = $('.cover').attr('imagepos'),
					title = $('.audio_title'),
					volume = $('.volume'),
					tracker = $('.tracker'),
					cw = $('#ml_controls').width(),
					handle = $('.tracker .ui-slider-handle'),
					defaultVol = 0.35,
					mlExtension = '',
					tracks = [];
					var len = $('.playlist li').length;
					for(var i = 0; i < len; i++) {
							var	obj = {name: $('.playlist li:eq('+i+')').attr('title'),
									   album: $('.playlist li:eq('+i+')').attr('album'),
									   cover: $('.playlist li:eq('+i+')').attr('cover'),
									   height: $('.playlist li:eq('+i+')').attr('data-height'),
									   artist: $('.playlist li:eq('+i+')').attr('artist'),
									   file: $('.playlist li:eq('+i+')').attr('audiourlmp3'),
									   ogg: $('.playlist li:eq('+i+')').attr('audiourlogg'),
									   wav: $('.playlist li:eq('+i+')').attr('audiourlwav')
									   };
					tracks.push(obj);
					}
					
					var trackCount = tracks.length,
					mlTitle = $('.audio_title'),
					
					
					
					// Important playing functions
					
					audio = document.getElementById('audio1');
					
					if (typeof(audio) === "undefined" || audio == null) {
						
						} else {
						
					$(audio).bind('play', function() {
					
						$('.play').addClass('hidden');
						$('.pause').removeClass('hidden');
						playing = true;
						
					}).bind('pause', function() {
						$('.play').removeClass('hidden');
						$('.pause').addClass('hidden');
						playing = false;
						
						
					}).bind('ended', function() {
						
						if((index + 1) < trackCount) {
							index++;
							loadTrack(index);
							
							var scrollTop = $('.playlist li.active').position().top; // Autoscrolling
							var mlScrollTo = 100 - Math.ceil((scrollTop / $('.playlist').innerHeight()) * 100, 10);
							if(index == trackCount - 1) {
						
								$('#slider_vert').slider('value',0);
								
								}
								else {
							
								$('#slider_vert').slider('value',mlScrollTo);
								}
								
								
							audio.play();
						} else {
							audio.pause();
							index = 0;
							loadTrack(index);
							$('#slider_vert').slider('value',100);
							
							$('.pl').addClass('hidden');
						}
					}).bind('timeupdate',function() {
						var current = parseInt(audio.currentTime, 10);
						tracker.slider('value',current);
						}).get(0),
					btnPrev = $('.rew').click(function(e) {
						e.preventDefault;
						if((index - 1) > -1) {
							index--;
							
							loadTrack(index);
							var scrollTop = $('.playlist li.active').position().top; // Autoscrolling
							var mlScrollTo = 100 - Math.ceil((scrollTop / $('.playlist').outerHeight()) * 100, 10);
							$('#slider_vert').slider('value',mlScrollTo);
							
							if(playing) {
								audio.play();	
							}
						} else {
							audio.pause();
							playing = false;
							index = 0;
							
							loadTrack(index);
								$('#slider_vert').slider('value',100);
								$('.pause').addClass('hidden');
								$('.pl').addClass('hidden');
								$('.play').removeClass('hidden');
						}
					}),
					btnNext = $('.fwd').click(function(e) {
						e.preventDefault;
						if((index + 1) < trackCount) {
							index++;
							loadTrack(index);
							
							var scrollTop = $('.playlist li.active').position().top; // Autoscrolling
							var mlScrollTo = 100 - Math.ceil((scrollTop / $('.playlist').outerHeight()) * 100, 10);
							if(index == trackCount - 1) {
							$('#slider_vert').slider('value',0);
								}
								else {
									$('#slider_vert').slider('value',mlScrollTo);
									}
								
							if(playing) {
								audio.play();	
							}
						} else {
							audio.pause();
							playing = false;							
							index = 0;
							
							loadTrack(index);
								
								$('#slider_vert').slider('value',100);
								$('.pause').addClass('hidden');
								$('.pl').addClass('hidden');
								$('.play').removeClass('hidden');
						}
						
					}),
					li = $('.playlist li').click(function() {
						var id = parseInt($(this).index());
						if(id !== index) {
							playTrack(id);
						}
					}),
					showImageCss = function() {
						if(mlImageon != 0) {
							if(mlImagepos == 'left' || mlImagepos == 'default') {
							$('.player .cover').css({
											'float':'left',
											'border-top-left-radius':'5px',
											'height':'auto',
											'position':'relative',
											'width':'auto',
											'margin-right':'10px'
											});
							$('.player .cover img').css({
											'border-top-left-radius':'5px'
											});
							}
							else {
							$('.player .cover').css({
											'float':'right',
											'border-top-right-radius':'5px',
											'height':'auto',
											'position':'relative',
											'width':'auto',
											'margin-left':'10px'
											});
							$('.audio_title, .album_title').css({
											'padding-left':'10px'
											});
							$('.player .cover img').css({
											'border-top-right-radius':'5px'
											});
							}
						}
						else {
							$('.player .cover img').detach();
							$('.player').css({'height':'auto','padding-bottom':'10px','padding-left':'10px'});
							}
					},
					loadTrack = function(id) {
					
						index = id;
						$('.active').removeClass('active');
						$('.playlist li:eq(' + id + ')').addClass('active');
						mlTitle.html('<span class="preTitle">Song: </span>' + tracks[id].name);
						
						var file_string = tracks[id].file;
						var abbr_string = file_string.slice(0, -4);
						audio.src = abbr_string + mlExtension;
						// $('.player .cover').css({'background-image':'url(' + tracks[id].cover + ')'});
						$('.player .cover').html('<img id="cover_img" src="' + tracks[id].cover + '" title="' + tracks[id].name + '" />');
						if(tracks[id].album != '') {
						$('.album_title').html('<span class="preTitle">Album: </span>' + tracks[id].album );
						}
						else {
							$('.album_title').text('');
							}
						
								
						var pw = $('.player').width();
						if(pw > 345) {
							$('.player').height(tracks[id].height);
							$('.pl').addClass('hidden');
							$('.audio_title, .album_title').css({'padding-left':'0'});
							// Show Image?	
							showImageCss();
							}
							else {
								$('.player').css({'height':'auto','padding-bottom':'10px'});
								$('.audio_title, .album_title').css({'padding-left':'10px'});
								$('.player .cover').addClass('hidden');
								}
						
					},
					playTrack = function(id) {
						loadTrack(id);
						audio.play();
					};
					
					
					mlExtension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : audio.canPlayType('audio/wav') ? '.wav' : '';
						
					
					// Autoplay?
					autoPlay = function() {
					if(auto != undefined && auto.length != 0) {
					loadTrack(index);
					audio.play();
						}
						else {
							loadTrack(index);
							}
					}
					
					autoPlay();
					
					
					
					
					audio.volume = defaultVol;
					
					tracker.width(cw);

					$(window).resize(function() {
					var cw = $('#ml_controls').width();
					$('.tracker').width(cw);
					});
					
					var changeHeight = function(id) {
					index = id;
					var pw = $('.player').width();
					var ph = $('.player').height();
						if(pw > 345) {
							$('.cover').removeClass('hidden');
							showImageCss();
							$('.pl').addClass('hidden');
							ph = tracks[id].height;
			
							if(mlImagepos == 'right') {
							$('.audio_title, .album_title').css({'padding-left':'10px'});
							}
							else {
							$('.audio_title, .album_title').css({'padding-left':'0'});
							}
							
							if($('.cover').attr('imageon').length != 0) {} else {
							console.log('Oops');
								$('.album_title').css({'padding-bottom':'10px'});
								}
								
							$('.player').css({'padding-bottom':'0','height':ph});
							}
							else {
						showImageCss();
						$('.cover').addClass('hidden');
						if(mlImageon.length == 0){
								$('.player').css({'padding-left':'0'});
								}
						$('.audio_title, .album_title').css({'padding-left':'10px','padding-bottom':'0'});
						$('.player').css({'height':'auto','padding-bottom':'10px'});
						}
					}
					
					
					
					if(audio.paused) {
						$('.pl').addClass('hidden');
						}
						
					
					// Functionality for player
					
					$('.play').bind('click',function() {
						if(!playing);
						audio.play();
						playing = true;
						tracker.slider("option", "max", audio.duration);
						$(this).addClass('hidden');
						$('.pause').removeClass('hidden');
						
						});
						
					$('.pause').bind('click',function() {
						if(playing) {
						audio.pause();
						playing = false;
						}
						else {
							audio.play();
							}
						$(this).addClass('hidden');
						$('.play').removeClass('hidden');
						
						});
					
						startTime = $('#audio1').bind('loadedmetadata',function() {
						var dur = parseInt(audio.duration),
						curTime = parseInt(audio.currentTime),
						min = Math.floor(dur / 60, 10),
						sec = dur - min * 60,
						curMins = Math.floor(curTime / 60, 10),
						curSecs = Math.floor(curTime % 60);
						$('#timeleft').text(curMins + ' : ' + (curSecs > 9 ? curSecs : '0' + curSecs) + '   |   -' + min + ' : ' + (sec > 9 ? sec : '0' + sec));
						tracker.slider('option', 'max', audio.duration);
						});
						
					
					$('#audio1').bind('timeupdate',function() {
						var songDuration = parseInt(audio.duration),
						timeRemaining = parseInt(songDuration - audio.currentTime, 10),
						curTime = parseInt(audio.currentTime),
						now = (audio.currentTime / audio.duration) * 100,
						mins = Math.floor(timeRemaining / 60, 10),
						curMins = Math.floor(curTime / 60, 10), 
						seconds = Math.floor(timeRemaining - mins * 60, 10);
						curSecs = Math.floor(curTime % 60);
						if(!isNaN(mins) || !isNaN(seconds)){
						$('#timeleft').text(curMins + ' : ' + (curSecs > 9 ? curSecs : '0' + curSecs) + '   |   -' + mins + ' : ' + (seconds > 9 ? seconds : '0' + seconds));
						}
						if (!seek) { handle.css({'left': now + '%'}); }
						});
						
					var plugins_url = volume.attr('data-plugins');	
					var opts = volume.css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_half.png)');
					
					// Volume slider
					
					volume.slider({
						range: 'min',
						min: 0,
						max: 100,
						value: 35,
						animate: true,
						slide: function(e,ui) {
							audio.volume = ui.value / 100;
							defaultVol = ui.value / 100;
							
							},
						change: function(e,ui) {
						var currentValue = ui.value;
							if(ui.value == 0) {
								$(this).css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_grey.png)');
								}
								else if(ui.value >= 68) {
									$(this).css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume.png)');
									}
									else if(ui.value < 68 && ui.value > 32) {
										$(this).css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_half.png)');
										}
										else if(ui.value <= 32 && ui.value > 0) {
											$(this).css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_down.png)');
											}
						}
							
						
					});
					
					// On volume mouseover show volume value as title
					$('.volume .ui-slider-handle').on('mouseover',function() {
						if(audio.muted) {
							$(this).attr('title','double-click to unmute');
							$(this).parent().attr('title','vol = ' + volume.slider('value') + '%');
							}
							else {
						$(this).attr('title','double-click to mute');
						$(this).parent().attr('title','vol = ' + volume.slider('value') + '%');
						}
					});
					
					
					
					// Change image in volume div depending on handle value
					$('.volume .ui-slider-handle').bind('mousedown', function(e){
							$('.volume .ui-slider-handle').bind('mousemove', function(e){
							
								dragged = e.pageX,
								movement = dragged;
								movement = volume.slider('value');
								if(movement == 0) {
								$(this).parent().css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_grey.png)');
								}
								else if(movement >= 68) {
									$(this).parent().css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume.png)');
									}
									else if(movement < 68 && movement > 32) {
										$(this).parent().css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_half.png)');
										}
										else if(movement <= 32 && movement > 0) {
											$(this).parent().css('background-image','url(' + plugins_url + '/mlr-audio/css/images/volume_down.png)');
											}	
							});

							$('.volume .ui-slider-handle').bind('mouseup.mlDown',function(e){
								
								$('.volume .ui-slider-handle').removeClass('dragged');
								$(this).unbind('mousemove');
								
							});
						});
					
						
					// Tracker slider
					
					tracker.slider({
						range: 'min',
						min: 0,
						max: audio.duration,
						animate: true,
						
						slide: function(e,ui) {
							audio.currentTime = ui.value;
							},
						
						});
						
						
					/*
					if((audio.buffered.length != 0) && (audio.buffered != undefined)) {
					var progressVal = parseInt(((audio.buffered.end(0) / audio.duration) * 100),10);
					console.log(progressVal);
					}
					tracker.progressbar({
						value: progressVal
						});	
					*/	
					
					
					// Scroll bar
					function mlScrollbar($scrolled) {
					
					if(mlPlaylistHeight.length !== 0) {
						if(mlPlaylistHeight < 200) {
						mlPlaylistHeight = 200;
						}	
					}
					else {
						mlPlaylistHeight = 200;
						}
					var sbInit = mlPlaylistHeight,
						plHeight = $scrolled.outerHeight(),
						lockedplHeight = plHeight,
						lockedDiff = lockedplHeight - sbInit,
						hDiff = plHeight - sbInit;
						
						if(hDiff > 0) {
						var prop = hDiff / plHeight,
						handleHeight = Math.ceil((1 - prop) * sbInit);
						handleHeight -= handleHeight%2;
						if($scrolled.closest('#pl_wrap').length > 0) {} else {
						$scrolled.wrap('<div id="pl_wrap" class="pl_wrap"></div>');
						}
						$('#pl_wrap').css({'height':''+sbInit+'px','overflow':'hidden','position':'relative'});
						$wrap = $('#pl_wrap');
						
						if($wrap.find('#slider_vert').length == 0) {
							$wrap.append('<div id="slider_vert"></div>');
							}
						
						$('#slider_vert').slider({
											orientation:'vertical',
											range:'min',
											min:0,
											max:100,
											value:100,
											animate:true,
											slide: function(event, ui) {
											if($scrolled.css('display') != 'none') {
												var tVal = -((100-ui.value)*hDiff/100);
												}
												
												$scrolled.css({top:tVal});
											
												$('#slider_vert .ui-slider-range').height(ui.value+'%');
												
											},
											change: function(event, ui) {
											if($scrolled.css('display') != 'none') {	
												var tVal = -((100-ui.value)*hDiff/100);
												}
													if(!$scrolled.is(':animated')) {
													$scrolled.animate({top:tVal},300);
													}
												
												$('#slider_vert .ui-slider-range').height(ui.value+'%');
												
													
											}
						});
						
						var scrollable = sbInit - handleHeight,
						sliderMargin = (sbInit - scrollable)*0.5;
						$('#slider_vert .ui-slider-handle').css({height:handleHeight,'margin-bottom':-0.5*handleHeight});
						$('#slider_vert.ui-slider').css({height:scrollable,'margin-top':sliderMargin});		
						}
						
						$('#slider_vert.ui-slider').click(function(event) {
						event.stopPropagation();
						});
						
					} // End mlScrollbar		
					
					mlScrollbar($('.playlist'));
					
					
					// Window resize function
					$(window).resize(function() {
						mlScrollbar($('.playlist'));
						changeHeight(index);
						});
					
									
					
				}	// End if undefined
			} // End if supports audio
}); // End function
				
			