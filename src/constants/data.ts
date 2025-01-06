import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard", //icon name
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Boards",
    url: "#",
    icon: "user",
    isActive: false,
    items: [{ title: "All boards", url: "/dashboard/boards" }],
  },
];
