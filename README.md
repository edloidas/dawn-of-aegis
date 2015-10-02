Dawn of Aegis
=============

[![Travis Build Status](https://img.shields.io/travis/edloidas/dawn-of-aegis.svg?label=linux%20build)](https://travis-ci.org/edloidas/dawn-of-aegis)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/edloidas/dawn-of-aegis.svg?label=windows%20build)](https://ci.appveyor.com/project/edloidas/dawn-of-aegis)
[![Coverage Status](https://coveralls.io/repos/edloidas/dawn-of-aegis/badge.svg?branch=master&service=github)](https://coveralls.io/github/edloidas/dawn-of-aegis?branch=master)
[![Dependency Status](https://david-dm.org/edloidas/dawn-of-aegis.svg)](https://david-dm.org/edloidas/dawn-of-aegis)
[![devDependency Status](https://david-dm.org/edloidas/dawn-of-aegis/dev-status.svg)](https://david-dm.org/edloidas/dawn-of-aegis#info=devDependencies)

> JavaScript 3D game.

## Build ##

Repository does not include game textures, libraries and assembled sources. Before running this project, you should build it first. Follow these steps:

1. Install [Node.js](https://nodejs.org/)
	* It's always better to choose the latest stable version available: we are trying to keep everything up to date;
	* Make sure you installed the Node Package Manager ([npm](https://www.npmjs.org/));
	* You can use [io.js](https://iojs.org/) instead of Node.js.

2. Run `npm install`
	* This task will download required dependencies, including [Gulp](http://gulpjs.com/), [Bower](http://bower.io/) and [LESS](http://lesscss.org/);
	* As post install task, `bower install` will be executed to download project libraries;
	* See [package file](package.json) and  [bower file](bower.json) for the additional information.

3. Run `gulp build`
	* This task will create/update the game libraries under the `lib/` folder, build the game files and compile the styles.
	* See [Gulp file](gulpfile.js) for the additional information about the tasks.

4. * Run `gulp data`
	* Textures is a binary data, so they are not included into the repository;
	* Alternatively, you can do it yourself: download the [base archive](https://dl.dropboxusercontent.com/u/40688668/base.zip) with data, unpack and place it under your game root folder.


## Run ##

Basically, this web application should run on a server. Game won't work properly due to cross-origin requests restrictions in browser's security policy. You must run game on the server (best practice), or make changes to the browser security settings. You can either follow step A or step B.

##### Option A: Node.js/io.js server #####
Run `node server.js` (or `iojs server.js`) under the repository root.

##### Option B: Other solutions #####
See the following [article](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally).

## Dev Info ##

#### Base content ####
* `loader.js` - resource load and game initialization.
* `Utils.js` - additions to the standard math library.
* `Settings.js` - changeable game settings: window size, fov, mouse sensitivity.
* `Caches.js` - cached (regular and preloaded) objects.
* `Objects.js` - simple world objects.
* `Quest.js` - quest parser and objects.
* `Player.js` - camera and user controls.
* `UI.js` - user interface.
* `World.js` - scene and complex game objects.
* `Engine.js` - renderer and rendering methods.
* `Game.js` - initialization, bindings and main game cycle.

#### Code ####
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
