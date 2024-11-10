const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Viewing one stock: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "GOOG" })
          .end(function (error, response) {
            assert.equal(response.status, 200);
            assert.equal(response.body.stockData.stock, "GOOG");
            assert.exists(response.body.stockData.price, "GOOG has a price");
            assert.exists(response.body.stockData.likes, "GOOG has likes");
            done();
          });
      });
      test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "AAPL", like: true })
          .end(function (error, response) {
            assert.equal(response.status, 200);
            assert.equal(response.body.stockData.stock, "AAPL");
            assert.equal(response.body.stockData.likes, 1);
            assert.exists(response.body.stockData.price, "AAPL has a price");
            assert.exists(response.body.stockData.likes, "AAPL has likes");
            done();
          });
      });
      test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "AAPL", like: true })
          .end(function (error, response) {
            assert.equal(response.status, 200);
            assert.equal(response.body.stockData.stock, "AAPL");
            assert.equal(response.body.stockData.likes, 1);
            assert.exists(response.body.stockData.price, "AAPL has a price");
            done();
          });
      });
      test("Viewing two stocks: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: ["MSFT", "NVDA"] })
          .end(function (error, response) {
            assert.equal(response.status, 200);
            assert.equal(response.body.stockData[0].stock, "MSFT");
            assert.equal(response.body.stockData[1].stock, "NVDA");
            assert.exists(response.body.stockData[0].price, "MSFT has a price");
            assert.exists(response.body.stockData[1].price, "NVDA has a price");
            done();
          });
      });
      test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: ["MSFT", "NVDA"], like: true })
          .end(function (error, response) {
            assert.equal(response.status, 200);
            assert.equal(response.body.stockData[0].stock, "MSFT");
            assert.equal(response.body.stockData[1].stock, "NVDA");
            assert.exists(response.body.stockData[0].price, "MSFT has a price");
            assert.exists(response.body.stockData[1].price, "NVDA has a price");
            assert.exists(response.body.stockData[0].rel_likes, "has rel_likes");
            assert.exists(response.body.stockData[1].rel_likes, "has rel_likes");
            done();
          });
        });
});
