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
