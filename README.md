# Restaurant Review App
## About the project
This is the final test project of the UDACITY FRONT-END NANODEGREE PROGRAM. 
The main objectives of the project include:
##### a. To convert a static and unresponsive site to being responsive for varius view ports-_mobile, tablet and desktop_.
##### b. To make the app more accessible by including ARIA standards on web accessability. This makes the app easy to navigate with the keyboard in case the user does not have a navigation mouse.
##### c. To make the application accessible offline using service worker.

## Application Deign
### 1. Making the application responsive
Initially, the app is static and does not respond well to mobile view. Responsiveness can be achieved by modification of the CSS code. In this case, I mainly used relative values for sizes e.g `width: 20%` rather than absolute values like `width: 20px`. Likewise for text, I used relative size syntax e.g; `font-size: 2vw` instead of `font-size: 2px`;
I used **flex-box** to ensure the elements flow nicely around the page with changes in view port size. I also used **media queries** to detect the width of the view port and change the flow of the content on the page. The sample codes below illustrate this:
```
@media screen and (min-width:767px){
  nav h1 a {
    font-size: 30pt !important;
  }
  nav {
    height: 120px !important;
  }
  nav h1 {
    line-height: 300% !important;
    }
    .inside #map-container {
    width: 100% !important;
  }
.............

#maincontent {
  background-color: #f3f3f3;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
}
```
### 2. Making the site Accessabilty
Web accessability is important for optimum cross-user experience. I used `tabIndex` to show priority of the elements when navigating the site and `aria-label="Home"` to mark the start point.
```
 <nav>
      <h1><a aria-label="Home" tabindex="1" href="/">Restaurant Reviews</a></h1>
    </nav>
```
One can easily navigate the site without a mouse or touch pad.

### 3. Making it offline first.
This I achieved with service worker. First I began by registering the service worker as shown
```
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
```
I then created an array list that would hold all the files of the site and make them accessible offline:
```
let cachedItems = [
    './',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',............
```
Once the user is online, the files are stored in the cache and hence become available to the user. The fetch request gets the requested file by the user and makes it available when the user is offline.
```
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
```
## HOSTING
The site has been hosted [HERE](https://wekesa931.github.io/Restaurant-Review-app/) with git pages. However for better experience, clone the project to your local director

