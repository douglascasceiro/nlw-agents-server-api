import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(333),
  HOST: z.coerce.string().default("0.0.0.0"),
  DATABASE_URL: z.coerce.string().url().startsWith("postgresql://").default(""),
});

export const env = envSchema.parse(process.env);
