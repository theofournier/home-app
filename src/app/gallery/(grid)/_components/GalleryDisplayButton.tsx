import { ButtonGroup, Button } from "@nextui-org/button";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import { PropsWithChildren } from "react";
import NextLink from "next/link";
import { PATH_GALLERY } from "@/config/path";

type Props = {
  display: "list" | "grid";
};

export const GalleryDisplayButton = ({ display }: Props) => {
  const DisplayButton = ({
    children,
    selected,
    display,
  }: PropsWithChildren<{ selected: boolean; display: "list" | "grid" }>) => (
    <Button
      isIconOnly
      variant={selected ? "solid" : "bordered"}
      color={selected ? "primary" : "default"}
    >
      <NextLink href={`${PATH_GALLERY}?display=${display}`}>
        {children}
      </NextLink>
    </Button>
  );

  return (
    <ButtonGroup>
      <DisplayButton selected={display === "grid"} display="grid">
        <IconLayoutGrid />
      </DisplayButton>
      <DisplayButton selected={display === "list"} display="list">
        <IconLayoutList />
      </DisplayButton>
    </ButtonGroup>
  );
};
