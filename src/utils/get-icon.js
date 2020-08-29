import { ICONS } from '../constants';

const getIcon = name => {
  let icon;

  switch (name) {
    case 'twitter':
      icon = ICONS.TWITTER;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'email':
      icon = ICONS.EMAIL;
      break;
    case 'rss':
      icon = ICONS.RSS;
      break;
    case 'linkedin':
      icon = ICONS.LINKEDIN;
      break;
    case 'facebook':
      icon = ICONS.FACEBOOK;
      break;
    case 'instagram':
      icon = ICONS.INSTAGRAM;
      break;
    case 'codepen':
      icon = ICONS.CODEPEN;
      break;
    case 'stackoverflow':
      icon = ICONS.STACKOVERFLOW;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
