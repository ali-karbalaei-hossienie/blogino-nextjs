"use client";

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
import { toast } from "sonner";

import Layout from "../../Layout";
import PasswordField from "../../components/PasswordField";
import { signupSchema, SignupValues } from "../../lib/authSchemas";
import { signupApi } from "@/services/authServices";
import { authTpe } from "@/services/types";
import { useAuth } from "@/context/AuthContext";

export default function SignupPageForm() {
  const { signup } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: authTpe) => {
    await signup(values);
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
        <TextField
          label="نام و نام خانوادگی"
          autoComplete="name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
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
