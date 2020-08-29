---
template: post
title: SCSS Mixin For Media Queries
slug: scss-mixin-for-media-queries
draft: false
date: '2020-04-03T12:00:00.000Z'
description: >
  Simple solution for writing media queries using a SCSS mixin.
category: CSS-Tricks
tags:
  - CSS
  - UX
---

> Simple solution for writing media queries using a SCSS mixin.

1. First declare the breakpoints.

```scss
$breakpoint-small: '360px';
$breakpoint-medium: '720px';
$breakpoint-large: '1080px';
```

2. Use this media query mixin.

```scss
@mixin mediaQuery($query) {
  $queries: (
    small-only: '(max-width: #{$breakpoint-small})',
    medium-only: '(min-width: #{$breakpoint-small}) and (max-width: #{$breakpoint-medium})',
    large-only: '(min-width: #{$breakpoint-medium}) and (max-width: #{$breakpoint-large})',
    medium-up: '(min-width: #{$breakpoint-small})',
    large-up: '(min-width: #{$breakpoint-medium})'
  );

  @if map-has-key($queries, $query) {
    // Get the query value from the map.
    $query-value: map-get($queries, $query);

    // Write the media query.
    @media #{$query-value} {
      @content;
    }
  } @else {
    // Log a warning if the media query doesn't exist in the map.
    @warn 'Invalid media query: #{$query}.';
  }
}
```

3. Now use this mixin to write your media queries

```scss
@include mediaQuery(small-only) {
  font-size: $text-small;
}

@include mediaQuery(medium-up) {
  font-size: $text-medium;
}
```
That's all!
Simple and elegant way of writing media queries and making sure our pages are responsive.

Let me know your feedback/suggestions in the comments.

\- Ayush 🙂