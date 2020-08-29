---
template: post
title: Analyze productive hours from git punches
slug: analyze-productive-hours-from-git-punches
draft: false
date: '2019-05-18T12:00:00.000Z'
category: Data Science
description: >-
  Git logs can tell our history, when and what we were working on. So let's use that to analyze our productivity.
tags:
  - Data Visualization
  - Developer Tools
---

> Git logs can tell our history, when and what we were working on. So let's use that to analyze our productivity.

github provides a simple api from which we can get the info about our contributions made in a github repository.  
just hit this url to get the JSON data  
`https://api.github.com/repos/{username}/{repo-name}/stats/punch_card`

Now to make sense of this data, let's create a visualization.
Since this data is all about 'day of week', 'hour of day' and 'number of contributions'.
A simple 2d plot something like heat-map should be good.
I made it using D3.js

![Git punches](/media/git-punches.png 'Git punches')

From this visualization, we can get insights like Fri, Sat are more productive days rather than Mon, Tue, Wed.  
Also, there are significant contributions in evenings or late night.
This makes complete sense since this data is of a side project. I tend to focus on it during evenings or weekend while keeping the focus on primary project during working hours.

Here's the codepen.
You can also check such insights of anyone's work by just putting in github username and repository name in this codepen.

<div>
  <iframe height="400" style="width: 100%;" scrolling="no" title="git-punches" src="//codepen.io/heyayush/embed/qGjogp/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href='https://codepen.io/heyayush/pen/qGjogp/'>git-punches</a> by Ayush Sharma
    (<a href='https://codepen.io/heyayush'>@heyayush</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
</div>

Let me know your feedback in comments.

\- Ayush 🙂
