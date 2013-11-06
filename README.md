Dawn of Aegis
=============
JavaScript 3D game. Uses WebGL.


## How to run locally ##

#### Node.js local server ####
1. Install [Node.js](http://nodejs.org)
2. Install [Connect](http://senchalabs.github.com/connect): `npm install connect`

3. Run `server.js` from the repository root

#### Other solutions ####
See the following [article](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally) from the [Three.js](https://github.com/mrdoob/three.js) wiki.


## Dev Information ##

#### Base content ####
* `Math.js` - additions to the standard math library.
* `Settings.js` - changeable game settings: window size, fov, mouse sensitivity.
* `Objects.js` - simple world objects.
* `Player.js` - camera and user controls.
* `World.js` - scene and complex game objects.
* `Engine.js` - renderer and rendering methods.
* `Game.js` - initialization, bindings and main game cycle.

#### Controls ####
##### Active keys #####
* ( Esc )[27] - exit pointer lock.
* ( ~ )[192] - show/hide degug statistics.
* ( z )[90]  - turn developer mode on/off.
* ( m )[77] - toogle menu (currently virtual). disable pointer lock
* ( x )[88] - toogle fullscreen for canvas.
* ( w )[87] - move forward
* ( s )[83] - move backward
* ( a )[65] - move left
* ( d )[68] - move right

##### Inactive keys #####
* ( Enter )[13]
* ( LShift )[16]
* ( LCtrl )[17]
* ( LAlt )[18]
* ( q )[81]
* ( e )[69]
* ( r )[82]
* ( f )[70]
* ( c )[67]
* ( i )[73]
* ( n )[78]
* ( p )[80]

##### Unacceptable keys #####
* ( Tab )[9] - tabulation trough all browser.
* ( Esc )[27] - should be only used by system.
