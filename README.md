dawn-of-aegis
=============
#### Tactical Role Playing Game ####

JavaScript game. Uses WebGL.

Common hierarchy and initialization:
* Settings.js - [version, savegame] - Game settings, like width, height, effects, difficulty.
* Objects.js - World objects, that can be created from template.
* Player.js - [camera] - Player settings and camera manipulation.
* World.js - [scene] - World settings, like map, size, state.
* Engine.js - [renderer] - Methods to render objects.
* Game.js - [bindings, init, animate] - Game initialization, bindings, main cycle.

## Controls ##
Active keys:
* ( Esc )[27] - exit pointer lock.
* ( ~ )[192] - show/hide degug statistics.
* ( z )[90]  - turn developer mode on/off.
* ( m )[77] - toogle menu (currently virtual). disable pointer lock
* ( x )[88] - toogle fullscreen for canvas.

Inactive keys:

* ( Enter )[13]
* ( LShift )[16]
* ( LCtrl )[17]
* ( LAlt )[18]
* ( w )[87]
* ( a )[65]
* ( s )[83]
* ( d )[68]
* ( q )[81]
* ( e )[69]
* ( r )[82]
* ( f )[70]
* ( c )[67]
* ( i )[73]
* ( n )[78]
* ( p )[80]

Unacceptable keys:
* ( Tab )[9] - tabulation trough all browser.
* ( Esc )[27] - should be only used by system.
