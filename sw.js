self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('site').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html'
       // 'https://andreymrovol.github.io/fortnitechallenges/challenges.json'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
