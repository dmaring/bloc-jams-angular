(function() {
    function SongPlayer() {
        var SongPlayer = {};
        // private attributes
        var currentSong = null;
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio fileas currentBuzzObject
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
        // public methods
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);                
                currentSong = song;    
            
                currentBuzzObject.play();
                song.playing = true;
        
        } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }
            
    };
        
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