import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

import { Users } from './payload/collections/Users';
import { Media } from './payload/collections/Media';
import { Projects } from './payload/collections/Projects';
import { Posts } from './payload/collections/Posts';
import { Testimonials } from './payload/collections/Testimonials';
import { Leads } from './payload/collections/Leads';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const adminRoute = process.env.PAYLOAD_ADMIN_ROUTE || '/ctrlaltia';

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— ALTIA DEV Control Studio',
    },
  },
  routes: {
    admin: adminRoute,
    api: '/api/payload',
  },
  collections: [Projects, Posts, Testimonials, Leads, Media, Users],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'altia_dev_payload_secret_2026_super_secure_key_12893',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
});
