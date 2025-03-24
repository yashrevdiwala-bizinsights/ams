import { NonIndexRouteObject } from "react-router"
import {
  ContactRound,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShieldUser,
  ShoppingCart,
  UsersIcon,
} from "lucide-react"

import AdminLayout from "@/layouts/admin-layout"
import Dashboard from "@/modules/dashboard"
import Users from "@/modules/users"

interface AdminRoutes extends NonIndexRouteObject {
  children?: Array<{
    path?: string
    element: React.ReactElement
    index?: boolean
    icon: LucideIcon
    label: string
  }>
}

export const adminRoutes: AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      label: "Dashboard",
      element: <Dashboard />,
      icon: LayoutDashboard,
    },
    {
      path: "/admin/users",
      label: "Users",
      element: <Users />,
      icon: UsersIcon,
    },
    {
      path: "/admin/vendors",
      label: "Vendors",
      element: <Users />,
      icon: ContactRound,
    },
    {
      path: "/admin/products",
      label: "Products",
      element: <Users />,
      icon: ShoppingCart,
    },
    {
      path: "/admin/assets",
      label: "Assets",
      element: <Users />,
      icon: Settings,
    },
    {
      path: "/admin/admin-users",
      label: "Admin Users",
      element: <Users />,
      icon: ShieldUser,
    },
  ],
}
