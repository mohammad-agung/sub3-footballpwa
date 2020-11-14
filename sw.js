importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute([
    {
        url: "/index.html",
        revision: '4'
    },
    {
        url: "/nav.html",
        revision: '4'
    },
    {
        url: "/profile-club.html",
        revision: '4'
    },
    {
        url: "/profile-player.html",
        revision: '4'
    },
    {
        url: "/sw.js",
        revision: '4'
    },
    {
        url: "/manifest.json",
        revision: '4'
    },
    {
        url: "/logo-club.png",
        revision: '4'
    },
    {
        url: "/pages/home.html",
        revision: '4'
    },
    {
        url: "/pages/favoriteTeam.html",
        revision: '4'
    },
    {
        url: "/pages/matches.html",
        revision: '4'
    },
    {
        url: "/pages/result.html",
        revision: '4'
    },
    {
        url: "/assets/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
        revision: '4'
    },
    {
        url: "/assets/css/app.css",
        revision: '4'
    },
    {
        url: "/assets/css/material-icon.css",
        revision: '4'
    },
    {
        url: "/assets/css/materialize.min.css",
        revision: '4'
    },
    {
        url: "/assets/images/2014.png",
        revision: '4'
    },
    {
        url: "/assets/images/author-32.png",
        revision: '4'
    },
    {
        url: "/assets/images/author-64.png",
        revision: '4'
    },
    {
        url: "/assets/images/author-128.png",
        revision: '4'
    },
    {
        url: "/assets/images/author-256.png",
        revision: '4'
    },
    {
        url: "/assets/images/author-512.png",
        revision: '4'
    },
    {
        url: "/assets/js/lib/idb.js",
        revision: '4'
    },
    {
        url: "/assets/js/api.js",
        revision: '4'
    },
    {
        url: "/assets/js/db.js",
        revision: '4'
    },
    {
        url: "/assets/js/favorite.js",
        revision: '4'
    },
    {
        url: "/assets/js/home.js",
        revision: '4'
    },
    {
        url: "/assets/js/matches.js",
        revision: '4'
    },
    {
        url: "/assets/js/materialize.min.js",
        revision: '4'
    },
    {
        url: "/assets/js/nav.js",
        revision: '4'
    },
    {
        url: "/assets/js/notifikasi.js",
        revision: '4'
    },
    {
        url: "/assets/js/profile-club.js",
        revision: '4'
    },
    {
        url: "/assets/js/profile-player.js",
        revision: '4'
    },
    {
        url: "/assets/js/result.js",
        revision: '4'
    }
], {
    ignoreURLParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpg|svg|jpeg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/css2\?family\=Roboto\:ital\,wght@0\,100\;0\,300\;0\,400\;0\,500\;0\,700\;0\,900\;1\,100\;1\,300\;1\,400\;1\,500\;1\,700\;1\,900\&display\=swap/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/s\/roboto\/v20\/KFOlCnqEu92Fr1MmWUlfBBc4\.woff2/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/s\/roboto\/v20\/KFOmCnqEu92Fr1Mu4mxK\.woff2/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/s\/roboto\/v20\/KFOlCnqEu92Fr1MmEU9fBBc4\.woff2/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);



self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'logo-club.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});