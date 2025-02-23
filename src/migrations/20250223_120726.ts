import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_about_me_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_me_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_me_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_content_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tech_icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items_locales" (
  	"display_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_tech_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_tech_list_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_time_line_time_line_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"company_link" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_time_line_time_line_items_locales" (
  	"role_name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_blocks_time_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "about_me" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_keywords" varchar,
  	"_status" "enum_about_me_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "about_me_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_content_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tech_icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items_locales" (
  	"display_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_tech_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_tech_list_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_time_line_time_line_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"company_link" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_time_line_time_line_items_locales" (
  	"role_name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_time_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_keywords" varchar,
  	"version__status" "enum__about_me_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_me_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_content" ADD CONSTRAINT "about_me_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_content_locales" ADD CONSTRAINT "about_me_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_tech_list_tech_list_items" ADD CONSTRAINT "about_me_blocks_tech_list_tech_list_items_tech_icon_id_media_id_fk" FOREIGN KEY ("tech_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_tech_list_tech_list_items" ADD CONSTRAINT "about_me_blocks_tech_list_tech_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_tech_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_tech_list_tech_list_items_locales" ADD CONSTRAINT "about_me_blocks_tech_list_tech_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_tech_list_tech_list_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_tech_list" ADD CONSTRAINT "about_me_blocks_tech_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_tech_list_locales" ADD CONSTRAINT "about_me_blocks_tech_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_tech_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_time_line_time_line_items" ADD CONSTRAINT "about_me_blocks_time_line_time_line_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_time_line"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_time_line_time_line_items_locales" ADD CONSTRAINT "about_me_blocks_time_line_time_line_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_time_line_time_line_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_time_line" ADD CONSTRAINT "about_me_blocks_time_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_me_locales" ADD CONSTRAINT "about_me_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_content" ADD CONSTRAINT "_about_me_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_content_locales" ADD CONSTRAINT "_about_me_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_tech_list_tech_list_items" ADD CONSTRAINT "_about_me_v_blocks_tech_list_tech_list_items_tech_icon_id_media_id_fk" FOREIGN KEY ("tech_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_tech_list_tech_list_items" ADD CONSTRAINT "_about_me_v_blocks_tech_list_tech_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_tech_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_tech_list_tech_list_items_locales" ADD CONSTRAINT "_about_me_v_blocks_tech_list_tech_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_tech_list_tech_list_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_tech_list" ADD CONSTRAINT "_about_me_v_blocks_tech_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_tech_list_locales" ADD CONSTRAINT "_about_me_v_blocks_tech_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_tech_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_time_line_time_line_items" ADD CONSTRAINT "_about_me_v_blocks_time_line_time_line_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_time_line"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_time_line_time_line_items_locales" ADD CONSTRAINT "_about_me_v_blocks_time_line_time_line_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_time_line_time_line_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_time_line" ADD CONSTRAINT "_about_me_v_blocks_time_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_locales" ADD CONSTRAINT "_about_me_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_content_order_idx" ON "about_me_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_content_parent_id_idx" ON "about_me_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_content_path_idx" ON "about_me_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_blocks_content_locales_locale_parent_id_unique" ON "about_me_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items_order_idx" ON "about_me_blocks_tech_list_tech_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items_parent_id_idx" ON "about_me_blocks_tech_list_tech_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items_tech_icon_idx" ON "about_me_blocks_tech_list_tech_list_items" USING btree ("tech_icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_blocks_tech_list_tech_list_items_locales_locale_parent_id_unique" ON "about_me_blocks_tech_list_tech_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_order_idx" ON "about_me_blocks_tech_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_parent_id_idx" ON "about_me_blocks_tech_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_tech_list_path_idx" ON "about_me_blocks_tech_list" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_blocks_tech_list_locales_locale_parent_id_unique" ON "about_me_blocks_tech_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_time_line_time_line_items_order_idx" ON "about_me_blocks_time_line_time_line_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_time_line_time_line_items_parent_id_idx" ON "about_me_blocks_time_line_time_line_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_blocks_time_line_time_line_items_locales_locale_parent_id_unique" ON "about_me_blocks_time_line_time_line_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_time_line_order_idx" ON "about_me_blocks_time_line" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_time_line_parent_id_idx" ON "about_me_blocks_time_line" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_me_blocks_time_line_path_idx" ON "about_me_blocks_time_line" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "about_me__status_idx" ON "about_me" USING btree ("_status");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_locales_locale_parent_id_unique" ON "about_me_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_content_order_idx" ON "_about_me_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_content_parent_id_idx" ON "_about_me_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_content_path_idx" ON "_about_me_v_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_blocks_content_locales_locale_parent_id_unique" ON "_about_me_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items_order_idx" ON "_about_me_v_blocks_tech_list_tech_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items_parent_id_idx" ON "_about_me_v_blocks_tech_list_tech_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items_tech_icon_idx" ON "_about_me_v_blocks_tech_list_tech_list_items" USING btree ("tech_icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_tech_list_items_locales_locale_parent_id_unique" ON "_about_me_v_blocks_tech_list_tech_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_order_idx" ON "_about_me_v_blocks_tech_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_parent_id_idx" ON "_about_me_v_blocks_tech_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_path_idx" ON "_about_me_v_blocks_tech_list" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_blocks_tech_list_locales_locale_parent_id_unique" ON "_about_me_v_blocks_tech_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_time_line_items_order_idx" ON "_about_me_v_blocks_time_line_time_line_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_time_line_items_parent_id_idx" ON "_about_me_v_blocks_time_line_time_line_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_time_line_items_locales_locale_parent_id_unique" ON "_about_me_v_blocks_time_line_time_line_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_order_idx" ON "_about_me_v_blocks_time_line" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_parent_id_idx" ON "_about_me_v_blocks_time_line" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_path_idx" ON "_about_me_v_blocks_time_line" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_about_me_v_version_version__status_idx" ON "_about_me_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_about_me_v_created_at_idx" ON "_about_me_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_about_me_v_updated_at_idx" ON "_about_me_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_about_me_v_snapshot_idx" ON "_about_me_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_about_me_v_published_locale_idx" ON "_about_me_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_about_me_v_latest_idx" ON "_about_me_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_locales_locale_parent_id_unique" ON "_about_me_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "about_me_blocks_content" CASCADE;
  DROP TABLE "about_me_blocks_content_locales" CASCADE;
  DROP TABLE "about_me_blocks_tech_list_tech_list_items" CASCADE;
  DROP TABLE "about_me_blocks_tech_list_tech_list_items_locales" CASCADE;
  DROP TABLE "about_me_blocks_tech_list" CASCADE;
  DROP TABLE "about_me_blocks_tech_list_locales" CASCADE;
  DROP TABLE "about_me_blocks_time_line_time_line_items" CASCADE;
  DROP TABLE "about_me_blocks_time_line_time_line_items_locales" CASCADE;
  DROP TABLE "about_me_blocks_time_line" CASCADE;
  DROP TABLE "about_me" CASCADE;
  DROP TABLE "about_me_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_content" CASCADE;
  DROP TABLE "_about_me_v_blocks_content_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_tech_list_tech_list_items" CASCADE;
  DROP TABLE "_about_me_v_blocks_tech_list_tech_list_items_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_tech_list" CASCADE;
  DROP TABLE "_about_me_v_blocks_tech_list_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_time_line_time_line_items" CASCADE;
  DROP TABLE "_about_me_v_blocks_time_line_time_line_items_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_time_line" CASCADE;
  DROP TABLE "_about_me_v" CASCADE;
  DROP TABLE "_about_me_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_about_me_status";
  DROP TYPE "public"."enum__about_me_v_version_status";
  DROP TYPE "public"."enum__about_me_v_published_locale";`)
}
