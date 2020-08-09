const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

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
    console.log('mqtt connected');
});

app.post('/send-command', (req, res) => { 
    const { deviceId, command } = req.body; 
    const topic = `/dgyIZ8AOwE/command/${deviceId}`; 
    client.publish(topic, command, () => {
    res.send('published new message'); });
    });


app.listen(port, () => { console.log(`listening on port ${port}`);
});