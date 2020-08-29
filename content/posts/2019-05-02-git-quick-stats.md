---
template: post
title: Insights of git repository using git-quick-stats
slug: git-quick-stats
draft: false
date: '2019-05-02T12:00:00.000Z'
description: >-
  It's interesting to get insights from our git repository like contributions stats, commits per author, commits per month/week/date, code reviewers. There is an interesting tool called git-quick-stats to help generating these insights.
category: Dev Tools
tags:
  - Git
  - Developer Tools
---

It's interesting to get insights from our git repository like contributions stats, commits per author, commits per month/week/date, code reviewers.  
There is an interesting tool called [git-quick-stats](https://github.com/arzzen/git-quick-stats) to help generating these insights.

It's straightforward to install on linux, mac by following [these steps.](https://github.com/arzzen/git-quick-stats#installation)
However, on windows it's bit tricky, hence follow these steps-
1. Download git-quick-stats file (either clone [this](https://github.com/arzzen/git-quick-stats.git) repo or just that single file).
2. Put this file in some path which is added in path environment variable.
3. Open global .gitconfig file and add this alias
4. ```ini
   [alias]
     quick-stats = ! c:/cli-tools/git-quick-stats
   ```
   ofcourse adjust the path above to the one you have.
5. Or you can perform step 3 and 4 using command  
   `git config --global alias.quick-stats '! c:/cli-tools/git-quick-stats`
6. cd into the git repo for which you want to see the insights and run `git quick-stats`

That's all! play with the options and generate the required stats.

![Available git-quick-stats](https://user-images.githubusercontent.com/6382002/52440487-86acde00-2b1e-11e9-9bb4-ca42ce2d0fc0.png)

\- Ayush 🙂