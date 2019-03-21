This solution makes heavy use of method chaining to build urls. The user
must only interact with the public Api (factory) class. All other classes
are private and not for direct public consumption.

This solution was chosen to allow for maximum code completion and a maximum
number of compilation errors should the user attempt to incorrectly use the
API.

This design avoids the use of string constants. It has one clear
and simple entry point and it would be hard to use incorrectly.