import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "./theme-switch";

import { siteConfig } from "@/config/site";
import { auth, signOut } from "@/lib/auth/auth";
import { PATH_ADMIN } from "@/config/path";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

export const Navbar = async () => {
  const session = await auth();

  const endContent = (
    <>
      {session?.user && (
        <>
          <NextLink href={PATH_ADMIN}>Admin</NextLink>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </>
      )}
      <NextLink
        href="https://github.com/theofournier/home-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button isIconOnly>
          <IconBrandGithub />
        </Button>
      </NextLink>
    </>
  );

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent justify="start">
        <ul className="flex gap-4 justify-start mx-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <ThemeSwitch />
      </NavbarContent>
      <NavbarContent justify="end" className="sm:hidden">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
        {endContent}
      </NavbarContent>
      <NavbarMenu>{endContent}</NavbarMenu>
    </NextUINavbar>
  );
};
