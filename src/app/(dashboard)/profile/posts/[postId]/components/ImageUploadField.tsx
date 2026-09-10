"use client";

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";

interface ImageUploadFieldProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  error?: boolean;
  helperText?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (!value) return null;
    return typeof value === "string" ? value : URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    if (typeof value !== "string" && preview) {
      return () => URL.revokeObjectURL(preview);
    }
  }, [preview, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {preview ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 260,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: error ? "error.main" : "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="کاور پست"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255, 235, 235, 0.9)",
              color: "error.main",
              boxShadow: 1,
              "&:hover": {
                bgcolor: "error.main",
                color: "white",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: "2px dashed",
            borderColor: error ? "error.main" : "divider",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: "action.hover",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "action.selected",
            },
          }}
        >
          <CloudUploadIcon
            sx={{ fontSize: 44, color: "text.secondary", mb: 1 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom>
            انتخاب یا تغییر تصویر کاور
          </Typography>
          <Typography variant="caption" color="text.secondary">
            فرمت‌های مجاز: JPG, PNG, WEBP
          </Typography>
        </Box>
      )}

      {helperText && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: "block", mt: 0.75, mx: 1.5 }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadField;
