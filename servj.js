/**
 * This file listens to the installation event fired upon registration of the service worker
 * For this I used the `self`listener on the service woker itself
 * This is done so that I may cache an array of file names which i will use later
 */
self.addEventListener('install',function(e){
    e.waitUntil(
        //here i `open` the cache object with a similar cache name
        //A promise is returned
        caches.open('v1').then(function(cache){
            return cache.addAll(cachedItems);
        })

    );
});
//I created a variable to hold the files as an array
let cachedItems = [
    './',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./js/serviceworker.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

//Next I listeed for the `fetch` event
self.addEventListener('fetch', function(e){
    //To prevent the default fetch, we use `respondWith`
    e.respondWidth(
        //to check whether the event request url already exists within the cache we'll use `match`
        caches.match(e.request).then(function(response){
            //check if we get back a response from the match query
            //if true, the request is returned
            if(response){
                console.log('Found ', e.request, ' in cache');
                return response;
            }
            //If not, the request is not in the cache hence it is fetched as normal
            else {
                console.log('could not find ', e.request, ' in cache, FETCHING!');
                return fetch(e.request)
                //Once the request is fetched, it is stored for later in the cache
                .then(function(response){
                    let resclone = response.clone();
                    caches.open('v1')
                    .then(function(cache){
                        cache.put(e.request, resclone);
                    })
                    return response;
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        })
    );
});