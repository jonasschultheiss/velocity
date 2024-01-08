ALTER TABLE "swimmers" DROP COLUMN IF EXISTS "id";
ALTER TABLE "swimmers" ADD CONSTRAINT "identifier" PRIMARY KEY("surname","lastname");--> statement-breakpoint