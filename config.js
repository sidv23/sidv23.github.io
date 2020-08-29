'use strict';

const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`
});

module.exports = {
  url: 'https://heyayush.com/',
  title: 'Ayush Sharma | Web developer freelancer',
  subtitle: `Portfolio and Personal blog of Ayush Sharma | Web developer,
    front-end specialist, freelancer, web consultant, travel blogger`,
  categoryMeta: 'articles written by the author Ayush Sharma',
  copyright: '© All rights reserved.',
  disqusShortname: 'heyayush',
  postsPerPage: 6,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS,
  menu: [
    {
      label: 'Articles by category',
      path: '/categories'
    },
    {
      label: 'Front-end/',
      path: '/category/front-end'
    },
    {
      label: 'Travel/',
      path: '/category/travel'
    },
    {
      label: 'About me',
      path: '/about'
    },
    {
      label: 'Contact me',
      path: '/contact'
    }
  ],
  author: {
    name: 'Ayush Sharma',
    photo: '/photo.jpg',
    bio: 'Professional Web Developer, Blogger, Traveler, Gamer, Batman and Linkin Park fan',
    contacts: {
      email: 'hey.ayush.sharma@gmail.com',
      twitter: 'heyayush',
      github: 'heyayush',
      rss: '/rss.xml',
      linkedin: 'hey-ayush',
      instagram: 'hey.ayush.sharma',
      facebook: 'ayush.sharma.5015',
      codepen: 'heyayush',
      stackoverflow: '4337809/ayush-sharma'
    }
  },
  api: {
    emailSub: 'https://w11znw8r96.execute-api.ap-south-1.amazonaws.com/prod/hey-ayush'
  }
};
