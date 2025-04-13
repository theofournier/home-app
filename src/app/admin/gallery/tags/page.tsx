import { Metadata } from "next";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { PATH_ADMIN_GALLERY } from "@/config/path";
import { getTags } from "@/lib/services/queries/tag/getTags";
import { CreateTagForm } from "./_components/CreateTagForm";
import { EditTagItem } from "./_components/EditTagItem";

export const metadata: Metadata = {
  title: "Admin - Tags",
};

export default async function AdminTags() {
  const tags = await getTags();

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-lg font-semibold">Manage albums</h1>
        <Button as={NextLink} href={PATH_ADMIN_GALLERY}>
          Go to admin gallery
        </Button>
      </div>
      <div>
        <h2 className="font-semibold">Create album</h2>
        <CreateTagForm />
      </div>

      <div>
        <h2 className="font-semibold">Update albums</h2>
        <div className="divide-y">
          {tags.map((tag) => (
            <EditTagItem key={tag.value} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
