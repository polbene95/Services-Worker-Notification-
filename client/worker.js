console.log('Service Worker Loaded ...')
// console.log(self)
self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log('Push Recived ... ')
    self.registration.showNotification(data.title, {
        body: 'Notified by Me',
        incon: ''
    })

})