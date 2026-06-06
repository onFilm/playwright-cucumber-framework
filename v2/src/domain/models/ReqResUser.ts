import { z } from "zod";

export const ReqResUserSchema = z.object({
  id: z.number().optional(), // optional because POST response has string id, or we just type it flexibly
  email: z.string().email().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z.string().url().optional(),
  name: z.string().optional(), // For POST
  job: z.string().optional() // For POST
}).passthrough(); // passthrough because ReqRes can be flexible

export const ReqResResponseSchema = z.object({
  data: ReqResUserSchema
});

export type ReqResUser = z.infer<typeof ReqResUserSchema>;
