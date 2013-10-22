/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
var Game = new function() {
    var instance;

    function Game() {
        if (!instance) {
            instance = this;
        } else {
            return instance;
        }
    }

    /*
    ---------------------------------------------------------------------------
    Verification
        Method runs first time initializations and checks browser compatibility
        for the used technologies and loaded modules. Throws exception in case
        of incompatibility, that prevents further program execution.
    ---------------------------------------------------------------------------
    */
    this.verify = function () {
        var isSupported = true;

        if (typeof console === "undefined"
                || typeof console.log === "undefined"
                || typeof console.info === "undefined"
                || typeof console.warn === "undefined"
                || typeof console.error === "undefined") {
            throw "Exception : initialization failed. \"console\" is not available."
        }

        console.group("Verification");
        console.group("Browser");
        console.info("Checking [ Console] :: OK.");

        if (typeof Storage === "undefined") {
            console.info("Checking [ Storage] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [ Storage] :: OK.");
        }

        console.groupEnd(); // close Browser
        console.group("Libraries");

        if (typeof jQuery === "undefined") {
            console.info("Checking [  jQuery] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [  jQuery] :: OK.");
        }

        if (typeof angular === "undefined") {
            console.info("Checking [ Angular] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [ Angular] :: OK.");
        }

        console.groupEnd(); // close Libraries
        console.group("Game Modules");

        if (typeof Save === "undefined") {
            console.info("Checking [    Save] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [    Save] :: OK.");
        }

        if (typeof Settings === "undefined") {
            console.info("Checking [Settings] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [Settings] :: OK.");
        }

        if (typeof Engine === "undefined") {
            console.info("Checking [  Engine] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [  Engine] :: OK.");
        }

        console.groupEnd(); // close Game Modules
        console.group("WebGL & Three.js");

        if (typeof THREE === "undefined") {
            console.info("Checking [   THREE] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [   THREE] :: OK.");
        }

        if (typeof Stats === "undefined") {
            console.info("Checking [   Stats] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [   Stats] :: OK.");
        }

        if (typeof Detector === "undefined") {
            console.info("Checking [Detector] :: FAILED.");
            isSupported = false;
        } else {
            console.info("Checking [Detector] :: OK.");
        }

        console.groupEnd(); // close WebGL & Three.js
        console.groupEnd(); // close Verification

        if (!isSupported) {
            console.warn("Execution will be aborted due to previous errors.");
            // Exception should not be caught. Termination is expected.
            throw new Error("Verification failed. Browser not fully supported.");
        }
    }

    /*
    ---------------------------------------------------------------------------
    Initialization
        Initialize Game
    ---------------------------------------------------------------------------
    */
    this.init = function() {
        this.verify();
    }

    this.animate = function() {
        // render
    }
}

// Run initialization automatically
Game.init();
