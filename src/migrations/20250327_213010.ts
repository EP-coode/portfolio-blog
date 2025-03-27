import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_post_blocks_code_language" AS ENUM('typescript', 'javascript', 'go', 'html', 'css', 'SCSS');
  CREATE TABLE IF NOT EXISTS "post_tag" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag_color" varchar DEFAULT '#ffffff' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "post_tag_locales" (
  	"tag_label" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_blocks_content_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_blog_post_blocks_code_language" DEFAULT 'typescript',
  	"file_path" varchar,
  	"code" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_locales" (
  	"title" varchar NOT NULL,
  	"short_description" jsonb NOT NULL,
  	"hero_caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_post_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"post_tag_id" integer
  );
  
  ALTER TABLE "media" ADD COLUMN "sizes_blur_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_blur_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_blur_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_blur_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_blur_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_blur_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "post_tag_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_post_id" integer;
  DO $$ BEGIN
   ALTER TABLE "post_tag_locales" ADD CONSTRAINT "post_tag_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_content" ADD CONSTRAINT "blog_post_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_content_locales" ADD CONSTRAINT "blog_post_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_code" ADD CONSTRAINT "blog_post_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_media_block" ADD CONSTRAINT "blog_post_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_media_block" ADD CONSTRAINT "blog_post_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_blocks_media_block_locales" ADD CONSTRAINT "blog_post_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_locales" ADD CONSTRAINT "blog_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_rels" ADD CONSTRAINT "blog_post_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_post_rels" ADD CONSTRAINT "blog_post_rels_post_tag_fk" FOREIGN KEY ("post_tag_id") REFERENCES "public"."post_tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "post_tag_updated_at_idx" ON "post_tag" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "post_tag_created_at_idx" ON "post_tag" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "post_tag_locales_locale_parent_id_unique" ON "post_tag_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_content_order_idx" ON "blog_post_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_content_parent_id_idx" ON "blog_post_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_content_path_idx" ON "blog_post_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_post_blocks_content_locales_locale_parent_id_unique" ON "blog_post_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_code_order_idx" ON "blog_post_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_code_parent_id_idx" ON "blog_post_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_code_path_idx" ON "blog_post_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_media_block_order_idx" ON "blog_post_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_media_block_parent_id_idx" ON "blog_post_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_media_block_path_idx" ON "blog_post_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_post_blocks_media_block_media_idx" ON "blog_post_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_post_blocks_media_block_locales_locale_parent_id_unique" ON "blog_post_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_post_slug_idx" ON "blog_post" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_post_hero_image_idx" ON "blog_post" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "blog_post_updated_at_idx" ON "blog_post" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_post_created_at_idx" ON "blog_post" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_post_locales_locale_parent_id_unique" ON "blog_post_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_rels_order_idx" ON "blog_post_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_post_rels_parent_idx" ON "blog_post_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_post_rels_path_idx" ON "blog_post_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_post_rels_post_tag_id_idx" ON "blog_post_rels" USING btree ("post_tag_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_post_tag_fk" FOREIGN KEY ("post_tag_id") REFERENCES "public"."post_tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_post_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_sizes_blur_sizes_blur_filename_idx" ON "media" USING btree ("sizes_blur_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_post_tag_id_idx" ON "payload_locked_documents_rels" USING btree ("post_tag_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_post_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_post_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "post_tag" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_tag_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_blocks_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_blocks_media_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_post_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "post_tag" CASCADE;
  DROP TABLE "post_tag_locales" CASCADE;
  DROP TABLE "blog_post_blocks_content" CASCADE;
  DROP TABLE "blog_post_blocks_content_locales" CASCADE;
  DROP TABLE "blog_post_blocks_code" CASCADE;
  DROP TABLE "blog_post_blocks_media_block" CASCADE;
  DROP TABLE "blog_post_blocks_media_block_locales" CASCADE;
  DROP TABLE "blog_post" CASCADE;
  DROP TABLE "blog_post_locales" CASCADE;
  DROP TABLE "blog_post_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_post_tag_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_post_fk";
  
  DROP INDEX IF EXISTS "media_sizes_blur_sizes_blur_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_medium_sizes_medium_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_large_sizes_large_filename_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_post_tag_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blog_post_id_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_blur_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "post_tag_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blog_post_id";
  DROP TYPE "public"."enum_blog_post_blocks_code_language";`)
}
