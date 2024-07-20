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

export const Navbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll maxWidth="full" position="sticky">
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
    </NextUINavbar>
  );
};
