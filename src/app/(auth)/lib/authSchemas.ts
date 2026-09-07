import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "ایمیل را وارد کنید").email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "نام و نام خانوادگی را وارد کنید")
      .min(3, "نام و نام خانوادگی باید حداقل ۳ حرف باشد"),
    email: z.string().min(1, "ایمیل را وارد کنید").email("ایمیل معتبر نیست"),
    password: z
      .string()
      .min(1, "رمز عبور را وارد کنید")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .regex(/[A-Za-z]/, "رمز عبور باید شامل حرف باشد")
      .regex(/[0-9]/, "رمز عبور باید شامل عدد باشد"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;
