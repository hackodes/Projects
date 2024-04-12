const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end((error, response) => {
            assert.equal(response.status, 200);
            assert.equal(response.body.initNum, 10);
            assert.equal(response.body.initUnit, 'L');
            assert.approximately(response.body.returnNum, 2.64172, 0.1);
            assert.equal(response.body.returnUnit, 'gal');
            assert.equal(response.body.string, '10 liters converts to 2.64172 gallons');
            done();
        });
    });

    test("Convert an invalid input such as 32g: GET request to /api/convert", function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end((error, response) => {
                assert.equal(response.status, 200); 
                assert.equal(response.body.initUnit, undefined); 
                done();
            });
    });
    
    test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' }) 
            .end((error, response) => {
                assert.equal(response.status, 200); 
                assert.equal(response.body.error, undefined); 
                done();
            });
    });

    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' }) 
            .end((error, response) => {
                assert.equal(response.status, 200); 
                assert.equal(response.body.error, undefined); 
                done();
            });
    });

    test("Convert with no number such as kg: GET request to /api/convert", function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'kg' }) 
            .end((error, response) => {
                assert.equal(response.status, 200); 
                assert.equal(response.body.error, undefined); 
                done();
            });
    });
});
