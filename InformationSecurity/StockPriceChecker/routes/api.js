'use strict';

const axios = require('axios');
const StockModel = require('../models/stockModel');

async function fetchStockData(stockSymbol) {
    try {
        const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stockSymbol}/quote`);
        const { symbol, latestPrice } = response.data;
        return { symbol, price: latestPrice };
    } catch (error) {
        console.error(`Error when fetching stock data for ${stockSymbol}:`, error);
        return null;
    }
}

async function getOrCreateStock(symbol, ip, like) {
    try {
        let stockData = await StockModel.findOne({ symbol }).exec();
        if (!stockData) {
            stockData = new StockModel({ symbol, likes: like ? [ip] : [] });
            await stockData.save();
        } else if (like && !stockData.likes.includes(ip)) {
            stockData.likes.push(ip);
            await stockData.save();
        }
        return stockData;
    } catch (error) {
        console.error(`Error when retrieving or creating stock for ${symbol}:`, error);
        return null;
    }
}

module.exports = function (app) {
    app.route('/api/stock-prices').get(async (request, response) => {
        const { stock, like } = request.query;
        const likeStock = Boolean(like);
        const ipAddress = request.ip;

        if (Array.isArray(stock)) {
            try {
                const stockDataPromises = stock.map(async (symbol) => {
                    const stockData = await fetchStockData(symbol);
                    if (!stockData) return null;

                    const stockDetails = await getOrCreateStock(stockData.symbol, ipAddress, likeStock);
                    return {
                        stock: stockData.symbol,
                        price: stockData.price,
                        likes: stockDetails.likes.length,
                    };
                });

                const stockData = (await Promise.all(stockDataPromises)).filter(Boolean);

                if (stockData.length === 2) {
                    const [stock1, stock2] = stockData;
                    const result = stockData.map((data, index) => ({
                        ...data,
                        rel_likes: data.likes - (index === 0 ? stock2.likes : stock1.likes),
                    }));
                    return response.json({ stockData: result });
                }

                return response.json({ stockData });

            } catch (error) {
                console.error("Error when handling multiple stocks:", error);
                return response.status(500).json({ error: 'Internal server error' });
            }
        }

        try {
            const stockData = await fetchStockData(stock);
            if (!stockData) {
                return response.json({ stockData: { likes: likeStock ? 1 : 0 } });
            }

            const stockDetails = await getOrCreateStock(stockData.symbol, ipAddress, likeStock);

            return response.json({
                stockData: {
                    stock: stockData.symbol,
                    price: stockData.price,
                    likes: stockDetails.likes.length,
                },
            });

        } catch (error) {
            console.error("Error when handling single stock:", error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    });
};
