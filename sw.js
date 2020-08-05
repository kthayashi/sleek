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

var precacheConfig = [["/404.html","f2889eda9839b994546a4bc2fad39154"],["/assets/css/main.css","956b95199649ecb9f0091de0936babc6"],["/assets/img/favicon.png","87ca67852409f512cc28d9afae2c4bb3"],["/assets/img/icons/android-chrome-192x192.png","158f81021dbe06f88520d623eb20479c"],["/assets/img/icons/android-chrome-256x256.png","5266ced4ef1bf0d713027141737f2ab3"],["/assets/img/icons/android-chrome-512x512.png","f57d5a2dafa55cc464f8b1b16a2ea415"],["/assets/img/icons/apple-touch-icon.png","f02852646b4b01499bd02ef0c4cc5123"],["/assets/img/icons/favicon-16x16.png","e286f162da9ddda289fa40158e05b8b8"],["/assets/img/icons/favicon-32x32.png","05690cafbc041a1e60cacd3d9d91511c"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","54ae6a78e64dbd7809b1841c4ba42db7"],["/assets/img/icons/safari-pinned-tab.svg","753b406eed4da03634fabcce78393f85"],["/assets/img/posts/grass_mountain.jpg","14664214698221681d3b7ebb61cb1251"],["/assets/img/posts/grass_mountain_lg.jpg","79efe7e2765c735bf2f643f61f0a89e4"],["/assets/img/posts/grass_mountain_md.jpg","6d2557645c64e6eba8fbd987cd43f27c"],["/assets/img/posts/grass_mountain_placehold.jpg","1924e957afbf20f37d84c19f6650771b"],["/assets/img/posts/grass_mountain_sm.jpg","c2901d28abe7efebcb2ee70d08d1fd95"],["/assets/img/posts/grass_mountain_thumb.jpg","aae09e6b93fa774f223ebd9e355f64f2"],["/assets/img/posts/grass_mountain_thumb@2x.jpg","ac99b530f4cf2db4730ecd5deab354f0"],["/assets/img/posts/grass_mountain_xs.jpg","459bbf3073befa0f1262182681d2a5e3"],["/assets/img/posts/johnny-chen-77988-unsplash.jpg","a169f5fe0a456f1f5e4b201264d224a1"],["/assets/img/posts/johnny-chen-77988-unsplash_lg.jpg","242cc81dbbb7bce134d704d3b44b6ebc"],["/assets/img/posts/johnny-chen-77988-unsplash_md.jpg","448fd989d341ef41ea196e82a4ee160a"],["/assets/img/posts/johnny-chen-77988-unsplash_placehold.jpg","7eb429be2d0d06a427598a7417bc5441"],["/assets/img/posts/johnny-chen-77988-unsplash_sm.jpg","5e27e28fb4a7c32ae3cd855477e04207"],["/assets/img/posts/johnny-chen-77988-unsplash_thumb.jpg","8833b4c36991f0e20d9907ed059592b0"],["/assets/img/posts/johnny-chen-77988-unsplash_thumb@2x.jpg","1d1566989981b55f3b1d19626e7c7a4c"],["/assets/img/posts/johnny-chen-77988-unsplash_xs.jpg","064630505230d22314f7f863996bd718"],["/assets/img/posts/lasthenia.jpg","05b54525e9a95b29f3722cd766411257"],["/assets/img/posts/lasthenia_community_1.jpg","7f26b240d586cd732b94e207343e664d"],["/assets/img/posts/lasthenia_community_1_lg.jpg","c18c055990c29da557520cccb8e268a4"],["/assets/img/posts/lasthenia_community_1_md.jpg","096009fa1768474a15ff09e9471e564f"],["/assets/img/posts/lasthenia_community_1_placehold.jpg","7e163765d261d7fd32757ab5f594d4b7"],["/assets/img/posts/lasthenia_community_1_sm.jpg","b02eb92c66bc86f2f72cb87a4b8d2798"],["/assets/img/posts/lasthenia_community_1_thumb.jpg","3ffad828bf1beb5826f9d9d55f9b1407"],["/assets/img/posts/lasthenia_community_1_thumb@2x.jpg","b10790bb17091fda3949a4abfd272b86"],["/assets/img/posts/lasthenia_community_1_xs.jpg","5b4d133f910fef5a8f1d19effc686ea8"],["/assets/img/posts/lasthenia_community_2.jpg","cc6c2590ff5ac07c923d9d238354f442"],["/assets/img/posts/lasthenia_community_2_lg.jpg","c2716c6fb9bc5795d8d3e338990a0a56"],["/assets/img/posts/lasthenia_community_2_md.jpg","7dd95078abaf3166aec99e7e085329e4"],["/assets/img/posts/lasthenia_community_2_placehold.jpg","9709c5f03fdb63440409e6d8c51bf178"],["/assets/img/posts/lasthenia_community_2_sm.jpg","baab40f9d8c032446a073bfdecfe407c"],["/assets/img/posts/lasthenia_community_2_thumb.jpg","ee7aad5fd8d8aadfabbd9671783b50eb"],["/assets/img/posts/lasthenia_community_2_thumb@2x.jpg","98ae66220a6d376a0f5068da783c69d0"],["/assets/img/posts/lasthenia_community_2_xs.jpg","59065b32ec4cd17bd38b1f9689fd85ac"],["/assets/img/posts/lasthenia_lg.jpg","eb8505ab2f951ea573b4d6832df09200"],["/assets/img/posts/lasthenia_md.jpg","71ac3d3d293ac96376e10cf62d20b31a"],["/assets/img/posts/lasthenia_on_hummock.jpg","189d3c06c4d48dd2e5f066604b6943db"],["/assets/img/posts/lasthenia_on_hummock_lg.jpg","ce8249afb421d84622f935883be67ddf"],["/assets/img/posts/lasthenia_on_hummock_md.jpg","99974a821371ea084a82b13e3b250473"],["/assets/img/posts/lasthenia_on_hummock_placehold.jpg","2c42ed7f101ffa972f62fdb4eb29fc10"],["/assets/img/posts/lasthenia_on_hummock_sm.jpg","61c185643811cf86a11a622f6b50e978"],["/assets/img/posts/lasthenia_on_hummock_thumb.jpg","dfe23f1fd23772248e2daf166b368802"],["/assets/img/posts/lasthenia_on_hummock_thumb@2x.jpg","16f015c804079620562786f6a9bea545"],["/assets/img/posts/lasthenia_on_hummock_xs.jpg","c9c3c508ba2adf9aa9ad5be2723d8705"],["/assets/img/posts/lasthenia_placehold.jpg","531e59b354086e480d57825eb313852b"],["/assets/img/posts/lasthenia_sm.jpg","32a92d0edb525383d30a5e84f8c43628"],["/assets/img/posts/lasthenia_thumb.jpg","b327a6766a10890175c66e03b3f5157a"],["/assets/img/posts/lasthenia_thumb@2x.jpg","d49c28d3d6eb3d5b87c87a613e2dba60"],["/assets/img/posts/lasthenia_xs.jpg","e859978fe9d73a198850074be1d2a3ad"],["/assets/img/posts/miller_et_al_2018.png","cf98f5405964c9f6bf8171c4ce5b911c"],["/assets/img/posts/plantago.jpg","b99e68e327b9ab4d398188128746be13"],["/assets/img/posts/plantago_lg.jpg","182a732b4355446456183125fbdeb61f"],["/assets/img/posts/plantago_md.jpg","2b1d4ef2f7e5ab02b774860523f10dbb"],["/assets/img/posts/plantago_placehold.jpg","ac09c194065f71f8e6cbccd678a1f21b"],["/assets/img/posts/plantago_sm.jpg","56a14e2cf5864b2148a2461b02b6d92d"],["/assets/img/posts/plantago_thumb.jpg","60e8abbd91831c4814ce690993f8a536"],["/assets/img/posts/plantago_thumb@2x.jpg","a3e446a16e76dd689026158157222822"],["/assets/img/posts/plantago_xs.jpg","19d7639b2234ae5985aeb3ea58698558"],["/assets/img/posts/royce_hall.jpg","6f5aa232aeb74bc856a98eb112e6ca97"],["/assets/img/posts/royce_hall_lg.jpg","f8a260ba43193c3a07e2b500b82e0ac7"],["/assets/img/posts/royce_hall_md.jpg","a6d3ec0c0420dce904ea656e7889875e"],["/assets/img/posts/royce_hall_placehold.jpg","86d8e409b61d24b9155efa501f065fc7"],["/assets/img/posts/royce_hall_sm.jpg","208421d3dfc7a2c33b1c1142319e6e2d"],["/assets/img/posts/royce_hall_thumb.jpg","2c2e574a66545ee743cedf7a75526c46"],["/assets/img/posts/royce_hall_thumb@2x.jpg","65a90da7af12fa194761530384896003"],["/assets/img/posts/royce_hall_xs.jpg","2c1847a68809493a5b9504e44e0bfa6f"],["/assets/img/posts/sedgwick_hummocks_fall.jpg","57c0f460e61679329f7caea8e0db6d18"],["/assets/img/posts/sedgwick_hummocks_fall_lg.jpg","2ae58daa482d761aa2342a29545b7c04"],["/assets/img/posts/sedgwick_hummocks_fall_md.jpg","390d87814df7fadea3f71a41b06e9b4e"],["/assets/img/posts/sedgwick_hummocks_fall_placehold.jpg","fb2bdc51563cd6d10d76dbae9edc4629"],["/assets/img/posts/sedgwick_hummocks_fall_sm.jpg","cf30e37b78214c4f67667c9d8b926a6b"],["/assets/img/posts/sedgwick_hummocks_fall_thumb.jpg","775ea6d896618dad48ef876009e3c00b"],["/assets/img/posts/sedgwick_hummocks_fall_thumb@2x.jpg","c14eeb2d07a14c3acdf9d85efcec9703"],["/assets/img/posts/sedgwick_hummocks_fall_xs.jpg","1d28254fbce4a162323ad419022ead40"],["/assets/img/posts/sedgwick_hummocks_spring.jpg","d264efef6c2cdaa30dc92b0da8fe4711"],["/assets/img/posts/sedgwick_hummocks_spring_lg.jpg","3e01b3796cee3decfe16cad3ca68f21a"],["/assets/img/posts/sedgwick_hummocks_spring_md.jpg","12ff1416c35374d1b89cc34f299ed2e7"],["/assets/img/posts/sedgwick_hummocks_spring_placehold.jpg","67e0b6715e7e02b7acc89d7629061b12"],["/assets/img/posts/sedgwick_hummocks_spring_sm.jpg","8e5239b816fe3dae716baefe7a187eba"],["/assets/img/posts/sedgwick_hummocks_spring_thumb.jpg","f26fadb9137dd4bd69435c4fdc38679b"],["/assets/img/posts/sedgwick_hummocks_spring_thumb@2x.jpg","9424c9779811f65b04bad005c8d9f2ae"],["/assets/img/posts/sedgwick_hummocks_spring_xs.jpg","7c065ba269562b3eeca4e8f98ca85cb1"],["/assets/img/posts/sedgwick_landscape_fall.jpg","b7f209a5a2e4ca242e93e2cf4a3a203e"],["/assets/img/posts/sedgwick_landscape_fall_lg.jpg","cbc288834b0756ea4fe621621e468989"],["/assets/img/posts/sedgwick_landscape_fall_md.jpg","612a396751ecadfbbf4638d32cc285ea"],["/assets/img/posts/sedgwick_landscape_fall_placehold.jpg","c5ac74fae8b569b0cbf9945038213609"],["/assets/img/posts/sedgwick_landscape_fall_sm.jpg","92fdd45e3872d0b50013bd880b75f9a2"],["/assets/img/posts/sedgwick_landscape_fall_thumb.jpg","be0caae01bf64b1088c4b9a4ff320cc4"],["/assets/img/posts/sedgwick_landscape_fall_thumb@2x.jpg","78f42afd1245002e2871222a52b0b5ba"],["/assets/img/posts/sedgwick_landscape_fall_xs.jpg","a1029f0908b893a9efdd0ddff4f85903"],["/assets/img/posts/sedgwick_landscape_spring.jpg","de6f17bd044649a6e6fc90f99daf0bdd"],["/assets/img/posts/sedgwick_landscape_spring_lg.jpg","9abc59ab2abde9c6096912e960ecd9e5"],["/assets/img/posts/sedgwick_landscape_spring_md.jpg","826c43e5d62fdcbd190a820d0af84b1a"],["/assets/img/posts/sedgwick_landscape_spring_placehold.jpg","492126c398e5ce2436c2f6133038644c"],["/assets/img/posts/sedgwick_landscape_spring_sm.jpg","32a9730a3795e57e7dfe21297375b2f3"],["/assets/img/posts/sedgwick_landscape_spring_thumb.jpg","ac6b222f813f28eb0f097a57e405ec9e"],["/assets/img/posts/sedgwick_landscape_spring_thumb@2x.jpg","f55e0df276b09c70b3a55ba654b24c59"],["/assets/img/posts/sedgwick_landscape_spring_xs.jpg","792251646cf5bb3ad77333bc4f406e7d"],["/assets/img/profile_pic.jpg","6bf69cdbedfbd11e1612aafd5be7f115"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","ec72ec828619f6bfadebf745116db841"],["/contact/index.html","02a0362f5ef35952eb678aa36027ce82"],["/cv/index.html","4a4baed7c3a5deb4fcb1c4405f3993ac"],["/explaining-the-oceans-richest-biodiversity-hotspot-and-global-patterns-of-fish-diversity/index.html","68b78864b2716808bd5a459f372b9f56"],["/i-started-a-phd-at-ucla/index.html","c28048d39778c54f4d0a21dec66698aa"],["/index.html","5a7180c064d03a2346b741d5ea06e565"],["/publications/index.html","b2dba7fdab764ba9093092467ec23e56"],["/research/index.html","2aef6f9026cdd0fbb90709737c60cc3d"],["/sw.js","3cb18ebed4a31b196a00960cee08c245"]];
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







