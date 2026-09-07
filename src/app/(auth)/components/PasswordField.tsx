"use client";

import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  autoComplete?: string;
}

export default function PasswordField<T extends FieldValues>({
  name,
  control,
  label,
  autoComplete = "current-password",
}: PasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setVisible((v) => !v)}
                    edge="end"
                    aria-label={
                      visible ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                    }
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {visible ? (
                      <VisibilityOffRoundedIcon fontSize="small" />
                    ) : (
                      <VisibilityRoundedIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
