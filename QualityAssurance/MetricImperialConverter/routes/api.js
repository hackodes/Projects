'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get(function (request, response) {
    const input = request.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    if (!initNum || !initUnit) {
      if (!initNum && !initUnit) {
        response.status(200).send("Invalid number and unit provided");
      } else if (!initNum) {
        response.status(200).send("Invalid number provided");
      } else {
        response.status(200).send("Invalid unit provided");
      }
      return undefined;
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    response.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
