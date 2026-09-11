"use client";

import { Pagination, PaginationItem, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface PaginationControlProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControl({
  totalPages,
  currentPage,
}: PaginationControlProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handleChange = (_event: ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", alignItems: "center", my: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            page={item.page !== null ? toPersianDigits(item.page) : undefined}
          />
        )}
      />
    </Stack>
  );
}
