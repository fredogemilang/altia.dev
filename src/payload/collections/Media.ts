import type { CollectionConfig } from 'payload';
import path from 'path';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Studio Content',
    description: 'Upload and manage project screenshots, blog cover images, and studio assets.',
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/uploads'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 1200,
        height: 800,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional image description for accessibility and SEO',
      },
    },
  ],
};
