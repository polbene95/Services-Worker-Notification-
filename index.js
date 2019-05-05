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

    let subscription = req.body;
    res.status(201).json({})
    const payload = JSON.stringify({
        'title': 'Alert: Dog Missing'
    })

    // const subscriptions = [];
    // if (!subscriptions.includes(subscription))
    //     subscriptions.push(subscription)

    //     console.log(subscriptions)
    // subscriptions.forEach(subscription => {
    //     webpush
    //     .sendNotification(subscription, payload)
    //     .catch(err => console.error(err))   
    // })

    subscription =  { endpoint:
        'https://fcm.googleapis.com/fcm/send/dSPl42Kgi5w:APA91bHKyOw1mLYf67-HqoawIu2byPPbDEKDu6n0L19LdM7UpZgMyRdBz6h2_-Bp5q05NfTY3my5d2QbuUobVaIGREWfmKgvk1ILlj_tLXK6wCGY2AX37otWhgn9GuEY1FS97-8KCriq',
       expirationTime: null,
       keys:
        { p256dh:
           'BOYTM8Y2tvmNm2PHzbKLV_hur6OtFWOnw5-KRyFX8xdzNyuCSsYUABmTxbmdgA34XKK6OwziBuiP_IKWPKhdrnU',
          auth: 'cjfZyvVBBQae_OiTwIV9rw' } }
    
        webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err))   


})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server runing in port: ' + PORT))