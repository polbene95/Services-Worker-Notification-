const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

//Set staticPath
app.use(express.static(path.join(__dirname, 'client')))
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Who sending the notification

const publicVapidKey = 'BEnKKawo0Njal7Lk9iQ8aVz77Aw_qu2mddcjYnKLDV-0XwbZUPAsyNdexhs1fgrI0fKIDiusZ2YTZf4Sxo6IMlE';
const privateVapidKey = 'Fw1Qa24CRsK_Q5f4hxmNAEX2knepGaBvvBvObx0QcFc'

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req,res) => {

    const subscription = req.body;
    console.log(req.body)

    res.status(201).json({})

    const payload = JSON.stringify({
        'title': 'Push test'
    })

    webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err))   
})



app.listen(5000, () => console.log('Server runing in port: ' + 5000))