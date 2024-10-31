import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email().min(10),
  password: z.string().min(4),
});
