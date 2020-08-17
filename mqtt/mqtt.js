const mqtt = require('mqtt');
const randomCoordinates = require('random-coordinates');
const rand = require('random-int');
const mongoose = require('mongoose');
const Device = require('./models/device');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
require("dotenv").config();
const { json } = require('body-parser');

mongoose.connect('mongodb+srv://huynhkhai1203:Quynhanh0505@cluster0.dyvnr.mongodb.net/test?retryWrites=true&w=majority', { 
useNewUrlParser: true, 
useUnifiedTopology: true 
});

app.use(express.static("public"));
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next();
});

const port = process.env.PORT || 5001;


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => { 
    client.subscribe('/sensorData');
    console.log('mqtt connected');
});

client.on('message', (topic, message) => { 
    if (topic == '/sensorData') {
        const data = JSON.parse(message);

        Device.findOne({"name": data.deviceId }, (err, device) => { 
            if (err) {
                console.log(err) 
            }

          const { sensorData } = device;
          const { ts, loc, temp } = data;

        sensorData.push({ ts, loc, temp }); 
        device.sensorData = sensorData;
        
        device.save(err => { 
            if (err) {
                console.log(err) 
            }
        }); 
        });
    } 
});

app.put('/sensor-data', (req, res) => { 
    const { deviceId } = req.body;

    const [lat, lon] = randomCoordinates().split(", "); 
    const ts = new Date().getTime();
    const loc = { lat, lon };
    const temp = rand(20, 50);

    const topic = `/sensorData`;
    const message = JSON.stringify({ deviceId, ts, loc, temp });

    client.publish(topic, message, () => { 
        res.send('published new message');
    }); 
});

app.post('/send-command', (req, res) => { 
    const { deviceId, command } = req.body; 
    const topic = `/dgyIZ8AOwE/command/${deviceId}`; 
    client.publish(topic, command, () => {
    res.send('published new message'); });
    });


app.listen(port, () => { console.log(`listening on port ${port}`);
});