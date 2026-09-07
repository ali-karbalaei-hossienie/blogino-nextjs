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
import { Metadata } from "next";
import { loginSchema, LoginValues } from "../../lib/authSchemas";
import Layout from "../../Layout";
import PasswordField from "../../components/PasswordField";
import { signinApi } from "@/services/authServices";
import { toast } from "sonner";
import { authTpe } from "@/services/types";
import { useAuth } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری در بلاگینو",
};
export default function SigninPageForm() {
  const { signin } = useAuth();

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
    await signin(values);
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
