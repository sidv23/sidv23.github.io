---
template: post
title: 'CI for sanity tests using CircleCI'
slug: build-sanity-test-using-circle-ci
draft: false
date: '2019-04-26T12:00:00.000Z'
description: >-
  Isn't it nice to automate running of basic sanity tests like checking linting and unit tests before proceeding with merging of a pull request or deploying a new build?It's easy to setup such a CI pipeline for your git repo. Let's see how...
category: DevOps
tags:
  - CI-CD
---

Isn't it good to see some green checks before merging a pull request and proceeding with deployment of new build.  
This also enforces developers to make sure they comply with good practices like checking lint errors and verifying unit tests are passing.

I was looking to quickly get started so I compared CircleCI and TravisCI.  
Both of these are awesome tools.  
CircleCI fits my use case as I have a small project and I want to quickly get started with the free plan.  
TravisCI looks good when we need to run on Linux and Mac OS X at same time and require support of various programming languages. It's free for open source projects.

### Quick summary of steps to follow
1. SignUp/Login to your CircleCI account.
2. Add new project and link it with your git repo (github integration was smooth).
3. Add a `.circleci` folder in your project and place a `config.yml` file in it.
4. Configure the jobs you want to run in this `config.yml` file (scroll down for a sample config).
5. You may enable github's protected branches feature to enable/disable merging based upon the result of executed jobs. `config.yml` needs to have `workflows:` in it for this feature to work.
6. That's all!. You have successfully added ✔️ or ❌ in front of every commit.
7. Now add a nice build status badge in your README.md by going to your circleci project setting and get the embed code for markdown from status badge option under notifications.

Here's a sample `config.yml` configuration. This simply performs sanity check by installing all npm packages and then running lint and unit tests. It uses cache to speed up the run and runs both the lint and test steps in parallel for faster execution.

```yaml
version: 2

defaults: &defaults
  docker:
    - image: circleci/node:10.15.3
  working_directory: ~/repo

jobs:
  install:
    <<: *defaults
    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
            # Find a cache corresponding to this specific package-lock.json checksum
            # when this file is changed, this key will fail
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

      - run: # install npm packages
          name: Install npm dependencies
          command: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

  lint:
    <<: *defaults
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            - v1-dependencies-
      - run: # run lint
          name: Check Linting
          command: yarn lint

  test:
    <<: *defaults
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            - v1-dependencies-

      - run: # run tests
          name: Verify Tests
          command: yarn test

workflows:
    version: 2
    sanity_test:
      jobs:
        - install
        - lint:
            requires:
              - install
        - test:
            requires:
              - install
```

\- Ayush 🙂
