import { z } from "zod";

export const loginSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID'si gereklidir"),
  password: z.string().min(1, "Şifre gereklidir"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
