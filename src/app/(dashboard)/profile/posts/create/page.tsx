import React from "react";
import CreatePostForm from "./components/CreatePostForm";
import { getCategoryApi } from "@/services/categoryList";
import { Container } from "@mui/material";

const page = async () => {
  const { categories } = await getCategoryApi();

  return (
    <Container maxWidth="md">
      <CreatePostForm categories={categories} />
    </Container>
  );
};

export default page;
