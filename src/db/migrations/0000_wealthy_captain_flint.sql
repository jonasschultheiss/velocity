CREATE TABLE IF NOT EXISTS "swimmers" (
	"id" serial PRIMARY KEY NOT NULL,
	"surname" varchar(256) NOT NULL,
	"lastname" varchar(256) NOT NULL,
	"club" varchar(256),
	"weight" smallint,
	"height" smallint,
	"birthdate" timestamp (6),
	"bio" varchar(1024),
	"instagram" varchar(256),
	"tiktok" varchar(256),
	"youtube" varchar(256),
	"twitter" varchar(256)
);
