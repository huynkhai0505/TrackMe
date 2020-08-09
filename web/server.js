const express = require('express');
const app = express();
const base = `${__dirname}/public`;
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
next();
});

app.get('/', function (req, res) { 
    res.sendFile(`${base}/device-list.html`);
});
app.get('/register-device', (req, res) => { 
    res.sendFile(`${base}/register-device.html`);
});
app.get('/send-command', (req, res) => { 
    res.sendFile(`${base}/send-command.html`);
});
app.get('/about', (req, res) => { 
    res.sendFile(`${base}/about-me.html`);
});
app.get('/registration', (req, res) => { 
    res.sendFile(`${base}/registration.html`);
});
app.get('/login', (req, res) => { 
    res.sendFile(`${base}/login.html`);
});
app.get('/device-history', (req, res) => { 
    res.sendFile(`${base}/device-history.html`);
})

app.get('*', (req, res) => { 
    res.sendFile(`${base}/404.html`);
})


app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});