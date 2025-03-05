import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Block, Field } from 'payload'

export const timeLineItem: Field[] = [
  {
    type: 'text',
    name: 'roleName',
    required: true,
    localized: true
  },
  {
    type: 'text',
    name: 'companyName',
    required: true,
  },
  {
    type: 'text',
    name: 'companyLink',
    required: true,
  },
  {
    type: 'date',
    name: 'startDate',
    required: true,
  },
  {
    type: 'date',
    name: 'endDate',
  },
  {
    type: 'richText',
    name: 'description',
    localized: true,
    editor: lexicalEditor({
      features: ({}) => {
        return [
          BoldFeature(),
          ItalicFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
]

export const TimeLine: Block = {
  slug: 'timeLine',
  interfaceName: 'TimeLine',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Section title',
      localized: true,
    },
    {
      type: 'array',
      name: 'timeLineItems',
      label: 'Time line entry',
      fields: timeLineItem,
    },
  ],
}
