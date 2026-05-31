import z from "zod";

export const loginPhoneSchema = z.object({
  phone: z.string().regex(/^\+\d{10,16}$/, "Invalid phone number"),
});
