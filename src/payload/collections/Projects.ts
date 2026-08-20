import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'client', 'featured', 'order'],
    group: 'Studio Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'web',
      options: [
        { label: 'Web Development', value: 'web' },
        { label: 'Mobile & Desktop App', value: 'app' },
        { label: 'AI Automation', value: 'ai' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      defaultValue: '2026',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'challenge',
      type: 'textarea',
    },
    {
      name: 'solution',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover / Featured Image (Upload from Computer)',
      admin: {
        description: 'Upload file gambar proyek (.png, .jpg, .webp) langsung dari perangkat Anda.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Or External / Static Image URL (Optional)',
      admin: {
        description: 'Opsional: URL gambar eksternal jika tidak ingin mengupload berkas langsung.',
      },
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
  ],
};
