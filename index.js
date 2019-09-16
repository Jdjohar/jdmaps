const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Starting server at ${port}');
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
    console.log(database);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});