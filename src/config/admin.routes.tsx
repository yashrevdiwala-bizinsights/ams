import { NonIndexRouteObject, Outlet } from "react-router"
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
import AssetView from "@/modules/assets/asset-view"
import AssetForm from "@/modules/assets/asset-form"
import Location from "@/modules/admin/locations"
import LocationView from "@/modules/admin/locations/location-view"
import ProductType from "@/modules/admin/product-type"
import ProductCategory from "@/modules/admin/product-category"

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
      element: <Outlet />,
      icon: UsersIcon,
      nested: false,
      children: [
        {
          path: "/admin/users/",
          element: <Users />,
        },
        {
          path: "/admin/users/view/:id",
          element: <UserView />,
        },
      ],
    },

    {
      path: "/admin/vendors",
      label: "Vendors",
      element: <Outlet />,
      icon: ContactRound,
      nested: false,
      children: [
        {
          path: "/admin/vendors/",
          element: <Vendors />,
        },
        {
          path: "/admin/vendors/view/:id",
          element: <VendorView />,
        },
      ],
    },

    {
      path: "/admin/products",
      label: "Products",
      element: <Outlet />,
      icon: ShoppingCart,
      nested: false,
      children: [
        {
          path: "/admin/products/",
          element: <Product />,
        },
        {
          path: "/admin/products/view/:id",
          element: <ProductView />,
        },
      ],
    },

    {
      path: "/admin/assets",
      label: "Assets",
      element: <Outlet />,
      icon: Settings,
      nested: false,
      children: [
        {
          path: "/admin/assets/",
          element: <Assets />,
        },
        {
          path: "/admin/assets/view/:id",
          element: <AssetView />,
        },
        {
          path: "/admin/assets/add",
          element: <AssetForm />,
        },
        {
          path: "/admin/assets/edit/:id",
          element: <AssetForm />,
        },
      ],
    },

    {
      path: "/admin/admin-users",
      label: "Admin Users",
      element: <Outlet />,
      icon: ShieldUser,
      nested: true,
      children: [
        {
          path: "/admin/admin-users/locations",
          label: "Locations",
          element: <Outlet />,
          icon: MapPin,
          nested: false,
          children: [
            {
              path: "/admin/admin-users/locations/",
              element: <Location />,
            },
            {
              path: "/admin/admin-users/locations/view/:id",
              element: <LocationView />,
            },
          ],
        },

        {
          path: "/admin/admin-users/product-types",
          label: "Product Types",
          element: <ProductType />,
          icon: ShoppingBag,
        },

        {
          path: "/admin/admin-users/product-categories",
          label: "Product Categories",
          element: <ProductCategory />,
          icon: ShoppingBasket,
        },
      ],
    },
  ],
}
