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

    this.Status = {ready: -1, running: 0, paused: 1};
    this.status = null;

    this.camera   = null;
    this.scene    = null;
    this.renderer = null;
    var geometry, material, mesh;

    /*
    ---------------------------------------------------------------------------
    Initialization
        Initialize Game
    ---------------------------------------------------------------------------
    */
    this.init = function init() {
        this.verify();
        Settings.scaleWindow();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.domElement.id = "scene";

        document.getElementById('holder').appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    this.animate = function animate() {
        // render
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );
    }
}

// events
function onWindowResize () {
    // Condition will prevent double call
    if (window.innerWidth !== Settings.width || window.innerHeight !== Settings.height) {
        Settings.scaleWindow();
        camera.aspect = Settings.aspect();
        camera.updateProjectionMatrix();
        renderer.setSize(Settings.width, Settings.height);
    }
}
