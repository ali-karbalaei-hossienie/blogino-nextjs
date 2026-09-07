"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  Link as MuiLink,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema, SignupValues } from "../../lib/authSchemas";
import Layout from "../../Layout";
import PasswordField from "../../components/PasswordField";

export default function SignupPageForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupValues) => {
    setServerError(null);
    try {
      // TODO: این بخش را به فراخوانی API واقعی خودتان وصل کنید
      // await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(values) });
      console.log(values);
    } catch {
      setServerError("ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <Layout
      title="ثبت‌نام"
      subtitle="برای شروع یک حساب کاربری بسازید"
      footer={
        <>
          قبلاً حساب ساخته‌اید؟{" "}
          <MuiLink component={Link} href="/signin">
            وارد شوید
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
          label="نام و نام خانوادگی"
          autoComplete="name"
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register("fullName")}
        />

        <TextField
          label="ایمیل"
          type="email"
          autoComplete="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          name="password"
          control={control}
          label="رمز عبور"
          autoComplete="new-password"
        />

        <PasswordField
          name="confirmPassword"
          control={control}
          label="تکرار رمز عبور"
          autoComplete="new-password"
        />

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
            "ساخت حساب کاربری"
          )}
        </Button>
      </Stack>
    </Layout>
  );
}
