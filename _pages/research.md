---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
redirect_from:
  - /research
---


Through my education and experience, I have developed a keen interest for topics in statistical theory that draws inspiration from the geometric and spatial foundations of mathematics. A few of my interests include:

The generalzsation of optimization in Euclidean space to methods in Hilbert spaces using RKHS. These include, but are not limited to, kernel embeddings of distributions and kernel machine learning - equipping us with a propitious tool for solving a wide range of problems in supervised and unsupervised, large-scale machine learning. Additionally, I'm interested in the associated research using Fast-Fourier transforms and random matrix theory to make computational advances.

Additionally, I have become interested in the research surrounding security and privacy. The advent of information and computational technology has given us a wealth of information in the world today. Owing to this, there is an imminent need and importance for privacy. $$\epsilon$$-differential privacy and other statistical and mathematical methods of examining risk in sensitive databases are particularly of interest. It also includes using locally-linear embeddings for ensuring privacy in deep learning networks; and, examining Renyi divergence metrics in differential privacy.

As a quantitative analyst at Goldman Sachs, my work revolved around the axes of stochastic calculus, nonparametric statistics, data-mining and financial derivatives; where I used feature engineering techniques to efficiently infer latent behaviour of financial products to market risk exposure.

{% if site.talkmap_link == true %}

<p style="text-decoration:underline;"><a href="/talkmap.html">See a map of all the places I've given a talk!</a></p>

{% endif %}

{% for post in site.talks reversed %}
  {% include archive-single-talk.html %}
{% endfor %}
