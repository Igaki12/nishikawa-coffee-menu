// キャッシュ名を定義
const CACHE_NAME = 'nishikawa-free-coffee-v1';
// キャッシュに入れたいリソース（例）
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon_top_654x654.png',
    'svg-footer2.svg',
    'svg-header1.svg',
    'svg-loading1.svg',
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// リソース取得時のキャッシュロード戦略
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // キャッシュがあればそれを返す。なければネットワークにアクセス
            return response || fetch(event.request);
        })
    );
});