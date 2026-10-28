export const SITE = {
  name: 'K-PAN Ministries',
  url: 'https://kpan-ministries.netlify.app',
  locale: 'en_NG',
  title: 'K-PAN Ministries | The Fullness Church, Benin City',
  description:
    'KPAN Ministries, The Fullness Church in Benin City, Nigeria. Join our weekly meetings at UNIBEN or worship with us online from anywhere.',
  image: '/og/home.jpg',
  imageAlt: 'K-PAN Ministries, The Fullness Church',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'K-PAN Ministries',
    alternateName: ['KPAN Ministries', 'The Fullness Church', 'Kingdom Priesthood and Apostolic Network'],
    logo: '/Main Kpan.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.1 Ivy Lodge, Ekhator Street, Ugbowo',
      addressLocality: 'Benin City',
      addressRegion: 'Edo',
      addressCountry: 'NG',
    },
    sameAs: ['https://youtube.com/@apstjoshuaokorie_kpan', 'https://t.me/kpanministries'],
  },
}

export const pages = [
  { path: '/', title: SITE.title, description: SITE.description },
  {
    path: '/about',
    title: 'About | K-PAN Ministries',
    description:
      'Learn about K-PAN Ministries, the Kingdom Priesthood and Apostolic Network, and our family at The Fullness Church.',
  },
  {
    path: '/about/who-we-are',
    title: 'Who We Are | K-PAN Ministries',
    description:
      'Who we are at K-PAN Ministries: a family of believers in Benin City, touched, transformed and empowered to shape lives, territories and nations.',
    image: '/og/who-we-are.jpg',
    imageAlt: 'The Fullness Church family gathered together',
  },
  {
    path: '/about/leadership',
    title: 'Leadership | K-PAN Ministries',
    description:
      'Meet the shepherds and servants of K-PAN Ministries, and find a department to serve in through our workforce.',
    image: '/og/leadership.jpg',
    imageAlt: 'The leadership of K-PAN Ministries',
  },
  {
    path: '/give',
    title: 'Financial Partnership | K-PAN Ministries',
    description:
      'Give your tithes, offerings, partnerships and seeds to K-PAN Ministries, with bank details for Naira, USD, EUR and GBP accounts.',
    image: '/og/give.jpg',
    imageAlt: 'Give to K-PAN Ministries',
  },
  {
    path: '/media',
    title: 'Media | K-PAN Ministries',
    description:
      'Watch live, catch up on teachings and download messages from K-PAN Ministries, with every stream link in one place.',
  },
  {
    path: '/events',
    title: 'Events | K-PAN Ministries',
    description: 'See upcoming events and gatherings at K-PAN Ministries, The Fullness Church, Benin City.',
  },
  {
    path: '/online-church',
    title: 'Online Church | K-PAN Ministries',
    description:
      'Worship with K-PAN Ministries online: Daily Sight, School of the Kingdom, Activating Encounters and Intercessory Prayers, live from anywhere.',
  },
  {
    path: '/location',
    title: 'Location | K-PAN Ministries',
    description:
      'Find K-PAN Ministries at the NAAT Multi-Purpose Hall, behind June 12 FACOOP Supermarket, UNIBEN, Benin City, Nigeria.',
  },
  {
    path: '/contact',
    title: 'Contact Us | K-PAN Ministries',
    description: 'Get in touch with K-PAN Ministries, The Fullness Church, in Benin City. We would love to hear from you.',
  },
]