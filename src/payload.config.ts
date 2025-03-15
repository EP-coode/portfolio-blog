// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PostTag } from '@/collections/PostTag'
import { BlogPost } from '@/collections/BlogPost'

import { s3Storage } from '@payloadcms/storage-s3'
import { AboutMe } from './globals/AboutMe'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { en } from '@payloadcms/translations/languages/en'
import { pl } from '@payloadcms/translations/languages/pl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: 'http://localhost:3000',
      globals: ['aboutMe'],
    },
  },
  collections: [Users, Media, PostTag, BlogPost],
  globals: [AboutMe],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, pl },
  },
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'pl',
        label: 'Polski',
      },
    ],
  },
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      generateTitle: ({ doc }) => `${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        region: process.env.S3_REGION ?? '',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_KEY_NAME ?? '',
          secretAccessKey: process.env.S3_KEY_SECRET ?? '',
        },
      },
    }),
  ],
})
