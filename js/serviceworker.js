/**
 * Register the service worker in a separate JS file
 * the `if` condition checks whether the browser supports service workers
 * We then call he `register` method with a string file url
 * in case of an error, it is catched and logged to the console
 */
if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/servj.js')
    .then(function() {
		console.log('Service Worker Registered');
	})
    .catch(function(){
        console.log('Registration Failed');
    });
    
}
