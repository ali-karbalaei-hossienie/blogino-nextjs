"use client";

import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  Link as MuiLink,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../../Layout";
import PasswordField from "../../components/PasswordField";
import { loginSchema, LoginValues } from "../../lib/authSchemas";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPageForm() {
  const { signin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await signin({
        email: values.email,
        password: values.password,
      });
      router.push(callbackUrl);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Layout
      title="ورود"
      subtitle="برای ادامه وارد حساب کاربری‌تان شوید"
      footer={
        <>
          حساب کاربری ندارید؟{" "}
          <MuiLink
            component={Link}
            href={`/signup${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          >
            ثبت‌نام کنید
          </MuiLink>
        </>
      }
    >
      <Stack
        component="form"
        spacing={2.5}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          label="ایمیل"
          type="email"
          autoComplete="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <PasswordField name="password" control={control} label="رمز عبور" />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 1 }}
        >
          {isSubmitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "ورود"
          )}
        </Button>
      </Stack>
    </Layout>
  );
}
