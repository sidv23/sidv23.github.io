---
template: post
title: JAM stack Architecture
slug: jam-stack-architecture
draft: false
date: '2019-12-14T12:00:00.000Z'
description: >
  All we need to know about JAM stack architecture in a nutshell.
category: Front-end
tags:
  - Tech Architecture
---

In the recent years there had been significant buzz about JAM stack, many people have adopted it and it has been a pleasant experience working towards a better web. These are apps with pages that don't require an actual web server to dynamically render the content.

## What is JAM stack

- JAM (JavaScript APIs Markup) stack is an architecture for delivering super fast initial loading of websites.
- JAM stack architecture usually consists of a static site generator.
- It is cost effective solution as there isn't a need of a dedicated web server. Just pay for storage and for compute power used during build and deployments.
- As the Front-end is getting more complex nowadays, this helps in decoupling front-end from backend and server infrastructure.

## J A M

- **J** stands for JavaScript which is responsible for creating a reactive web page. It consist of dynamic programming running on client side to handle request/response cycle. It can be any front-end framework, library or even vanilla js.
- **A** stands for API which is responsible for connecting the data source to the user interface. It consists of all the server-side processes and database actions. This could be some Content Management System (CMS).
- **M** stands for Markup that is the html template generated at build time after pulling the required content from data souce by using APIs.

## Static Site Generators

Mostly we use a static site generator when following the JAM stack architecture.

Static site generators are just some tools that takes in the content from data source and then generate HTML pages based on that content.

This gives us pre generated HTML files along with the content present in it. This is ideal for Search Engine Optimization (SEO) and for faster initial loading time.

So, we get the best of both worlds that our initial loading is like a server side rendered app and after that we have the flexibility of using javascript to take care of interactions hence giving us the reactivity of a single page application.

## Why to go for JAM stack?

1. **Better Performance** by generating the pages at deploy time rather than building them on the fly on client side.
2. **Higher Security** with our server side processes abstracted into microservices APIs, hence surface areas for attack are reduced.
3. **Easy to Scale** using a CDN since we just have to serve a bunch of static files.

## When should we avoid JAM stack?

We should avoid JAM stack whenever-

1. We need a tight coupling between client and server.
2. Our app uses isomorphic rendering to build views on server at runtime.

## Best Practices

- Entire project on CDN.
- Everything lives in Git.
- Modern Build Tools.
- Automated Builds.
- Atomic Deploys.
- Instant Cache Invalidation.

PS: This blog website of mine is also based on JAM stack.

\- Ayush 🙂
