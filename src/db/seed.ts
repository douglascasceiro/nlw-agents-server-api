import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { seedSchema } from "./schema/index.ts";

await reset(db, seedSchema);

await seed(db, seedSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 25,
      columns: {
        question: f.companyName(),
        answer: f.loremIpsum(),
      },
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only dev
console.log("Database seed");
