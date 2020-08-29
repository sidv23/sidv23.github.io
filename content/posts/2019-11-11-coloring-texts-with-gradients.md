---
template: post
title: Coloring Texts With Gradients
slug: coloring-texts-with-gradients
draft: false
date: '2019-11-11T12:00:00.000Z'
description: >
  CSS does not accept gradient values for 'color' property, but we can still achieve color gradients for text color with this trick...
category: CSS-Tricks
tags:
  - CSS
  - UX
---

<style>
  .heading {
    background: linear-gradient(to right, #ff8a00, #e52e71);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .paragraph {
    background: linear-gradient(to bottom, #141100, #e36efa);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
<h2 class="heading">This is an example of a heading with text in color gradient from left to right</h2>
<p class="paragraph">
  This paragraph is in a color gradient from top to bottom.
  <br>
  CSS does not allow using gradient values in the `color` property. But with simple trick we can achieve the
  same effect by using a combination of `background` , `background-clip`, and `color:transparent` property. The
  concept here is to apply the required gradient color to the `background` property and then use
  `background-clip` to limit the background only to the `text` and finally use `color:transparent` to make the
  text color transparent and let the background gradient take over.
</p>

Here's the simple code -

```css
background: linear-gradient(to right, #ff8a00, #e52e71);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

Was this CSS trick helpful? let me know your feedback in the comments below.

\- Ayush 🙂
