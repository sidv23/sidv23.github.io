---
template: post
title: Google sheets as realtime database or CMS
slug: google-sheets-as-real-time-database
draft: false
date: '2019-02-13T12:00:00.000Z'
description: >-
  Spreadsheets have served as databases in the past and are quiet convenient to use for simple cases when there isn't much complexity involved.
  Google sheets is a powerful tool as it integrates easily with various services. Let's try using it as a CMS...
category: DevOps
tags:
  - Proof of Concept
  - Developer Tools
  - CMS
---

This was just a small POC showcasing the integration of different tools.

1. Google sheet is used as a source of data.
2. Google cloud platform is used to access google sheets data.
3. Netlify is used to deploy front-end.
4. Zapier is used to automate deployments whenever google sheet is updated.

Here's the google sheet which has simple table of data
![Google Sheet's screentshot](/media/google-sheets-as-database-1.png) 

And the front-end looks like [this](https://heyayush.github.io/cafe-menu-card/) ![Cafe's Menu Card](/media/google-sheets-as-database-2.png)

This removes the need of CMS and admin interfaces for tiny apps.  
Admin can simply update data in his google sheet and it will trigger a new deployment of front-end app.  
After the deployment the new data will reflect on refreshing the web page.

Here is the step by step procedure:
1. Create a new project in GCP.
2. Enable google sheets api.
3. Add a service account to this project.
4. Create credentials and get the private keys json.
5. Share the sheet with the service account created in step 3 and grant edit access.
6. Use any npm module which converts google-sheets to json format.
7. I have used [gatsby-source-google-sheets](https://www.npmjs.com/package/gatsby-source-google-sheets).
8. Set config using private keys from step 4 to allow accessing data from that sheet.
9. Create UI layout and put the fetched data at required places.

Source code is available [here](https://github.com/heyayush/cafe-menu-card).

Have fun!

\- Ayush 🙂