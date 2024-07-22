import { PATH_GALLERY, PATH_ROOT } from "./path";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Theo Fournier",
  description: "Theo Fournier's home app.",
  navItems: [
    {
      label: "Home",
      href: PATH_ROOT,
    },
    {
      label: "Gallery",
      href: PATH_GALLERY,
    },
  ],
};
