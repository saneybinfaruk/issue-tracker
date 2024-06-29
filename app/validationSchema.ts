import z, { string } from "zod";

export const issueSchema = z.object({
  title: string().min(3, { message: "Minimum 3 character required!" }),
  description: string().min(4, { message: "Minimum 4 character required!" }),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
export type issueFormField = z.infer<typeof issueSchema>;

export const patchSchema = z.object({
  title: string()
    .min(3, { message: "Minimum 3 character required!" })
    .optional(),
  description: string()
    .min(4, { message: "Minimum 4 character required!" })
    .optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: string().optional().nullable(),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Valid email required!" }),
  password: z.string().min(4, { message: "Needs 3 characters!" }).max(255),
});

export type SignInFormField = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(3, { message: "Needs 3 characters!" }).max(255),
  email: z.string().email({ message: "Valid email required!" }),
  password: z.string().min(4, { message: "Needs 3 characters!" }).max(255),
  image: z.string().optional().nullable(),
});

export type SignUpFormField = z.infer<typeof SignUpSchema>;
