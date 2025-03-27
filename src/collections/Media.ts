import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        width: 100,
        crop: 'center',
        name: 'blur',
        formatOptions: {
          format: 'avif',
          options: {
            quality: 50,
          },
        },
      },
      {
        width: 900,
        crop: 'center',
        name: 'medium',
        formatOptions: {
          format: 'avif',
        },
      },
      {
        width: 1200,
        crop: 'center',
        name: 'large',
        formatOptions: {
          format: 'avif',
        },
      },
    ],
  },
}
