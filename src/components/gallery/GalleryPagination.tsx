"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@nextui-org/pagination";

type Props = {
  total: number;
  page: number;
};

export const GalleryPagination = ({ total, page }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePagination = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p) {
      params.set("page", p.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      showControls
      total={total}
      page={page}
      onChange={handlePagination}
    />
  );
};
