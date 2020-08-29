---
template: post
title: 'Case study: Hybrid app development using Ionic-3'
slug: case-study-hybrid-app-ionic3
draft: false
date: '2019-04-02T18:30:00.000Z'
description: >-
  Around May-June 2018 We started developing an Ionic app. I have knowledge of web apps, hence thought of leveraging those skills to create a hybrid application which can work on Android, IOS, and on the Web...
category: Front-end
tags:
  - Mobile Web
  - Ionic
  - Angular
  - Javascript
---

### 🎉 The kick start
Around May-June 2018 We started developing an Ionic app. I have knowledge of web apps, hence thought of leveraging those skills to create a hybrid application which can work on Android, IOS, and on the Web. Various factors were considered while making this decision whether to go with the hybrid app or native android app since the target platform was only android.

Finally decided to go with Ionic 3 because of the availability of many third party plugins to help us with the native functionalities, it has been around for a while and had an active community. And also, because of the fact that most of my team members were more comfortable with Angular over React.

Getting started on browser was quick and easy. However, configuring android development environment with emulator was something new for me and took a bit of research.
We kicked off with a login page and after login it was tabbed interface.

### 🤨 Native plugins vs web based alternatives
Another major decision ahead of me was whether to go with @ionic-native/google-maps or the web view using Google Maps Javascript API v3. This ended up as a general problem for all the cases where we had to choose between some native plugin and web based alternative.

Native maps would definitely perform better. We needed minimum objects on the map, primarily few hundreds of custom markers. There isn’t significant difference in performance of both the approaches when using it on android device with decent hardware configuration. Using Javascript API over native had an advantage that it can work on web and hence developers can easily use browser for development rather than working on emulator.

There was also a feature to view directions on the map but later we moved to redirecting user to native google maps app rather than showing those directions within our app.

I seriously hated working on emulator and dealing with native functionalities like camera, push notifications, GPS. Even I picked web based image viewer and video player and added touch gestures to them rather than using native ones.
I feel that I lose control when going for native plugins and thus debugging or customizing them as per the needs becomes difficult. Hence, I tried to stick with web based alternatives whenever possible.

### Dealing with touch events
Generally on web we only deal with mouse events. But it's good to deal with touch events as well. Especially when users views the websites on mobile then he should have a pleasing experience. HammerJS helped me in dealing with common touch events and provide smoother user experience while dealing with touch events like swipe, pan, double tap, pinch zoom.

### Animations
Since Ionic components follow material design spec hence it offers some basic animations. Mobile app users expect transition effects during navigation between various sections of the app hence its good user experience to add these effects. Angular-animations make it easy to add animations with various states of the component. For example if a component changes state from hide to show or show to hide then it should undergo a specified animation. This helps in providing the transition effects similar to native mobile apps.

### GraphQL over REST
Our microservices were built with node + GraphQL, thus on the client side I introduced apollo-angular to consume those APIs. There wasn't much to decide here, Apollo simply stood the de facto choice to go with because of its popularity, tooling available and active development. Apollo-angular 1.0.0 troubled us with some bugs for which we had to place some workarounds till they got resolved in v1.5.0
Use of GraphQL to fetch only the required data and then use of RxJS to process that data before binding it in the UI template made our life easier.

### 😠 Some pain points
1. Working with android emulator brought significant irritation to the dev experience as compared to working in browser and using chrome dev tools to debug.
2. Navigation using push-pop strategy was not working out well because we had fixed navigation tabs at the bottom. Switching between those tabs was using angular-router. Somehow it became a mixture of URL based routing and push-pop kind of navigation. Ionic had bugs with his navigation system and they have removed this feature in Ionic 4. In v4 they advise to use angular-router.
3. Dynamic deep links which contain data to redirect user to play store, install our app and then persist some metadata when the user opens the app was another pain point. This was due to immature native plugins. There were issues with compatibility of plugins with one another and with google-play services version.
4. Working with modal dialog: Our layout design wasn't ideal as there was google map in background and other components on top of it, just like modal dialog. This resulted in a lot of local state management like adding/removing DOM elements based on touch gestures. Using RxJS Subject and Observable did a great job of maintaining these states and I never felt the need of introducing proper state management tool like Redux, Mobx or ngrx.

### 🧐 Upgrading the core framework version (Ionic and Angular)
Since we started with Ionic 3.9.0 and Angular 5.1.0 and by March 2019 Ionic 4 and Angular 7 were released. This migration was challenging. Angular, RxJS, Apollo, Typescript were tightly coupled and all had to be upgraded keeping in mind they are compatible with each other. All these packages had significant breaking changes.

However, there were 2 major issues-
1. We have used some open source ionic3 libraries, currently those were not active and contributors were not interested in upgrading to Ionic4.
2. Mixture of angular’s URL based routing and ionic’s push-pop based navigation had to be refactored and consolidated with upgraded angular-router.

Anyway, the conclusion was to feature freeze our app and start migrating feature by feature to the new app and once regression tests provide stable results then shut down the older app.

Complete details on this upgrade is available in another article [Upgrading Ionic-3 Angular-5 app](/upgrading-ionic3-angular5-app)

### 😃 Some pleasing features
1. We used firebase cloud messaging and that served well and got integrated nicely with the use of available native plugins.
2. Internationalization support based on default language of user's device was straightforward implementation. However, I was not convinced on the idea of doing it on client side because unlike website, here in the android app we have to push a new update of our app in play store even if there is a simple text change.
3. We also had the concept of role based access control and based on the permissions granted to the logged in user we need to toggle features of our app which are available to him. This also went pretty well.
4. Google maps were smoothly rendering hundreds of custom markers on the map. When we tested with thousands of markers then there was some significant seconds of delay. There are few solutions to this like just loading the markers within the rectangular viewport of user's screen or making clusters of those markers when many of them are located in close vicinity. Lazy loading gradually using paginated queries in the background was another option.
5. Redirecting to external apps for calling, sms, map, email was easily handled using apt URI scheme.

### Conclusion
It was a decent learning experience. I believe that hybrid apps will continue in the market as Ionic4, react-native, flutter, native-script communities are active and providing a bridge between web and native environment.

Hybrid apps have huge potential to serve as an ideal solution for small or maybe mid scale apps. Basically, situations where quick prototyping or an MVP product is required. However, Progressive web apps (PWA) are amazing  alternative and I will recommend them anytime over hybrid apps unless I want to use some core native functionality which isn't possible otherwise.

What are your opinions on hybrid apps vs PWA? Post your comments below.

\- Ayush 🙂
