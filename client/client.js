const publicVapidKey = 'BEnKKawo0Njal7Lk9iQ8aVz77Aw_qu2mddcjYnKLDV-0XwbZUPAsyNdexhs1fgrI0fKIDiusZ2YTZf4Sxo6IMlE';


document.getElementById('btn').addEventListener('click', send)

async function send () {
    
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })
   
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    }).catch(e => console.error(e))

    //Get Current Location 

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    }).catch(err => console.error(err))
   

}

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
  