import { CollectionConfig } from 'payload'

export const PostTag: CollectionConfig = {
    slug: 'post-tag',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'tagLabel',
    },
    fields: [
        {
            name: 'tagLabel',
            type: 'text',
            required: true,
            localized: true,
            defaultValue: '',
        },
        // TODO: make custom color picker
        {
            name: 'tagColor',
            type: 'text',
            required: true,
            defaultValue: '#ffffff',
        },
    ],
}
