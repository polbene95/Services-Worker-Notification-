self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log(ev)
    self.registration.showNotification(data.title, {
        body: 'Notified by Me',
        incon: ''
    })
})

// self.addEventListener('active', (ev) => {
//     console.log('hello')
//     self.registration.pushManager.getSubscription().then(r => console.log(subscription))
// })