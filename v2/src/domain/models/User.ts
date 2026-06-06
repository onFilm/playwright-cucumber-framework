import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["admin", "standard", "locked"]).optional()
});

export type User = z.infer<typeof UserSchema>;

export class UserMapper {
  public static fromDataTable(row: Record<string, string>): User {
    return UserSchema.parse(row);
  }
}
