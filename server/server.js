'use strict';

const express = require('express');
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const histogram = new client.Histogram({
    name: 'api_call_hist',
    help: 'number of api calls',
    labelNames: ['host', 'path']
})

const counter = new client.Counter({
    name: 'api_call_count',
    help: 'number of api calls',
    labelNames: ['host', 'path']
})

const timeGauge = new client.Gauge({
    name: 'api_call_time',
    help: 'Time of api calls',
    labelNames: ['host', 'path']
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
    req.start = Date.now();
    req.end = histogram.labels(req.hostname, req.url).startTimer();
    next();
});


app.use('/', express.static('build'))
app.get('/health', (req, res) => {
    res.statusCode = 200;
    res.send("Healthy!")
})
app.use(function (req, res, next) {
    let endTime = Date.now() - req.start;
    req.end();
    timeGauge.labels(req.hostname, req.url).set(endTime)
    counter.labels(req.hostname, req.url).inc()
    next();
});
app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
})



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

