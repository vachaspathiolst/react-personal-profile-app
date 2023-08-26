// service-worker.js

// Cache names for different types of resources
const CACHE_NAME = 'my-app-cache-001';
const API_CACHE_NAME = 'api-cache-001';
const STATIC_CACHE_NAME = 'static-cache-001';

// URLs to cache during installation
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/broken-offlinepage.html',
  // Add other static assets like CSS, JS, and images
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      // You can add more caching logic here
    ])
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Handle API requests (Firestore and Storage)
  if (url.includes('/vdurproj0001.firebaseapp.com') || url.includes('/vdurproj0001.appspot.com')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then(networkResponse => {
            const networkResponseClone = networkResponse.clone();
            cache.put(event.request, networkResponseClone);
            return networkResponse;
          }).catch(error => {
            // console.error('API Fetch failed:', error);
            // Return a fallback response if desired
            return redirect('/broken-offlinepage')
          });
        }).catch(() => {
          return cache.match('broken-offlinepage')
        });
      }).catch(() => {
        // Return a fallback response if desired
        return redirect('/broken-offlinepage')
      })
    );
    return; // Exit the fetch event after handling API requests
  }

  // // Handle other requests (static assets) using cache-first strategy
  // event.respondWith(
  //   caches.match(event.request).then(cachedResponse => {
  //     if (cachedResponse) {
  //       return cachedResponse
  //     }
  //     return fetch(event.request).then(networkResponse => {
  //       return caches.open(STATIC_CACHE_NAME).then(cache => {
  //         if (networkResponse) {
  //           cache.put(event.request, networkResponse.clone());
  //           return networkResponse;
  //         }
  //         return
  //       }).catch(() => {
  //         return
  //       });
  //     }).catch(() => {
  //       return redirect('/broken-offlinepage')
  //     });
  //   }).catch(() => {
  //     console.error('request url', event.request.url)
  //     return redirect('/broken-offlinepage.html')
  //   })
  // );
});
