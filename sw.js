// Service Worker for caching character sheet resources
const CACHE_NAME = 'character-sheet-v1';
const STATIC_ASSETS = [
    '/character/character.html',
    '/character/index.html',
    '/character/assets/css/style.css',
    '/character/assets/js/character-sheet.js',
    '/character/assets/js/character-ui.js',
    '/character/assets/js/character-manager.js',
    '/character/assets/js/component-loader.js',
    '/character/assets/js/firebase-config.js',
    '/character/components/equipment.html',
    '/character/components/character-info.html',
    '/character/components/ability-scores.html',
    '/character/components/derived-stats.html',
    '/character/components/traits-jobbase.html',
    '/character/components/notes.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(error => {
                console.error('Service Worker: Error caching static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip Firebase requests (always go to network)
    if (event.request.url.includes('firestore.googleapis.com') || 
        event.request.url.includes('firebase')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return response;
                }
                
                // Otherwise, fetch from network
                console.log('Service Worker: Fetching from network', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone response for caching
                        const responseToCache = response.clone();
                        
                        // Cache the response for next time
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
            .catch(error => {
                console.error('Service Worker: Fetch failed', error);
                // Return offline fallback page if available
                if (event.request.destination === 'document') {
                    return caches.match('/character/index.html');
                }
            })
    );
});

// Background sync for offline character saves
self.addEventListener('sync', event => {
    if (event.tag === 'character-save') {
        event.waitUntil(syncCharacterData());
    }
});

async function syncCharacterData() {
    try {
        // Get pending character saves from IndexedDB
        const pendingSaves = await getPendingCharacterSaves();
        
        for (const save of pendingSaves) {
            try {
                // Attempt to sync with Firebase
                await syncCharacterToFirebase(save);
                // Remove from pending saves
                await removePendingCharacterSave(save.id);
            } catch (error) {
                console.error('Failed to sync character:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Helper functions for IndexedDB operations
async function getPendingCharacterSaves() {
    // Implementation would use IndexedDB
    return [];
}

async function removePendingCharacterSave(id) {
    // Implementation would use IndexedDB
}

async function syncCharacterToFirebase(save) {
    // Implementation would call Firebase API
}