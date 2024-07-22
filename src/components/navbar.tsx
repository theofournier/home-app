import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "./theme-switch";

import { siteConfig } from "@/config/site";
import { auth, signOut } from "@/lib/auth/auth";
import { PATH_ADMIN } from "@/config/path";

export const Navbar = async () => {
  const session = await auth();

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
      </NavbarContent>
    </NextUINavbar>
  );
};
