---
template: post
title: Dynamically Choosing Accessible Contrasting Colors For Your Theme Using SCSS
slug: dynamically-choosing-accessible-contrasting-colors-for-your-theme-using-scss
draft: false
date: '2020-03-04T12:00:00.000Z'
description: >
  Ability to change color theme is a powerful feature and here is an easier way to achieve it while ensuring that accessibility is not compromised and text colors automatically adjusts according to the choosen theme.
category: CSS-Tricks
tags:
  - CSS
  - UX
---

> Ability to change color theme is a powerful feature and here is an easier way to achieve it while ensuring that accessibility is not compromised and text colors automatically adjusts according to the choosen theme.


1. For this implementation, we need to ensure that there is consistency across our UI components.
For example if the basic theme colors are as follows.

```scss
$color-primary: #cde8e7;
$color-secondary: #368fa4;
$text-light: #e8e6e6;
$text-dark: #03525b;
```

2. Then we can calculate whether to use `$text-light` or `$text-dark` for `text-primary` and `text-secondary` colors.
And we can calculate this by using the below formula.

```scss
@function text-contrast($n, $w, $b) {
  $color-brightness: round((red($n) * 299) + (green($n) * 587) + (blue($n) * 114) / 1000);
  $light-color: round((red(#ffffff) * 299) + (green(#ffffff) * 587) + (blue(#ffffff) * 114) / 1000);
  
  @if abs($color-brightness) < ($light-color/2){
    @return $w;
  }

  @else {
    @return $b;
  }
}
```

3. Now let's set the text colors for primary and secondary background colors.

```scss
$text-primary: text-contrast($color-primary, $text-light, $text-dark);
$text-secondary: text-contrast($color-secondary, $text-light, $text-dark);
```

4. Next, all we need to ensure is that there is consistency in our components.
If `background: $primary` then put `color: $text-primary` and similarly for secondary.

And a good way to do this will be use mixins.

```scss
@mixin primary() {
  background: $color-primary;
  color: $text-primary;
}

@mixin secondary() {
  background: $color-secondary;
  color: $text-secondary;
}
```

5. That's all the smart work needed. Feel free to add other required properties as well.
Now, in our components we can simply include this mixins to ensure consistency.

```scss
.primary-box {
  @include primary;
  height: 200px;
  width: 200px;
  ...
}

.secondary-box {
  @include secondary;
  ...
}
```

That's all we need to switch between different themes on the fly without losing accessiblity and maintaining proper color-contrasts for easily readable text.

Here's a codepen to play with the code
<div>
  <iframe height="265" style="width: 100%;" scrolling="no" title="Choosing contrasting text colors with scss" src="https://codepen.io/heyayush/embed/dyozEBW?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href='https://codepen.io/heyayush/pen/dyozEBW'>Choosing contrasting text colors with scss</a> by Ayush Sharma
    (<a href='https://codepen.io/heyayush'>@heyayush</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
<div>

Thanks for reading all along.
Let me know your feedback/suggestions in the comments.

\- Ayush 🙂
