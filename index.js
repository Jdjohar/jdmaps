const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));
app.use(express.json({limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();


app.use('/api', (request, response) => {
    console.log('I got a request!');
    const data =  request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});

app.use('/soil  ', async (request, response) => {
//const api_url =`https://rest.soilgrids.org/query?lon=${lon}&lat=${lat}`;
const api_url =`https://api.darksky.net/forecast/1c46b1683e2cfd04ae7a8d4d6994e4ab/37.8267,-122.4233`;
const fetch_response = await fetch(api_url);
const json = fetch_response.json();
console.log(json);
});