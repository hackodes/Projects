require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const urlModule = require('url')
const dnsModule = require('dns');

const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(process.env.connectionUrl);
const database = mongoClient.db('url-shortener-db');
const urlCollection = database.collection('url-collection');

// Basic configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

async function databaseConnectionTest() {
  try {
    await mongoClient.connect();
    console.log('connecting to MongoDB...');
    await database.command({ ping: 1 });
    console.log('successfully connected to MongoDB!');
  } catch (err) {
    console.error('error connecting to MongoDB:', err);
    process.exit(1);
  }
}

console.log('Starting URL Shortener Microservice...');
databaseConnectionTest();

app.post('/api/shorturl', async function(req, res) {
    const requestUrl = req.body.url;

    const lookup = dnsModule.lookup(urlModule.parse(requestUrl).hostname, async (error, hostAddress) => {
      if (hostAddress === undefined || hostAddress === null){
        res.json({ error: 'invalid url' });
      } else {
        const currentUrlCount = await urlCollection.countDocuments()
        const urlDocument = { original_url: requestUrl, short_url: currentUrlCount}
        await urlCollection.insertOne(urlDocument)
        res.json({ original_url: requestUrl, short_url: currentUrlCount });
      }
    })
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = req.params.short_url;
  const urlDocument = await urlCollection.findOne({ short_url: parseInt(shortUrl) });

  if (urlDocument) {
    res.redirect(urlDocument.original_url);
  } else {
    res.json({ error: 'short url not found' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
