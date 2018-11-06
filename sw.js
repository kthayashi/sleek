/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","be615461d2bc5d0b36f18dc7f8c9d54f"],["/assets/css/main.css","956b95199649ecb9f0091de0936babc6"],["/assets/img/favicon.png","87ca67852409f512cc28d9afae2c4bb3"],["/assets/img/icons/android-chrome-192x192.png","158f81021dbe06f88520d623eb20479c"],["/assets/img/icons/android-chrome-256x256.png","5266ced4ef1bf0d713027141737f2ab3"],["/assets/img/icons/android-chrome-512x512.png","f57d5a2dafa55cc464f8b1b16a2ea415"],["/assets/img/icons/apple-touch-icon.png","f02852646b4b01499bd02ef0c4cc5123"],["/assets/img/icons/favicon-16x16.png","e286f162da9ddda289fa40158e05b8b8"],["/assets/img/icons/favicon-32x32.png","05690cafbc041a1e60cacd3d9d91511c"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","54ae6a78e64dbd7809b1841c4ba42db7"],["/assets/img/icons/safari-pinned-tab.svg","753b406eed4da03634fabcce78393f85"],["/assets/img/posts/blue_flax.jpg","6822543298f4fbe9920bbe47bb6a7dbd"],["/assets/img/posts/blue_flax_lg.jpg","363bc23ae9e67f0bd61e0cc3fd030731"],["/assets/img/posts/blue_flax_md.jpg","0625108aaa49abd72c0269cb27f1af5e"],["/assets/img/posts/blue_flax_placehold.jpg","6e698bc8b3ce94493a9486898beac3ba"],["/assets/img/posts/blue_flax_sm.jpg","6f5a1bb52ca9e1e4ecaadf682bd96010"],["/assets/img/posts/blue_flax_thumb.jpg","ce1b5f52b11b348afa46c7c43398befa"],["/assets/img/posts/blue_flax_thumb@2x.jpg","23f8d6031f18e44f39df6ceae614f8c9"],["/assets/img/posts/blue_flax_xs.jpg","2918e0298900d38671a99b27e90b1a97"],["/assets/img/posts/columbines.jpg","876ff110d5d49963c793ac4ef7b514bb"],["/assets/img/posts/columbines_lg.jpg","6d6afc66ad211fc03f2df56aa8b25b82"],["/assets/img/posts/columbines_md.jpg","26d259f98340c98ca795bd5985f8743b"],["/assets/img/posts/columbines_placehold.jpg","8bc15f80fd69b0f2e12c5c9a6693d8ab"],["/assets/img/posts/columbines_sm.jpg","8d953db66acdf20ecbc64fc91990b860"],["/assets/img/posts/columbines_thumb.jpg","931c92c16fb0b2605617981fa49791e4"],["/assets/img/posts/columbines_thumb@2x.jpg","290e72da4299b98e8fa7e20107aebb51"],["/assets/img/posts/columbines_xs.jpg","cf293915026fd1687ebef5e93f1082ff"],["/assets/img/posts/elevational_gradient.jpg","0c67224a63890a97d67372ff8640646a"],["/assets/img/posts/elevational_gradient_lg.jpg","26efaadcc9c7dee7aa8c90a0323365ce"],["/assets/img/posts/elevational_gradient_md.jpg","1ed2be6927970e3cc458e4349010309d"],["/assets/img/posts/elevational_gradient_placehold.jpg","2dc7e83ae6a861fd74cfe7bd5bfbc530"],["/assets/img/posts/elevational_gradient_sm.jpg","c8df51ca1f0ac1ea0c5065a53f55f01d"],["/assets/img/posts/elevational_gradient_thumb.jpg","d5209255584542dd373f87bb4d0c5206"],["/assets/img/posts/elevational_gradient_thumb@2x.jpg","51d2e2d19f517e2d48c957b7d1f50285"],["/assets/img/posts/elevational_gradient_xs.jpg","641613cd348dbc59d36051b7d0aed6fb"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/indian_paintbrush.jpg","f6558baa63f4d84a225ecb7232623822"],["/assets/img/posts/indian_paintbrush_lg.jpg","ff32d43bd7fa6406cbb1ee11c4d1108b"],["/assets/img/posts/indian_paintbrush_md.jpg","5de8444dcc9c6475db5c76d22e3dd10a"],["/assets/img/posts/indian_paintbrush_placehold.jpg","309bf7d03663ee96668b8c2651432106"],["/assets/img/posts/indian_paintbrush_sm.jpg","36bf2ce130c07220547939accf12ebd2"],["/assets/img/posts/indian_paintbrush_thumb.jpg","4de33ba19ca81c8fb7a3ca429b93899d"],["/assets/img/posts/indian_paintbrush_thumb@2x.jpg","170788322c6482adfb6e2e6b8f5e16af"],["/assets/img/posts/indian_paintbrush_xs.jpg","93a03867338f9190d0b5dd25d22fe363"],["/assets/img/posts/johnny-chen-77988-unsplash.jpg","a169f5fe0a456f1f5e4b201264d224a1"],["/assets/img/posts/johnny-chen-77988-unsplash_lg.jpg","242cc81dbbb7bce134d704d3b44b6ebc"],["/assets/img/posts/johnny-chen-77988-unsplash_md.jpg","448fd989d341ef41ea196e82a4ee160a"],["/assets/img/posts/johnny-chen-77988-unsplash_placehold.jpg","7eb429be2d0d06a427598a7417bc5441"],["/assets/img/posts/johnny-chen-77988-unsplash_sm.jpg","5e27e28fb4a7c32ae3cd855477e04207"],["/assets/img/posts/johnny-chen-77988-unsplash_thumb.jpg","8833b4c36991f0e20d9907ed059592b0"],["/assets/img/posts/johnny-chen-77988-unsplash_thumb@2x.jpg","1d1566989981b55f3b1d19626e7c7a4c"],["/assets/img/posts/johnny-chen-77988-unsplash_xs.jpg","064630505230d22314f7f863996bd718"],["/assets/img/posts/miller_et_al_2018.png","cf98f5405964c9f6bf8171c4ce5b911c"],["/assets/img/posts/royce_hall.jpg","6f5aa232aeb74bc856a98eb112e6ca97"],["/assets/img/posts/royce_hall_lg.jpg","f8a260ba43193c3a07e2b500b82e0ac7"],["/assets/img/posts/royce_hall_md.jpg","a6d3ec0c0420dce904ea656e7889875e"],["/assets/img/posts/royce_hall_placehold.jpg","86d8e409b61d24b9155efa501f065fc7"],["/assets/img/posts/royce_hall_sm.jpg","208421d3dfc7a2c33b1c1142319e6e2d"],["/assets/img/posts/royce_hall_thumb.jpg","2c2e574a66545ee743cedf7a75526c46"],["/assets/img/posts/royce_hall_thumb@2x.jpg","65a90da7af12fa194761530384896003"],["/assets/img/posts/royce_hall_xs.jpg","2c1847a68809493a5b9504e44e0bfa6f"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/img/profile_pic.jpg","6bf69cdbedfbd11e1612aafd5be7f115"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","91785c0c92a4e545c2401a8cbbb1d857"],["/contact/index.html","c9736b8f08f3fa84e87592c52079be33"],["/cv/index.html","a9fb5a9ee25fec02c1ef5061fbf9c5a5"],["/explaining-the-oceans-richest-biodiversity-hotspot-and-global-patterns-of-fish-diversity/index.html","0f20993436317adb28feef89ca9a9eee"],["/i-started-a-phd-at-ucla/index.html","815b97e5fd8f58693d49f7485c7fc5c9"],["/index.html","ace3ecdfce433b2177978dde7304c17b"],["/publications/index.html","a15aec5e9e8a64fa6721f9edccaf1e6e"],["/research/index.html","b59b6175835ce942576aa41f5d25fd39"],["/sw.js","493cde6d1a97997d1f5125ac747d007a"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







