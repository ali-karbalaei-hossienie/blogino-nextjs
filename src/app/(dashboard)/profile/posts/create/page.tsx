import React from "react";
import CreatePostForm from "./components/CreatePostForm";
import { getCategoryApi } from "@/services/categoryList";

const page = async () => {
  const { categories } = await getCategoryApi();
  console.log(categories);

  return <CreatePostForm categories={categories} />;
};

export default page;
