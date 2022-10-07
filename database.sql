CREATE TABLE "toDo" (
	"id" SERIAL PRIMARY KEY,
	"taskName" VARCHAR NOT NULL,
	"task" VARCHAR NOT NULL,
	"taskDone" BOOLEAN
);

INSERT INTO "toDo" 
	("taskName", "task", "taskDone")
VALUES
	('Weekend Project', 'Build a to do list', 'false');