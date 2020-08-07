
const express = require('express');
const mongoose = require('mongoose');
const Device = require('./models/device');
const User = require('./models/user');

mongoose.connect('mongodb+srv://huynhkhai1203:Quynhanh0505@cluster0.dyvnr.mongodb.net/test?retryWrites=true&w=majority', { 
useNewUrlParser: true, 
useUnifiedTopology: true 
});


const app = express();

const bodyParser = require('body-parser'); 
const { findOneAndUpdate } = require("./models/user")
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

app.get('/api/test', (req, res) => { 
    res.send('The API is working!');
});

/**
* @api {get} /api/devices AllDevices An array of all devices * @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[ *{
* "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
* "sensorData": [
*{
*       "ts": "1529542230",
*       "temp":12,     
*       "loc":{
*           "lat": -37.84674,
*           "lon": 145.115113
*              }
*}
* },
*{
*       "ts": "1529542230",
*       "temp":12,     
*       "loc":{
*           "lat": -37.84674,
*           "lon": 145.115113
*              }
*}
*}
*]
*}
*]
* @apiErrorExample {json} Error-Response: *{
* "User does not exist" *}
*/

app.get('/api/devices', (req, res) => { 
    Device.find({}, (err, devices) => {
    if (err == true) { return res.send(err);
    } else {
    return res.send(devices);
    }
}); 
});

app.post('/api/devices', (req, res) => { 
    console.log(req.body);
});

app.post('/api/devices', (req, res) => { 
    const { name, user, sensorData } = req.body; 
    const newDevice = new Device({
    name,
    user,
    sensorData,
});
newDevice.save(err => {
return err
? res.send(err)
: res.send('successfully added device and data');
}); });

app.post('/api/send-command', (req, res) => { 
    console.log(req.body);
});

app.post('/api/authenticate', (req, res)=> {
    const { name, password } = req.body;
    User.findOne({
        name,
    })
    .then((user) => {
        if(!user) {
            return res.json({
                success: false,
                message: "User not existed",
            });
        }
        if(user.password !== req.body.password){
            return res.json({
                success: false,
                message: "Password is not correct",
            });
        }
        else{
            return res.json({
                success: true,
                message: "Authenticated Successfully",
                isAdmin: user.isAdmin,
            });
        }
    })
    .catch((error)=> res.send(error));

});

app.post('/api/registration', (req, res)=> {
    const { name, password, isAdmin } = req.body;
    User.findOne({
        name,
    })
    .then((user) => {
        if(user) {
            return res.json({
                success: false,
                message: "User has been registered",

            });
        }
        
        else{
            const newUser = new User({
                name: req.body.name,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            });
            newUser.save((err) => { 
                return err
                ? res.send(err) 
                : res.json({
                    success: true,
                    message: 'Created new user'
                });
            });
        }
    })
    .catch((error)=> res.send(error));
});

app.get('/api/devices/:deviceId/device-history', (req, res) => { 
    const { deviceId } = req.params;
    Device.findOne({_id: deviceId }, (err, devices) => {
    const { sensorData } = devices;
    return err
    ? res.send(err)
    : res.send(sensorData); 
    });
});

app.get('/api/users/:user/devices', (req, res) => { 
    const { user } = req.params;
    Device.find({ user: user }, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
}); 
});

app.use(express.static(`${__dirname}/public/generated-docs`));
app.get('/docs', (req, res) => { 
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});



app.listen(port, () => { console.log(`listening on port ${port}`);
});