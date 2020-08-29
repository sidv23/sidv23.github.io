---
template: post
title: Basic data analytics on IMDB movie ratings
slug: data-analytics-on-imdb-movie-ratings
draft: false
date: '2018-11-04T12:00:00.000Z'
description: >-
  It always interesting to make sense from some raw data. Let's scrap some data from IMDB and then create visualizations from it, which will help us derive some insights about those movies...
category: Data Science
tags:
  - Data Visualization
  - Data Scraping
  - D3
---

> This is a short story how I ended up using web-scraping, data-visualization and automation to derive conclusions from IMDB ratings.

*It all started during a debate on super heroes as Justice League movie was about to release and I want to prove my point against my friend that it's IMDB rating is overrated and will gradually lower after release.*

### Problem 1: I had to collect data to be used as proof.
One cannot keep on opening IMDB website daily and take screenshots for the whole month and then see the change.

**Solution:** let's write a script which opens that website, read the data and saves it in a structured json which can be read easily.

**Tools used:** [Puppeteer](https://github.com/GoogleChrome/puppeteer "Puppeteer") it's a nice node library from Chrome team. Opening an headless instance of chrome, navigating to IMDB website and reading the contents from the DOM nodes was soon accomplished.  
Here's the [gist](https://gist.github.com/heyayush/7356cb1df9001f2438f406dbde549400 "gist").
At this stage we are done with extraction and processing of data, time to move on to the next stage.

### Problem 2: Need to provide some UI to this data so that it can be read easily.
**Solution:** Brainstorm on what kind of chart will provide perfect insights, could be easily read and how to bind our data to those charts.

**Tools used:** [D3](https://d3js.org/ "D3"), [React](https://reactjs.org/ "React")
D3 is a powerful js library to play with different charts and provides full control over every point getting rendered on that chart.  
React is super cool UI library to quickly get started on a small, medium apps broken down into tiny, independent, reusable components.

Here's the final UI created from the processed data along with the insights derived from those charts. [https://heyayush.github.io/imdbD3UI/](https://heyayush.github.io/imdbD3UI/ "https://heyayush.github.io/imdbD3UI/")

This helped in easily understanding how the movie is performing wiith time, among different age groups of audience and compared between male and female gender.

**Next steps:**
I am looking to move this script to cloud and automate it to run daily.  
Google cloud functions provide node 8 runtime and built in support to run chrome in headless mode and integration with firebase. While in AWS lamda, the configuration was a bit complex.  
I will appreciate any guidance on this.

Thanks for reading all along!!!  
Your feedback, comments are most welcome.

\- Ayush 🙂