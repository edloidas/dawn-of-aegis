/**
 * DAWN OF AEGIS
 * A basic server, using node.js with Connect
 * @see http://senchalabs.github.com/connect
 * @author edloidas
 */
var connect = require('connect');

connect.createServer(
            connect.favicon(),
            connect.logger('dev'),
            connect.static(__dirname)
).listen(8888);
