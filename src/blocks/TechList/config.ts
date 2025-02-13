import { Block, Field } from 'payload'

export const techListItem: Field[] = [
  {
    type: 'text',
    name: 'displayName',
  },
  {
    type: 'upload',
    name: 'techIcon',
    relationTo: 'media',
    filterOptions: {
      mimeType: {
        contains: 'image',
      },
    },
  },
]

export const TechList: Block = {
  slug: 'techList',
  interfaceName: 'TechListBlock',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Section title'
    },
    {
      type: 'array',
      name: 'techListItems',
      label: 'Technology list',
      fields: techListItem,
    },
  ],
}
