---
template: post
title: Creating UI components library with Angular
slug: creating-ui-components-library-with-angular
draft: false
date: '2019-12-30T12:00:00.000Z'
description: >
  Concise steps to create a UI component library using angular and publish it to npm.
category: Front-end
tags:
  - Javascript, Angular
---

> Feeling a need to create re-usable UI components for all of your projects or for all the projects across your organization? Here's a quick guide to creating such a library with angular and for angular apps and finally publish it to npm.

## Development Setup

1. Identify the common components which can be a part of your library.
2. Create an angular workspace using `ng new <project-name>  --createApplication=false`.
3. `--createApplication=false` flag will provide an angular workspace without any app inside it.
4. `cd <project-name>`
5. Create a library inside your angular workspace.
6. `ng g library <lib-name>`
7. This will be the lib where all your lib components will go.
8. Now, we need an application to test our lib and for local development of lib components.
9. So, create an app using `ng g application <app-name>`
10. That's all the dev setup needed for a basic `hello world` component.

## Deployment Guidelines

These are the steps to build and publish to npm manually. Based on your CI-CD tool you may automate them.

1. cd into your lib `cd projects/<lib-name>/`
2. Bump up the semver version using `npm version patch` or `npm version minor` or `npm version major`.
3. Good to have a npm script for the first 2 steps.
4. cd back into workspace root and build the library using `ng build <lib-name>`.
5. This will create a dist folder with packaged lib.
6. cd into `cd dist/<lib-name>` and run `npm publish`. (offcourse, first you need to be logged in to npm).
7. That's all folks! Your lib is now published on npm.

## Bonus Material

### Including global styles

1. Using `encapsulation: ViewEncapsulation.None` as suggested [here](https://stackoverflow.com/questions/53377419/how-to-add-global-style-to-angular-6-7-library/54784184) is one of the common way to include global styles.

2. I had a theme folder with around 15 different SCSS files, so I have used [parcel bundler](https://parceljs.org/) to create a single minified bundle and then use [cpx](https://www.npmjs.com/package/cpx) to copy that style to dist as part of build step.

3. Since the theme.min.css is now a part of lib so the user can simple import this file from their node_modules folder. It's preferred to add this file in angular.json's `styles: []`
4. Similarly you can export global js and import it from node_modules into angular.json's `scripts: []`

### Serving static assets

This is a bit tricky and need to follow specific guidelines.
I prefer copying them using [cpx](https://www.npmjs.com/package/cpx) and then in the app copy them again from node_modules folder to `assets/*` or any folder having similar path as it is there in lib code.

Feel free to add your suggestions and feedback in the comments below.

\- Ayush 🙂