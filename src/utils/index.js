export const pageTypes = [
  'forum',
  'updates',
  'jobs',
  'login',
  'register',
  'user',
];

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const filterItems = (items, search, tag) => {
  return items
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(thread => thread.tags.includes(tag) || tag === 'All');
};

export const checkIfNew = date => {
  const newMark = Math.round(new Date() / 1000) - 3600;
  return date.seconds >= newMark;
};

export const autoExpand = elm => {
  const textarea = elm.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

export const tags = [
  {
    name: 'All',
    isActive: true,
  },
  {
    name: 'Animation',
    isActive: false,
  },
  {
    name: 'Art Direction',
    isActive: false,
  },
  {
    name: 'Branding',
    isActive: false,
  },
  {
    name: 'Graphic Design',
    isActive: false,
  },
  {
    name: 'Iconography',
    isActive: false,
  },
  {
    name: 'Illustration',
    isActive: false,
  },
  {
    name: 'Mobility',
    isActive: false,
  },
  {
    name: 'Marvel',
    isActive: false,
  },
  {
    name: 'Prototyping',
    isActive: false,
  },
  {
    name: 'Project Management',
    isActive: false,
  },
  {
    name: 'User Research',
    isActive: false,
  },
  {
    name: 'UI Design',
    isActive: false,
  },
  {
    name: 'UX Design',
    isActive: false,
  },
  {
    name: 'Video Editing',
    isActive: false,
  },
];
