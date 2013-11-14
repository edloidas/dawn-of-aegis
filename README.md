Dawn of Aegis
=============
JavaScript 3D game. Uses WebGL.


## HOWTO: Run ##

Basically, this web application should run on a server. Game won't work properly due to cross-origin requests restrictions in browser's security policy.

#### Step 1 : Game ####
Clone this repository or just download the [master archive](https://github.com/edloidas/dawn-of-aegis/archive/master.zip) and unpack it in the desired folder.

#### Step 2 : Textures ####
Textures is a binary data, so they are not included into the repository and you must download them manually. Get this [data archive](https://dl.dropboxusercontent.com/u/40688668/doa/data.zip), unpack and place the textures into `base/data` directory under your game folder.

#### Step 3 : Server ####
As been said, you must run game on the server (best practice), or make changes to the browser security settings.

##### Step 3 A: Node.js server #####
1. Install [Node.js](http://nodejs.org)
2. Install [Connect](http://senchalabs.github.com/connect): `npm install connect`
3. Run `server.js` from the repository root.

##### Step 3 B: Other solutions #####
See the following [article](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally).

## Dev information ##

#### Base content ####
* `loader.js` - resource load and game initialization.
* `Utils.js` - additions to the standard math library.
* `Settings.js` - changeable game settings: window size, fov, mouse sensitivity.
* `Objects.js` - simple world objects.
* `Player.js` - camera and user controls.
* `UI.js` - user interface.
* `World.js` - scene and complex game objects.
* `Engine.js` - renderer and rendering methods.
* `Game.js` - initialization, bindings and main game cycle.

#### Code ####
* Section, that matches `@#.*#@` regex serves as an example and will be removed in future.

#### Controls ####

##### Active keys #####
| Code |  #  | Description                       |
| ---- | --- | --------------------------------- |
|  ~   | 192 | show/hide degug statistics        |
|  z   | 90  | turn developer mode on/off        |
|  h   | 72  | toogle menu, disable pointer lock |
|  x   | 88  | toogle fullscreen for canvas      |
|  w   | 87  | move forward                      |
|  s   | 83  | move backward                     |
|  a   | 65  | move left                         |
|  d   | 68  | move right                        |

##### Inactive keys #####
| Code   |  #  | Code   |  #  |
| ------ | --- | ------ | --- |
| q      |  81 | e      |  69 |
| r      |  82 | f      |  70 |
| c      |  67 | i      |  73 |
| m      |  77 | p      |  80 |
| Enter  |  13 | LShift |  16 |
| LCtrl  |  17 | LAlt   |  18 |

##### Unacceptable keys #####
| Code |  #  | Code |  #  |
| ---- | --- | ---- | --- |
| Tab  |   9 | Esc  |  27 |
