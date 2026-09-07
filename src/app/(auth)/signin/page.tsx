"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  Link as MuiLink,
  Stack,
  TextField,
} from "@mui/material";
import { loginSchema, LoginValues } from "../lib/authSchemas";
import Layout from "../Layout";
import PasswordField from "../components/PasswordField";

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);

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
    setServerError(null);
    try {
      // TODO: این بخش را به فراخوانی API واقعی خودتان وصل کنید
      // await fetch("/api/auth/login", { method: "POST", body: JSON.stringify(values) });
      console.log(values);
    } catch {
      setServerError("ورود ناموفق بود. ایمیل یا رمز عبور را بررسی کنید.");
    }
  };

  return (
    <Layout
      title="ورود"
      subtitle="برای ادامه وارد حساب کاربری‌تان شوید"
      footer={
        <>
          حساب کاربری ندارید؟{" "}
          <MuiLink component={Link} href="/signup">
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
        {serverError && <Alert severity="error">{serverError}</Alert>}

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
