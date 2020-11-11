/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import heroImage_1 from '../public/images/hero-image_2.jpg';
import heroImage_2 from '../public/images/hero-image_1.jpg';
import heroImage_3 from '../public/images/hero-image_4.jpg';
import heroImageSmall_1 from '../public/images/hero-image_2-small.jpg';
import heroImageSmall_2 from '../public/images/hero-image_1-small.jpg';
import heroImageSmall_3 from '../public/images/hero-image_4-small.jpg';
import CacheHelper from './utils/cache-helper';

precacheAndRoute([
  { url: '/index.html', revision: null },
  { url: '/sw.js', revision: null },
  { url: '/app~3d9b8e9e.bundle.js', revision: null },
  { url: heroImage_1, revision: null },
  { url: heroImage_2, revision: null },
  { url: heroImage_3, revision: null },
  { url: heroImageSmall_1, revision: null },
  { url: heroImageSmall_2, revision: null },
  { url: heroImageSmall_3, revision: null },
]);

registerRoute(
  CacheHelper.matchOrigin,
  new CacheFirst({
    cacheName: 'assets',
  }),
);

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst(),
);

registerRoute(
  CacheHelper.matchFont,
  new CacheFirst({
    cacheName: 'assets',
  }),
);

registerRoute(
  CacheHelper.matchApi,
  new StaleWhileRevalidate({
    cacheName: 'database',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  '/app~3d9b8e9e.bundle.js',
  new StaleWhileRevalidate({
    cacheName: 'assets',
  }),
);
