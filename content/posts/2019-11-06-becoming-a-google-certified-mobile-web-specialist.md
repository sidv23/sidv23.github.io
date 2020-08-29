---
template: post
title: Becoming a Google Certified Mobile Web Specialist
slug: becoming-a-google-certified-mobile-web-specialist
draft: false
date: '2019-11-06T12:00:00.000Z'
description: >-
  While preparing for google certification of mobile web specialist, here are the notes I made that helped a lot in understanding the concepts of modern web...
category: Front-end
tags:
  - Mobile Web
  - Developer Tools
  - Javascript
  - CSS
---

Here are the notes I made while while preparing for google certification of mobile web specialist. These are mostly high level pointers which serves as a quick revision of in-depth concepts.

[Study Guide](https://developers.google.com/certification/mobile-web-specialist/study-guide) was extremely useful as well as the [Codelab exercises](https://codelabs.developers.google.com/?cat=Web) and [MDN docs](https://developer.mozilla.org/bm/docs/Web).

## Basic Website Layout and Styling

1. Set the visual `viewport`, `width` property controls the size of the viewport, `initial-scale` controls the zoom level on first load.  
   It instructs the page to match the screen's width in device-independent pixels. This allows the page to reflow content to match different screen sizes, whether rendered on a small mobile phone or a large desktop monitor.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. Forcing the user to scroll horizontally or to zoom out in order to see the whole page results in a poor user experience.
3. Do not use large fixed width elements.
4. Use CSS media queries to apply different styling for small and large screens.
5. Use `<picture>` and `<source>` while dealing with responsive images.
6. Use :hover, :focus, :active to give some interaction to users.
7. Use outline CSS property to display a ring around an element when an element is focussed.
8. Example of a proper `<video>` tag.

```html
<video controls width="400" height="400" autoplay loop muted poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4" />
  <source src="rabbit320.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" />
  <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
</video>
```

9. Specify start and end times for a video

```html
<source src="video/chrome.webm#t=5,10" type="video/webm" />
```

10. Restarting media playback by calling the element's `load()` method.

```js
const mediaElem = document.getElementById("my-media-element")}}
mediaElem.load();
```

11. Classic readability theory suggests that an ideal column should contain 70 to 80 characters per line (about 8 to 10 words in English).

## Front End Networking

### Fetch api

1. Basic syntax is as follows

```js
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(e => console.log('Booo'));
```

```js
(async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log('Booo');
  }
})();
```

2. No CORS mode

```js
fetch('//google.com', {
  mode: 'no-cors'
}).then(response => console.log(response.type));
```

3. Response.body is a readable stream which can be read by these readers. These are true stream readers which drains the stream. Hence response.clone() is used to avoid draining the original stream.

   1. json()
   2. blob()
   3. arrayBuffer()
   4. formData()
   5. text()

Simple `POST` request is as follows
```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "Title of post",
    body: "Post Body"
  })
})
  .then(res => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error));
```
4. Adding Credentials to our request.
   - `credentials: 'include'` will always add credentials even if it is a cross origin request.
   - `credentials: 'same-origin'` will add credentials only if it is same origin.
   - `credentials: 'omit'` will ensure browser do not include credentials in request.

```js
fetch('https://example.com', {
  credentials: 'include'
});
```

5. Uploading single file.

```js
const formData = new FormData();
const fileField = document.querySelector("input[type='file']");
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
}).then(response => response.json());
```

6. Uploading multiple files

```js
const formData = new FormData();
const photos = document.querySelector("input[type='file'][multiple]");

formData.append('title', 'My Vegas Vacation');
for (var i = 0; i < photos.files.length; i++) {
  formData.append('photos', photos.files[i]);
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
}).then(response => response.json());
```

## Accessibility

### General accessibility guidelines

- Add `alt` text for images.
- Add `<tracks>` inside `<video>`.
- Ensure your page is accessible by not disabling user scaling.
- Use `title` attribute for icon buttons with no text.

### Use of skip links to bypass navbar and asides

When there are blocks of content which is repeated across all the pages. For eg. <nav>, <header> then it's irritating to tab through all of them again and again to reach the main content. Hence there should be skip links to directly skip to the main content.  
Skip link should always be the first item on the page.

```css
.skip-link {
  left: -100%;
  position: absolute;
}

.skip-link:focus {
  left: 50%;
}
```

```html
<track src="chrome-subtitles-en.vtt" label="English captions" kind="captions" srclang="en" default />
```

## Progressive Web App

### Service Worker

- Ability to intercept and handle network request. Programmatically managing a cache of responses. Programmable network proxy.
- Allows features like push notifications and background sync.
- It's similar to a shared Web Worker.
- Can't access DOM directly.
- Scope of service worker is by default `./` relative to the script URL.
- If multiple windows to your app are open, the new service worker will not take effect until they've all been reloaded and updated to the latest service worker.
- Unregistering a service worker does not clear the cache, so it may be possible you'll still get old data if the cache name hasn't changed.

#### Service Worker Lifecycle

1. Register the service worker from our app lifecycle.
2. This will trigger the install event of that service worker.
3. After install next states can be activated, error, idle, terminated.
4. `install` event is ideally used to cache all the static assets.
5. `activate` event is for cleaning up cache of previous installs.
6. `fetch` for intercepting network requests.

##### Registering the service worker

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
```

##### Install a service worker

```js
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/', '/styles/main.css', '/script/main.js'];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
```

- The `event.waitUntil()` method takes a promise and uses it to know how long installation takes, and whether it succeeded or not.
- `waitUntill()` ensures that the service worker will not install until the code inside waitUntil() has successfully executed.

##### Deleting old caches

```js
self.addEventListener('activate', event => {
  const cacheKeeplist = ['v2'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
```

##### Cache and return requests

```js
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
```

- `response.clone()` Cloning the response is necessary because request and response streams can only be read once.

##### Updating a service worker

- Update the sw.js or whatever the servive worker javascript file we have. If there is even a byte's difference in the service worker file compared to what it currently has, it considers it new.
- New service worker will be installed but not activated. When the currently open pages of your site are closed, the old service worker will be killed and the new service worker will take control.
- To immediately activate the new service worker. use `self.skipWaiting()` in install step and `self.clients.claim()` in activation step.
- `skipWaiting()` will make the new service worker take control with the older cache version. This might break things so use with caution.

### Manifest

- Manifest is a simple json file containing metadata of our web app.
- `<link rel="manifest" href="/manifest.webmanifest">`
- Manifest should be served using the `application/manifest+json` MIME type.
- Manifest is required to show the `add to home screen` prompt.
- Key properties like short_name, name,icons, start_url, background_color, display, orientation, scope, theme_color.
- Chrome uses `short_name` when both `name` and `short_name` are available.
- `display-mode` must be set to either `standalone` or `fullscreen` to trigger add to home screen prompt.
- `theme_color` sets the toolbar color.
- splash screen is constructed using `name`, `icons`, `background_color` and `theme_color`.
- Having a registered service worker with fetch event handler is must for instaling a PWA.
- Deferring the app install banner by saving the `beforeinstallprompt` event and calling the `prompt()` method of that event when needed.

```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 76 and later from showing the mini-infobar
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  ...
});

```

```js
// Show the prompt
deferredPrompt.prompt();
// Wait for the user to respond to the prompt
deferredPrompt.userChoice.then(choiceResult => {
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  deferredPrompt = null;
});
```

- To determine if pwa was successfully installed

```js
window.addEventListener('appinstalled', evt => {
  console.log('a2hs installed');
});
```

- Use of `display-mode:standalone` media query to detect if app is launched from home screen.

## Performance Optimization and Caching

### General guidelines for performance optimization

- Avoid CSS libraries as CSS is render blocking resource.
- JS is the most expensive resource we serve on the web byte for byte. As it has to be downloaded, parsed, compiled and then execute.
- Migrate to HTTP/2
- Minify assets.
- Configure server to compress resources.
- Optimize images, use WebP.
- Deliver images responsively. srcset attribute to an `<img>` tag.
- Use video instead of animated GIFs.
- Client hints like DPR, Width, Viewport-Width headers can help you deliver the best images for a device using server-side code and deliver less markup. Save-Data header.
- NetworkInformation API exposes information about the user's network connection.

### Web Workers

- Dedicated and Shared Web Workers.
- Running scripts in background threads.
- Workers run in another global context that is different from current `window`.
- We can't directly manipulate the DOM from inside a worker, or use some default methods and properties of the `window` object.
- Data is sent between workers and the main thread via a system of messages.
- Send messages using the `postMessage()` method, and respond to messages via the `onmessage` event handler.
- `importScripts()` to import scripts and then any global objects from that script can be used inside the worker.

```js
// main.js
if (window.Worker) {
  const myWorker = new Worker('worker.js');
  myWorker.postMessage([first.value, second.value]);
  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  };
}
```

```js
// worker.js
onmessage = function(e) {
  console.log('Message received from main script');
  const workerResult = 'Result: ' + e.data[0] * e.data[1];
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
```

### Resource Prioritization

- `rel=preload` is one such resource hint that allows early fetches of critical resources before the browser would otherwise discover them.
- `rel=preconnect` is another resource hint that can mask the latency of opening new connections for resources hosted on third party domains.
- `<link rel="preload">` informs the browser that a resource is needed as part of the current navigation, and that it should start getting fetched as soon as possible.
- if you’d like the browser to fetch some resources only when it’s done dealing with everything else, try `prefetch`.

#### Preload

- Use-case: Critical Path CSS and JavaScript
- Use-case: Fonts

```html
<link rel="preload" as="script" href="super-important.js" />
<link rel="preload" as="style" href="critical.css" />
<link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2" />
```

#### Preconnect

- `<link rel="preconnect">` informs the browser that your page intends to establish a connection to another origin, and that you’d like the process to start as soon as possible.
- Use-case: Knowing Where From, but not What You're Fetching
- Use-case: Streaming Media
- `<link rel="dns-prefetch">`

#### Prefetch

- `<link rel="prefetch">` informs the browser to load this low priority resource once it is done loading of critical resources and there's still bandwidth available.
- Use-case: Pre fetching resources of next page where we are expecting user to go to.

```html
<link rel="prefetch" href="page-2.html" />
```

### Media optimization

#### Responsive Images using `srcset` and `sizes` attribute with `<img>`

```html
<img
  sizes="(min-width: 1200px) 730w,
            (max-width: 1199px) 610w,
            (max-width: 380px) 350w"
  srcset="
    /img/blog/responsive-images-lg.png 730w,
    /img/blog/responsive-images-md.png 610w,
    /img/blog/responsive-images-sm.png 350w
  "
  src="/img/blog/reponsive-images.png"
  alt="responsive images"
/>
```

```html
<picture>
  <source media="(min-width: 1200px)" srcset="/img/blog/responsive-images-lg.png" />
  <source media="(max-width: 1199px)" srcset="/img/blog/responsive-images-md.png" />
  <source media="(max-width: 380px)" srcset="/img/blog/responsive-images-sm.png" />
  <img src="/img/blog/reponsive-images.png" alt="responsive images" />
</picture>
```

##### Pixel Density Descriptors 1x,2x,3x

Good for displaying high resolution images on high resolution displays

```html
<img
  sizes="(min-width: 1200px) 730w,
            (max-width: 1199px) 610w,
            (max-width: 380px) 350w"
  srcset="/img/blog/responsive-images-lg.png 730w 1x,
             /img/blog/responsive-images-lg@2x.png 730w 2x,
             /img/blog/responsive-images-md.png 610w 1x,
             /img/blog/responsive-images-md@2x.png 610w 2x,
             /img/blog/responsive-images-sm.png 350w 1x,
             /img/blog/responsive-images-sm@2x.png 350w 2x"
  src="/img/blog/reponsive-images.png"
  alt="responsive images"
/>
```

```html
<picture>
  <source
    media="(min-width: 1200px)"
    srcset="/img/blog/responsive-images-lg.png 1x, /img/blog/responsive-images-lg@2x.png 2x"
  />
  <source
    media="(max-width: 1199px)"
    srcset="/img/blog/responsive-images-md.png 1x, /img/blog/responsive-images-md@2x.png 2x"
  />
  <source
    media="(max-width: 380px)"
    srcset="/img/blog/responsive-images-sm.png 1x, /img/blog/responsive-images-sm@2x.png 2x"
  />
  <img src="/img/blog/reponsive-images.png" alt="responsive images" />
</picture>
```

- Inspecting network activity in dev tools for diagnostics
- Critical Rendering Path

### Cache

- The `Cache` interface provides a storage mechanism for Request / Response object pairs that are cached.
- An origin can have multiple named `Cache` objects.
- Items in a `Cache` do not get updated unless explicitly requested; they don’t expire unless deleted.

#### Example of serving font of cache if available else fetching from network and adding to cache

```js
const CACHE_VERSION = 1;
// Shorthand identifier mapped to specific versioned cache.
const CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  const expectedCacheNames = Object.values(CURRENT_CACHES);
  // Active worker won't be treated as activated until promise
  // resolves successfully.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!expectedCacheNames.includes(cacheName)) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    // Opens Cache objects that start with 'font'.
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache
        .match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Found response in cache:', response);
            return response;
          }
          console.log('Fetching request from the network');
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(function(error) {
          // Handles exceptions that arise from match() or fetch().
          console.error('Error in fetch handler:', error);
          throw error;
        });
    })
  );
});
```

### Web Storage

Each origin is given a certain amount of free space to do what it wants with it. That free space is shared between all origin storage: LocalStorage, IndexedDB, Filesystem, Caches.
The amount differ depending on device and storage conditions.

- The storage event is fired on a document's Window object when a storage area changes. This storage event can be used to keep app in sync when user open it up in different tabs.

#### Local Storage

- A global storage object which persist across browser sessions.
- Data stored in localStorage has no expiration time.
- The keys and the values are always strings.
- Storage limit depends upon the browser. Generally around 5 MB.
- localStorage works in a similar way to service worker cache, but it is synchronous, so not allowed in service workers.

#### Session Storage

SessionStorage maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser tab is open, including page reloads and restores)

#### Cookies

A cookie is a text file hosted on the user’s computer and connected to the domain that your website runs on. You can store information in them, read them out and delete them.
Cookies have a few limitations though:

- They add to the load of every document accessed on the domain.
- They allow up to only 4 KB of data storage.
- Because cookies have been used to spy on people’s surfing behavior, security-conscious people and companies turn them off or request to be asked every time whether a cookie should be set.

#### IndexedDB

- Good for the use case when large amount of data needs to be stored in a structured way on client side.
- Transactional database system.
- Uses indexes to enable high-performance searches of this data.
- Client-side storage of files/blob.
- We need to specify the database schema, open a connection to our database, and then retrieve and update data within a series of transactions.
- Operations performed using IndexedDB are done asynchronously, so as not to block applications.
- IndexedDB can be used inside a service worker for data storage if you require it.

## Testing and Debugging

### Common dev tools features to help in debugging

#### Network Diagnostics

- Adjusting default columns shown there. There are many more columns available which are usually hidden.
- Simulation of different network connections.
- Capturing screenshots.
- Inspecting resource's details like HTTP headers, Preview, Response, Timing.
- Blocking particular requests to see what happens if that requests fail.
- Searching and filtering of network requests.

#### Inspecting the Application tab

- Inspecting Manifest.
- Dealing with service worker lifecycle.
- Inspecting Web storage and Cache.

#### Using console.log properly

- `console.log()` for basic logging
- `console.error()` and `console.warn()` for eye-catching stuff
- `console.group()` and `console.groupEnd()` to group related messages and avoid clutter
- `console.assert()` to show conditional error messages if the first parameter evaluates to false.
- Auto-collapsing the groups by using `console.groupCollapsed()`.
- We can also use format specifiers like `%s`, `%i`, `%d`, `%o`, `%O`, `%f`, `%c` for string substitution and css style formatting.

## ES 2015 Concepts and Syntax

### Some general ES2015 syntax

- **Default function parameters** allow named parameters to be initialized with default values if no value or undefined is passed.

- The **for...of** statement creates a loop iterating over iterable objects, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables.

- Difference between **for let i in iterable** and **for let i of iterable**. and **iterable.hasOwnProperty(i)**.

### Set

The Set object lets you store unique values of any type, whether primitive values or object references.

`new Set([iterable]);`

Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

- Use-case: superb way to remove duplicate elements form an array.

### Map

The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.

The keys in Map are ordered while keys added to object are not. Thus, when iterating over it, a Map object returns keys in order of insertion.

- Use-case: whenever we need to frequently add and remove key value pairs.

## Mobile Web Forms

For good UX

- Avoid repeated actions. Ask only necessary info.
- Let they user know how far they are from submission.
- Use existing data to prefill info.
- Enable autofill.
- Choose the best HTML5 input type to simplify data input.
- Always use labels along with the input fields. Placeholders should not be used as labels.
- Placeholders are for providing hints to the user about what is expected in the input.
- Use autofocus attribute carefully.

### HTML5 Input types

url, tel, email, search, number, range, datetime-local, date, time, week, month, color.

### Offering suggestions with datalist

```html
<label for="frmFavChocolate">Favorite Type of Chocolate</label>
<input type="text" name="fav-choc" id="frmFavChocolate" list="chocType" />
<datalist id="chocType">
  <option value="white"> </option>
  <option value="milk"> </option>
  <option value="dark"> </option>
