import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "about_me_blocks_time_line_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_about_me_v_blocks_time_line_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "about_me_blocks_time_line_locales" ADD CONSTRAINT "about_me_blocks_time_line_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_me_blocks_time_line"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_me_v_blocks_time_line_locales" ADD CONSTRAINT "_about_me_v_blocks_time_line_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_me_v_blocks_time_line"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "about_me_blocks_time_line_locales_locale_parent_id_unique" ON "about_me_blocks_time_line_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_about_me_v_blocks_time_line_locales_locale_parent_id_unique" ON "_about_me_v_blocks_time_line_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "about_me_blocks_time_line" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_about_me_v_blocks_time_line" DROP COLUMN IF EXISTS "title";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "about_me_blocks_time_line_locales" CASCADE;
  DROP TABLE "_about_me_v_blocks_time_line_locales" CASCADE;
  ALTER TABLE "about_me_blocks_time_line" ADD COLUMN "title" varchar;
  ALTER TABLE "_about_me_v_blocks_time_line" ADD COLUMN "title" varchar;`)
}