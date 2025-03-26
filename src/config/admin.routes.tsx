import { NonIndexRouteObject } from "react-router"
import {
  ContactRound,
  LayoutDashboard,
  MapPin,
  Settings,
  ShieldUser,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  UsersIcon,
} from "lucide-react"

import AdminLayout from "@/layouts/admin-layout"
import Dashboard from "@/modules/dashboard"
import Users from "@/modules/users"
import UserView from "@/modules/users/view-user"
import Vendors from "@/modules/vendors"
import VendorView from "@/modules/vendors/view-vendor"
import Product from "@/modules/products"
import ProductView from "@/modules/products/view-product"
import Assets from "@/modules/assets"
import AssetForm from "@/modules/assets/asset-form"

interface AdminRoutes extends NonIndexRouteObject {
  children?: AdminChildRoute[]
}

export const adminRoutes: AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "/admin",
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
      path: "/admin/users/view/:id",
      element: <UserView />,
    },
    {
      path: "/admin/vendors",
      label: "Vendors",
      element: <Vendors />,
      icon: ContactRound,
    },
    {
      path: "/admin/vendors/view/:id",
      element: <VendorView />,
    },
    {
      path: "/admin/products",
      label: "Products",
      element: <Product />,
      icon: ShoppingCart,
    },
    {
      path: "/admin/products/view/:id",
      element: <ProductView />,
    },
    {
      path: "/admin/assets",
      label: "Assets",
      element: <Assets />,
      icon: Settings,
    },
    {
      path: "/admin/assets/add",
      element: <AssetForm />,
    },
    {
      path: "/admin/assets/edit/:id",
      element: <AssetForm />,
    },
    {
      path: "/admin/admin-users",
      label: "Admin Users",
      element: <Users />,
      icon: ShieldUser,
      children: [
        {
          path: "/admin/admin-users/locations",
          label: "Locations",
          element: <Users />,
          icon: MapPin,
        },
        {
          path: "/admin/admin-users/product-types",
          label: "Product Types",
          element: <Users />,
          icon: ShoppingBag,
        },
        {
          path: "/admin/admin-users/product-categories",
          label: "Product Categories",
          element: <Users />,
          icon: ShoppingBasket,
        },
      ],
    },
  ],
}
