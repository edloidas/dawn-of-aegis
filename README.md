Dawn of Aegis
=============
JavaScript 3D game.

## HOWTO: Build ##

Repository already contains build files for the quick start. You can also run all project tasks by yourself. This project uses Grunt, and to do this, you must first install the Grunt CLI. Read the [article](http://gruntjs.com/getting-started), how to do this.
Then install all dependencies, listed in the package file `npm install`. Running `grunt` command under the project root folder will  perform the default tasks. To find more detailed information, see [Grunt file](Gruntfile.js) and [package file](package.js).

## HOWTO: Run ##

Basically, this web application should run on a server. Game won't work properly due to cross-origin requests restrictions in browser's security policy.

#### Step 1 : Game ####
Clone this repository or just download the [master archive](https://github.com/edloidas/dawn-of-aegis/archive/master.zip) and unpack it in the desired folder.

#### Step 2 : Textures ####
Textures is a binary data, so they are not included into the repository and you must download them manually. Get this [base archive](https://dl.dropboxusercontent.com/u/40688668/base.zip) with data, unpack and place it under your game root folder.

#### Step 3 : Server ####
As been said, you must run game on the server (best practice), or make changes to the browser security settings.

##### Step 3 A: Node.js server #####
1. Install [Node.js](http://nodejs.org)
2. Install [Connect](http://senchalabs.github.com/connect): `npm install connect` (if you skipped build phase)
3. Run `node server.js` under the repository root

##### Step 3 B: Other solutions #####
See the following [article](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally).

## Dev information ##

#### Base content ####
* `loader.js` - resource load and game initialization.
* `Utils.js` - additions to the standard math library.
* `Settings.js` - changeable game settings: window size, fov, mouse sensitivity.
* `Caches.js` - cached (regular and preloaded) objects.
* `Objects.js` - simple world objects.
* `Player.js` - camera and user controls.
* `UI.js` - user interface.
* `World.js` - scene and complex game objects.
* `Engine.js` - renderer and rendering methods.
* `Game.js` - initialization, bindings and main game cycle.

#### Code ####
* Section, that matches `@#.*#@` regex serves as an example and will be removed in future.
* Event for the `h` (code: 72) keydown was removed from the dat.gui.js. It should be also removed for all future updates of this library.

#### Controls ####

##### Debug keys #####
| Code |  #  | Description                       |
| ---- | --- | --------------------------------- |
|  ~   | 192 | show/hide degug statistics        |
|  z   | 90  | turn developer mode on/off        |
|  x   | 88  | toogle fullscreen for canvas      |
|  c   | 67  | toogle menu, disable pointer lock |

##### Unacceptable keys #####
| Code |  #  | Code |  #  | Code |  #  |
| ---- | --- | ---- | --- | ---- | --- |
| Tab  |   9 | Esc  |  27 | Alt  |  18 |
