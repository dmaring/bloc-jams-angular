(function() {
    function SongPlayer(Fixtures) {
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
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
          SongPlayer.currentSong.playing = false;
        }

        /**
        * @desc Public attribute that holds the currently playing song
        * @type {String}
        */
        SongPlayer.currentSong = null;

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
                stopSong(song);
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
                stopSong(song);
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
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
