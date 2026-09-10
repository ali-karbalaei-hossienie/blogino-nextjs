"use client";

import { editPostApi } from "@/services/postServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImageUploadField from "./ImageUploadField";

interface Category {
  _id: string;
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  briefText: string;
  text: string;
  readingTime: number;
  category: { _id: string };
  type: "free" | "paid";
  coverImageUrl?: string;
}

const schema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  briefText: z.string().min(1, "متن کوتاه الزامی است"),
  text: z.string().min(1, "متن الزامی است"),
  slug: z.string().min(1, "اسلاگ الزامی است"),
  readingTime: z
    .number({ error: "زمان مطالعه باید عدد باشد" })
    .min(1, "زمان مطالعه باید حداقل ۱ باشد"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  type: z.enum(["free", "paid"]),
  coverImage: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

interface EditPostFormProps {
  post: Post;
  categories: Category[];
}

const EditPostForm = ({ post, categories }: EditPostFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post.title,
      briefText: post.briefText,
      text: post.text,
      slug: post.slug,
      readingTime: post.readingTime,
      category: post.category._id,
      type: post.type,
      coverImage: post.coverImageUrl ?? null,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("briefText", values.briefText);
      formData.append("text", values.text);
      formData.append("slug", values.slug);
      formData.append("readingTime", String(values.readingTime));
      formData.append("category", values.category);
      formData.append("type", values.type);

      if (values.coverImage instanceof File) {
        formData.append("coverImage", values.coverImage);
      } else if (!values.coverImage) {
        formData.append("coverImage", "");
      }

      const res = await editPostApi({ data: formData, id: post._id });

      toast.success(res?.message || "پست با موفقیت ویرایش شد");
      // router.push("/profile/posts");
      router.refresh();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "خطایی در ویرایش پست رخ داد";
      toast.error(errorMessage);
    }
  };

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 3,
      }}
    >
      <Stack spacing={3}>
        {/* عنوان */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="عنوان"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="briefText"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="متن کوتاه"
              fullWidth
              error={!!errors.briefText}
              helperText={errors.briefText?.message}
            />
          )}
        />

        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="متن"
              fullWidth
              multiline
              minRows={5}
              error={!!errors.text}
              helperText={errors.text?.message}
            />
          )}
        />

        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="اسلاگ"
              fullWidth
              dir="ltr"
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />
          )}
        />

        <Controller
          name="readingTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="زمان مطالعه (دقیقه)"
              fullWidth
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={!!errors.readingTime}
              helperText={errors.readingTime?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="دسته بندی"
              required
              fullWidth
              error={!!errors.category}
              helperText={errors.category?.message}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.title}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageUploadField
              value={field.value}
              onChange={field.onChange}
              error={!!errors.coverImage}
              helperText={errors.coverImage?.message as string}
            />
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => router.back()}>
            انصراف
          </Button>
          <Button type="submit" variant="contained">
            ذخیره تغییرات
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default EditPostForm;
