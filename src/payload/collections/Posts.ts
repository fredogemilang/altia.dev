import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
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
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'ALTIA DEV Engineering',
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Engineering',
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '5 min read',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Article Cover Image (Upload from Computer)',
      admin: {
        description: 'Upload gambar sampul artikel (.png, .jpg, .webp) langsung dari komputer/laptop Anda.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Or Static Image URL (Optional)',
      admin: {
        description: 'Opsional: Path atau URL gambar jika tidak mengupload file.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};
