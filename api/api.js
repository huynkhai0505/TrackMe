const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<dbuser>: <URLENCODEDdbpassword>@cluster0.dyvnr.mongodb.net', {
    useNewUrlParser: true, useUnifiedTopology: true 
});

const Device = require('./models/device');

const express = require('express');
const app = express();
const port = 5000;

app.get('/api/test', (req, res) => { res.send('The API is working!');
});
app.listen(port, () => { console.log(`listening on port ${port}`);
});