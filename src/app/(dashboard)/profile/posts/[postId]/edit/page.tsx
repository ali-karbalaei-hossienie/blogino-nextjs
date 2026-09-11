import { getCategoryApi } from "@/services/categoryList";
import { getPostById } from "@/services/postServices";
import { Breadcrumbs, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import EditPostForm from "../components/EditPostForm";

interface PageProps {
  params: { postId: string };
}

const EditPostPage = async ({ params }: PageProps) => {
  const { postId } = await params;
  const [
    {
      data: { post },
    },
    categoriesRes,
  ] = await Promise.all([getPostById(postId), getCategoryApi()]);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Typography color="text.primary">ویرایش پست</Typography>
      </Breadcrumbs>

      <Container maxWidth="md">
        <EditPostForm post={post} categories={categoriesRes.categories} />
      </Container>
    </div>
  );
};

export default EditPostPage;
