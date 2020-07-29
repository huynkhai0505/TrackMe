const mongoose = require('mongoose');
const Device = require('./models/device');

mongoose.connect(process.env.MONGO_URL, { 
useNewUrlParser: true, useUnifiedTopology: true });



const express = require('express');
const app = express();
const port = 5000;

app.get('/api/test', (req, res) => { res.send('The API is working!');
});

app.get('/api/devices', (req, res) => { Device.find({}, (err, devices) => {
    if (err == true) { return res.send(err);
    } else {
    return res.send(devices);
    }
}); 
});

app.listen(port, () => { console.log(`listening on port ${port}`);
});