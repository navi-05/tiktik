import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'szyflaja',
  dataset: 'production',
  apiVersion: '2023-01-25',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
