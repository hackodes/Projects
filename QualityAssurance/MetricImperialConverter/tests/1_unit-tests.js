const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("Read whole number input", function (done) {
        const input = "50gal";  
        
        assert.equal(convertHandler.getNum(input), 50);
        done();
      });

    test("Read number input", function (done) {
        const input = "50.8km";
        
        assert.equal(convertHandler.getNum(input), 50.8);
        done();
    });

    test("Read franctional input", function (done) {
        const input = "50/8kg";
        
        assert.equal(convertHandler.getNum(input), 50/8);
        done();
    });

    test("Read fractional input with decimal", function (done) {
        const input = "50/10.5L";
        
        assert.equal(convertHandler.getNum(input), 50/10.5);
        done();
    });

    test("Return error on double fraction", function (done) {
        const input = "50/2/3mi";
        assert.equal(convertHandler.getNum(input), undefined);
        done();
    });

    test("Default to numerical input of 1 when no numerical input is provided", function (done) {
        const input = "lbs";

        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

    test("Read each valid input unit", function (done) {
        const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

        units.forEach(unit => {
            let input = `25${unit}`;
            assert.equal(convertHandler.getUnit(input), unit);
        });
        done();
    });

    test("Return error for an invalid input unit", function (done) {
        const input = "invalid unit";

        assert.equal(convertHandler.getUnit(input), undefined);
        done();
    });

    test("Return correct unit for each valid input unit", function (done) {
        const input = ["gal", "l", "mi", "km", "lbs", "kg"];
        const expectedOutput = ["L", "gal", "km", "mi", "kg", "lbs"];
        
        input.forEach((inputUnit, index) => {
            assert.equal(convertHandler.getReturnUnit(inputUnit), expectedOutput[index]);
        });
        done();
    });

    test("Return correctly spelled-out string unit for each valid input unit", function (done) {
        let input = "50/2/3L";

        assert.equal(convertHandler.getNum(input), undefined);
        done();
    });

    test("Convert gal to L", function (done) {
        const input = 5; 
        const expectedOutput = 18.9271; 

        assert.approximately(convertHandler.convert(input, "gal"), expectedOutput, 0.1); 
        done();
    });

    test("Convert L to gal", function (done) {
        const input = 10; 
        const expectedOutput = 2.64172; 

        assert.approximately(convertHandler.convert(input, "L"), expectedOutput, 0.1); 
        done();
    });

    test("Convert mi to km", function (done) {
        const input = 10; 
        const expectedOutput = 16.0934; 

        assert.approximately(convertHandler.convert(input, "mi"), expectedOutput, 0.1); 
        done();
    });
    
    test("Convert km to mi", function (done) {
        const input = 20; 
        const expectedOutput = 12.42742; 

        assert.approximately(convertHandler.convert(input, "km"), expectedOutput, 0.1); 
        done();
    });

    test("Convert lbs to kg", function (done) {
        const input = 30; 
        const expectedOutput = 13.6078; 

        assert.approximately(convertHandler.convert(input, "lbs"), expectedOutput, 0.1); 
        done();
    });
    
    test("Convert kg to lbs", function (done) {
        const input = 40; 
        const expectedOutput = 88.1849; 

        assert.approximately(convertHandler.convert(input, "kg"), expectedOutput, 0.1); 
        done();
    });
});