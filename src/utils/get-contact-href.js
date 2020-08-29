const getContactHref = (name, contact) => {
  let href;

  switch (name) {
    case 'twitter':
      href = `https://www.twitter.com/${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
      break;
    case 'email':
      href = `mailto:${contact}`;
      break;
    case 'linkedin':
      href = `https://www.linkedin.com/in/${contact}`;
      break;
    case 'facebook':
      href = `https://www.facebook.com/${contact}`;
      break;
    case 'instagram':
      href = `https://www.instagram.com/${contact}`;
      break;
    case 'codepen':
      href = `https://www.codepen.io/${contact}`;
      break;
    case 'stackoverflow':
      href = `https://stackoverflow.com/users/${contact}?tab=profile`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