</datalist>
```

### Using correct autocomplete attributes

| Name attribute    | Autocomplete attribute |
| ----------------- | ---------------------- |
| name              | name                   |
| first name        | given-name             |
| middle name       | additional-name        |
| last name         | family-name            |
| email             | email                  |
| address           | street-address         |
| state or province | address-level1         |
| city              | address-level2         |
| zip code          | postal-code            |
| country           | country                |
| phone             | tel                    |
| credit card name  | cc-name                |
| cc number         | cc-number              |
| username          | username               |
| password          | current-password       |
| password          | new-password           |

### Form validation

- Leverage the browser's built-in validation attributes like pattern, required, min, max.

#### The pattern attribute
```html
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
```

#### min, max, step, minlength, maxlength
```html
<input type="number" min="1" max="13" step="0.5" maxlength="12" minlength="8">
```

#### The novalidate attribute
If we want to allow user to submit the invalid form then use novalidate attribute
```html
<form role="form" novalidate>...</form>
```

#### Constraint validation api
This allows us to do things like set a custom error, check whether an element is valid, and determine the reason that an element is invalid.

Basically, the idea is to trigger JavaScript on some form field event (like onchange) to calculate whether the constraint is violated, and then to use the method `field.setCustomValidity()` to set the result of the validation: an empty string means the constraint is satisfied, and any other string means there is an error and this string is the error message to display to the user.

| Property            | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| setCustomValidity() | Sets a custom validation message and the customError property of the ValidityState object to true. |
| validationMessage   | Returns a string with the reason the input failed the validation test.                             |
| checkValidity()     | Returns true if the element satisfies all of its constraints, and false otherwise.                 |
| reportValidity()    | Returns true if the element satisfies all of its constraints, and false otherwise.                 |
| validity            | Returns a ValidityState object representing the validity states of the element.                    |

##### File size constraint validation example

```js
function checkFileSize() {
  var FS = document.getElementById("FS");
  var files = FS.files;

  // If there is (at least) one file selected
  if (files.length > 0) {
     if (files[0].size > 75 * 1024) { // Check the constraint
       FS.setCustomValidity("The selected file must not be larger than 75 kB");
       return;
     }
  }
  // No custom constraint violation
  FS.setCustomValidity("");
}
```

##### Real time feedback with pseudo classes
| class         | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| :valid        | when the value meets all of the validation requirements.    |
| :invalid      | when the value does not meet all of the validations.        |
| :required     | where the required attribute set.                           |
| :optional     | where the element does not have the required attribute set. |
| :in-range     | where the value is in range.                                |
| :out-of-range | where the value is out of range.                            |

```css
input.dirty:not(:focus):invalid {
  background-color: #FFD9D9;
}
input.dirty:not(:focus):valid {
  background-color: #D9FFD9;
}
```
```js
const inputs = document.getElementsByTagName("input");
const inputs_len = inputs.length;
const addDirtyClass = (evt) => {
  sampleCompleted("Forms-order-dirty");
  evt.srcElement.classList.toggle("dirty", true);
};
for (let i = 0; i < inputs_len; i++) {
  const input = inputs[i];
  input.addEventListener("blur", addDirtyClass);
  input.addEventListener("invalid", addDirtyClass);
  input.addEventListener("valid", addDirtyClass);
}
```


Thanks for following along this huge summary.  
I hope you learned some new concepts or taking away some points to investigate more on.  
If you are also looking to give this certification exam, I wish you all the best and feel free to connect with me to know more details.  
And, have a good time developing some quality apps for the modern web.

\- Ayush 🙂
