/**
 * DAWN OF AEGIS
 * A simple tests of the DOA server.
 * @author edloidas
 */

var server = require('../server.js');
var should = require('should');

// Just a dummy test for now
describe( 'server', function () {
    it( 'should be initialized without error', function ( done ) {
        server.should.not.be.empty;
        done();
    });

    it( 'should start and shutdown', function ( done ) {
        var app = server.listen(3000);
        app.close();
        done();
    });
});
