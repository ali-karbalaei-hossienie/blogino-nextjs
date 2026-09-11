"use client";
import { createPostApi } from "@/services/postServices";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImageUploadField from "../../[postId]/components/ImageUploadField";

interface Category {
  _id: string;
  title: string;
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
  tags: z.array(z.string()).optional(),
  coverImage: z.any().refine((val) => !!val, "تصویر کاور الزامی است"),
});

type FormValues = z.infer<typeof schema>;

interface CreatePostFormProps {
  categories: Category[];
}

const CreatePostForm = ({ categories }: CreatePostFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      briefText: "",
      text: "",
      slug: "",
      readingTime: 1,
      category: "",
      tags: [],
      coverImage: null,
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

      values.tags?.forEach((tag) => formData.append("tags", tag));

      if (values.coverImage instanceof File) {
        formData.append("coverImage", values.coverImage);
      }

      const res = await createPostApi(formData);

      toast.success(res?.message || "پست با موفقیت ایجاد شد");
      reset();
      router.push("/profile/posts");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "خطایی در ایجاد پست رخ داد";
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
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={field.value || []}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="تگ‌ها"
                  placeholder="یک تگ وارد کن و Enter بزن"
                  error={!!errors.tags}
                  helperText={errors.tags?.message as string}
                />
              )}
            />
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
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            انصراف
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "در حال ایجاد..." : "ایجاد پست"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CreatePostForm;
