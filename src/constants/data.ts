import { Icons } from "@/components/icons";
// export type User = {
//   id: number;
//   name: string;
//   company: string;
//   role: string;
//   verified: boolean;
//   status: string;
// };

// export type Product = {
//   photo_url: string;
//   name: string;
//   description: string;
//   created_at: string;
//   price: number;
//   id: number;
//   category: string;
//   updated_at: string;
// };
interface NavItem {
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
    url: "/dashboard/boards",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
];
