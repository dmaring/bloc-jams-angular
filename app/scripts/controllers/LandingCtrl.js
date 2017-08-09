(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }
    
    angular
        .module('blocJams')
        // .controller takes 1)name of controller and a 2)callback function
        // or 2)an array that injects dependencies with a callback function last in the array
        .controller('LandingCtrl', LandingCtrl);
})();