const publicVapidKey = 'BEnKKawo0Njal7Lk9iQ8aVz77Aw_qu2mddcjYnKLDV-0XwbZUPAsyNdexhs1fgrI0fKIDiusZ2YTZf4Sxo6IMlE';

// Check for servers worker

if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// Register SW, register Push, Send Push
async function send () {
    // Regsiter Service Woker
    console.log('registeering Service worker ...')
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })
    console.log('Service Worker Registred ...')

    //Register Push 
    console.log('Regsitering Push ...')
    
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    })
    .catch(e => console.error(e))

    console.log(JSON.stringify(subscription))

    console.log('Push Registred ...')

    //Send Push Notification
    console.log('Sending Push ...')
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    // .then(result => console.log(result))
    .catch(err => console.error(err))
    console.log('Push Sent ...')

}

document.getElementById('btn').addEventListener('click', send)

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  