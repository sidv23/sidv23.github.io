---
template: post
title: Front-end Code Review Guidelines
slug: front-end-code-review-guidelines
draft: false
date: '2019-08-28T12:00:00.000Z'
description: >-
  Code Review is an extremely important step in developing quality applications. Here's the checklist of things to keep in mind while doing self code review and peer reviews of front-end code.
category: Front-end
tags:
  - Angular
  - React
  - Javascript
---

Code Review is an extremely important step in developing quality applications. Here's the checklist of things to keep in mind while doing self code review and peer reviews of front-end code.

Curently few points are Angular specific so going forward I will update this blog by splitting it into 3 sections-
1. Common front-end checklist
2. Angular specific
3. React specifics

In  the meantime here's the list of good practices.

1. Does the folder structure, file, functions and variables names makes sense.
2. Use of small pure functions and small isolated reusable components.
3. SOLID design principles.
4. Follow declarative programming paradigm.
5. Data communication should be only from parent to child and not vice-versa.
6. Utilize typescript's static type checking.
7. Go for named import of only the required functions rather than complete module.
8. Make sure all static labels only goes into corresponding lang.json files.
9. Avoid deep nested code.
10. Avoid using unnecessary event handlers.
11. Don't forget to clear timeout or unsubscribe from subscription.
12. Clean up the resources on component's destroy.
13. Easy to read import paths using aliases.
14. No DOM manipulations from services.
15. Proper separations of smart and dumb components.
16. Business logic should only reside in services.
17. Compulsory error handling.
18. Exception handling.
19. Unclear code should be documented.
20. Can something from view logic be extracted in a pipe.
21. Can something from service logic be extracted in a lib/util function.
22. Avoid unnecessary addition of third party libraries.
23. Avoid dead code, unnecessary comments or console logs.
24. Follow basic accessibility guidelines.

Feel free to add your suggestions and feedback in the comments below.

\- Ayush 🙂