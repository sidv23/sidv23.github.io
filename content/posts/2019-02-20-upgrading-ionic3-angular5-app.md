---
template: post
title: Upgrading an Ionic-3 Angular-5 app
slug: upgrading-ionic3-angular5-app
draft: false
date: '2019-02-19T18:30:00.000Z'
description: >-
  With the release of ionic 4 and angular 7, we knew the time has come to finally migrate our ionic 3 angular 5 app to the latest versions. But there are so many breaking changes. So, what should be the migration strategy and what will be it's impact...
category: Front-end
tags:
  - Mobile Web
  - Ionic
  - Angular
  - Javascript
---

#### Current framework versions
- Ionic: 3
- Angular: 5

#### Target upgrade versions
- Ionic: 4
- Angular: 7 (Angular 8 is expected in May-19)

#### Angular team has a clear roadmap:
They will ship a major release every 6 months and provide active support on those major releases for next 6 months by shipping minor updates and patches.

#### Ionic team is lagging behind the scheduled roadmap:
Most of the updates and bug fixes to their platform is delayed as their first priority is to provide support to their paid subscribers rather than open source development.

### The Good
1. Moving from ionic-cli to angular-cli:
    - Angular-cli 6+ is far more advanced and feature loaded than current ionic-cli 3.
    - Upgrading from 5 to 6 is a big step. But once updated to v6 all the future updates are made easy by using “ng update” command available in angular-cli 6+

2. Use of Web Components and angular-elements
    - Allows using framework independent web components

3. Typescript 3.3 claims 50%-75% faster build times using “incremental file watching” technique. More new features to language and improved error reporting.
   
4. Reduced Build size:
    - Uses “Tree-shaking” technique to remove dead/unused code and makes sure only the required code and assets goes in the production build.

5. Animations performance improvements:
    - Angular team claims that they have removed “web animations polyfill” resulting in slightly improved animations.

6. Easier integration with official angular-material library which is maintained by core angular/google team.

7. Breaking changes in Angular:
    - There’s isn’t any significant breaking change as I see in the [changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md)
    - Angular update from 5 to 7 is about dependency updates, new features and bug fixes.
    - [Angular-cli](https://angular.io/cli) 6+ is the best benefit of this update.

### The Bad
1. Compatibility:
    - Angular, RxJS, Apollo, Typescript are tightly linked with one another.
    - Angular 5, RxJS 5, Apollo 1, Typescript 2+ are compatible with each other.
    - If any of above has to be updated then preferred compatible versions will be Angular 7+, RxJS 6+, Apollo 1.5, Typescript 3.1+

2. Breaking changes in Ionic components:
    - Here’s the full list of [breaking changes.](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md)
    - Thankfully, there is a “migration linter” which can show all the warnings and errors in the code to ease developer’s job.

3. Breaking changes in RxJS:
    - RxJS team has mostly worked on performance improvements. Now their library is more modular.
    - As a result, these changes are related to import statements, syntax and renaming.
    - RxJS team has introduced “rxjs-compat” to provide backward compatibility and a linter to highlight errors in the code which needs to be changed.

4. Breaking changes in Apollo:
    - Apollo-angular 1.0 has been a bit of pain for us due to bugs in it and it’s compatibility. Upgrading to 1.5 will result in refactoring to remove the hacks which are currently in place to deal with bugs in 1.0


### The Ugly
1. Navigation:
    - Since Ionic 4 is framework independent it doesn’t have NavController like Ionic 3 and recommends to bring you own navigation.
    - Angular can use angular-router, React can use react-router, and so on.
    - This will be a significant amount of refactoring which was anyway required for easier long term maintenance.
    - Ionic nav guards such as ionViewDidLoad, ionViewCanLeave, ionViewCanEnter are removed in ionic 4 hence needs to be replaced with angular route guards.

2. Third party open source ionic-3 libraries have gone quite and authors may not be interested in upgrading to ionic-4.

There might be better alternate availables of those libraries but it will involve significant effort in switching to them.

#### Notes:
Ionic team is working on “Capacitor” which is supposed to replace or be an alternative of “Cordova”. Currently its in beta and isn’t mature enough for prod.

### Suggested Approach:
As ionic team recommends in their official [migration docs](https://ionicframework.com/docs/building/migration/#suggested-strategy) and in [this blog.](https://blog.ionicframework.com/a-guide-for-migrating-to-ionic-4-0/)

We should feature freeze the current release (might label it with legacy-ionic-3 app).
Then for the next release create a fresh ionic-4 app and start migrating features one by one.
More the number of features, more will be the complexity to migrate them. Hence it should not be delayed too much.

Finally, keep on regression testing ionic 4 app and once it is stable then shut down the v3 app and move to v4 app.

All the best!

\- Ayush 🙂