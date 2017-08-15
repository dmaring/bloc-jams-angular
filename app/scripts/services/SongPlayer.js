(function() {
    function SongPlayer() {
        /**
        * @desc SongPlayer object to be returned with its public properties and methods
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc Boolean to check if song is being played.  Helps with ng-mouseover and ng-mouseleave
        * @type {Boolean}
        */
        var currentSong = null;
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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
            });
            
            currentSong = song;
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
        * @function SongPlayer.play
        * @desc Plays a new song or one that has been previously paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);                
                currentSong = song;    
            
                playSong(song);
        
        } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }
            
    };
        /**
        * @function SongPlayer.pause
        * @desc Pauses currentBuzzObject and sets song.playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
    return SongPlayer;
    
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();