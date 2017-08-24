(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc SongPlayer object to be returned with its public properties and methods
        * @type {Object}
        */
        var SongPlayer = {};

        /**
        * @desc SongPlayer private property to keep track of current album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @function getSongIndex
        * @desc Private function to find the index of the song of purposes of forward/previous activities
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
            });

            currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
              });
            });

            SongPlayer.currentSong = song;
        }
        /**
        * @function playSong
        * @desc This private function plays the currentBuzzObject and sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            // play current buzz object
            currentBuzzObject.play();
            // set song.playing to true
            song.playing = true;
        }

        /**
        * @function stopSong
        * @desc This private function stops the currentBuzzObject and sets song.playing to true
        * @param {Object} song
        */
        var stopSong = function(song) {
          currentBuzzObject.stop();
          song.playing = null;
        };

        /**
        * @desc Public attribute that holds the currently playing song
        * @type {String}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Attribute to hold the volume value
        * @type {Number}
        */
        SongPlayer.volume = null;

        /**
        * @function setVolume
        * @desc Set the current volume playing
        * @param {Number} volume directive value
        */
        SongPlayer.setVolume = function(value){
            currentBuzzObject.setVolume(value);
        };


        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time){
          if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };

        /**
        * @function SongPlayer.play
        * @desc Plays a new song or one that has been previously paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                SongPlayer.currentSong = song;

                playSong(song);

        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
            }
        }

    };
        /**
        * @function SongPlayer.pause
        * @desc Pauses currentBuzzObject and sets song.playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc Gets the index of the song and finds the previous track number
        * @param
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function SongPlayer.next
        * @desc Gets the index of the song and finds the next track number
        * @param
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;


            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


    return SongPlayer;

    }
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
