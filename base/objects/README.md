Game Objects
============

The main Objects, that contains all other game objects is `Objects`.

### Main objects ###

Main objects is a basic types, that are used to construct more complex entities.
The main Objects, that contains all other game objects is `Objects`.

* `Actor` - actor is a basic object, that has some position in the 3D space, can be easily cached, managed and animated.
* `DevActor` - a special type of actor, that is used for developer needs.
* `World` - everything, that can be marked as Actor, because do not have a coordinates, like global illumination, gravity, etc.

#### Dev ####

Special objects under the `/dev`, that mostly used with developer tools.

* `Axis` - standard THREE.JS Axis mesh object with and XYZ axis.
* `Grid` - standard THREE.JS Grid mesh object on the XZ axis.

#### Common ####

Common objects under the `/common`, that can be used anywhere.

* `Sprite` - standard sprite image object.
* `TextTexture` - custom implementation of the THREE.Texture. Can be used to create texture from canvas with a certain text.
* `TexturedPlane` - standard THREE.JS Grid mesh object on the XZ axis.

#### Target ####

Player target objects under the `/target`, that are used for the camera manipulation.

* `Target` - target interface with basic methods and parameters.
* `PlaneTarget` - basic target for the second person games, like most of the strategic games.
* `VolumeTaget` - basic target for the first person games, like most of the shooter games.
