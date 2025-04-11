import { NonIndexRouteObject, Outlet } from "react-router"
import {
  Box,
  Cpu,
  Factory,
  LayoutDashboard,
  MapPin,
  MonitorCog,
  Settings,
  Tags,
} from "lucide-react"

import AdminLayout from "@/layouts/admin-layout"
import Dashboard from "@/modules/dashboard"
import AssetView from "@/modules/assets/asset-view"
import AssetFormComponent from "@/modules/assets/asset-form"
import { AdminChildRoute } from "@/types"
import AssetsPage from "@/modules/assets"
import LocationPage from "@/modules/admin/locations"
import LocationComponent from "@/modules/admin/locations/components/location-form"
import LocationView from "@/modules/admin/locations/location-view"
import OSPage from "@/modules/os"
import OSView from "@/modules/os/os-view"
import OSFormComponent from "@/modules/os/os-form"
import ProcessorPage from "@/modules/processor"
import ProcessorView from "@/modules/processor/process-view"
import ProcessorFormComponent from "@/modules/processor/processor-form"
import Subcat1Page from "@/modules/subcat1"
import Subcat1View from "@/modules/subcat1/subcat1-view"
import SubCat1FormComponent from "@/modules/subcat1/subcat1-form"
import Subcat2Page from "@/modules/subcat2"
import Subcat2View from "@/modules/subcat2/subcat2-view"
import SubCat2FormComponent from "@/modules/subcat2/subcat2-form"
import Subcat3Page from "@/modules/subcat3"
import Subcat3View from "@/modules/subcat3/subcat3-view"
import SubCat3FormComponent from "@/modules/subcat3/subcat3-form"
import SubLocationPage from "@/modules/sublocation"
import SubLocationView from "@/modules/sublocation/sublocation-view"
import SubLocationComponent from "@/modules/sublocation/sublocation-form"
import ManufacturerPage from "@/modules/manufacturer"
import ManufacturerView from "@/modules/manufacturer/manufacturer-view"
import ManufacturerFormComponent from "@/modules/manufacturer/manufacturer-form"
import ModelsPage from "@/modules/models"
import ModelView from "@/modules/models/models-view"
import ModelsFormComponent from "@/modules/models/models-form"

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
      path: "/admin/assets",
      label: "Assets",
      element: <Outlet />,
      icon: Settings,
      nested: false,
      children: [
        {
          path: "/admin/assets/",
          element: <AssetsPage />,
        },
        {
          path: "/admin/assets/view/:id",
          element: <AssetView />,
        },
        {
          path: "/admin/assets/add",
          element: <AssetFormComponent />,
        },
        {
          path: "/admin/assets/edit/:id",
          element: <AssetFormComponent />,
        },
      ],
    },

    {
      path: "/admin/manufacturer",
      label: "Manufacturer",
      element: <Outlet />,
      icon: Factory,
      nested: false,
      children: [
        {
          path: "/admin/manufacturer/",
          element: <ManufacturerPage />,
        },
        {
          path: "/admin/manufacturer/view/:id",
          element: <ManufacturerView />,
        },
        {
          path: "/admin/manufacturer/add",
          element: <ManufacturerFormComponent />,
        },
        {
          path: "/admin/manufacturer/edit/:id",
          element: <ManufacturerFormComponent />,
        },
      ],
    },

    {
      path: "/admin/models",
      label: "Models",
      element: <Outlet />,
      icon: Box,
      nested: false,
      children: [
        {
          path: "/admin/models/",
          element: <ModelsPage />,
        },
        {
          path: "/admin/models/view/:id",
          element: <ModelView />,
        },
        {
          path: "/admin/models/add",
          element: <ModelsFormComponent />,
        },
        {
          path: "/admin/models/edit/:id",
          element: <ModelsFormComponent />,
        },
      ],
    },

    {
      path: "/admin/locations",
      label: "Locations",
      element: <Outlet />,
      icon: MapPin,
      nested: false,
      children: [
        {
          path: "/admin/locations/",
          element: <LocationPage />,
        },
        {
          path: "/admin/locations/view/:id",
          element: <LocationView />,
        },
        {
          path: "/admin/locations/add",
          element: <LocationComponent />,
        },
        {
          path: "/admin/locations/edit/:id",
          element: <LocationComponent />,
        },
      ],
    },

    {
      path: "/admin/sublocations",
      label: "SubLocations",
      element: <Outlet />,
      icon: MapPin,
      nested: false,
      children: [
        {
          path: "/admin/sublocations/",
          element: <SubLocationPage />,
        },
        {
          path: "/admin/sublocations/view/:id",
          element: <SubLocationView />,
        },
        {
          path: "/admin/sublocations/add",
          element: <SubLocationComponent />,
        },
        {
          path: "/admin/sublocations/edit/:id",
          element: <SubLocationComponent />,
        },
      ],
    },

    {
      path: "/admin/os",
      label: "OS",
      element: <Outlet />,
      icon: MonitorCog,
      nested: false,
      children: [
        {
          path: "/admin/os/",
          element: <OSPage />,
        },
        {
          path: "/admin/os/view/:id",
          element: <OSView />,
        },
        {
          path: "/admin/os/add",
          element: <OSFormComponent />,
        },
        {
          path: "/admin/os/edit/:id",
          element: <OSFormComponent />,
        },
      ],
    },

    {
      path: "/admin/processor",
      label: "Processor",
      element: <Outlet />,
      icon: Cpu,
      nested: false,
      children: [
        {
          path: "/admin/processor/",
          element: <ProcessorPage />,
        },
        {
          path: "/admin/processor/view/:id",
          element: <ProcessorView />,
        },
        {
          path: "/admin/processor/add",
          element: <ProcessorFormComponent />,
        },
        {
          path: "/admin/processor/edit/:id",
          element: <ProcessorFormComponent />,
        },
      ],
    },

    {
      path: "/admin/subcat1",
      label: "Subcat1",
      element: <Outlet />,
      icon: Tags,
      nested: false,
      children: [
        {
          path: "/admin/subcat1/",
          element: <Subcat1Page />,
        },
        {
          path: "/admin/subcat1/view/:id",
          element: <Subcat1View />,
        },
        {
          path: "/admin/subcat1/add",
          element: <SubCat1FormComponent />,
        },
        {
          path: "/admin/subcat1/edit/:id",
          element: <SubCat1FormComponent />,
        },
      ],
    },

    {
      path: "/admin/subcat2",
      label: "Subcat2",
      element: <Outlet />,
      icon: Tags,
      nested: false,
      children: [
        {
          path: "/admin/subcat2/",
          element: <Subcat2Page />,
        },
        {
          path: "/admin/subcat2/view/:id",
          element: <Subcat2View />,
        },
        {
          path: "/admin/subcat2/add",
          element: <SubCat2FormComponent />,
        },
        {
          path: "/admin/subcat2/edit/:id",
          element: <SubCat2FormComponent />,
        },
      ],
    },

    {
      path: "/admin/subcat3",
      label: "Subcat3",
      element: <Outlet />,
      icon: Tags,
      nested: false,
      children: [
        {
          path: "/admin/subcat3/",
          element: <Subcat3Page />,
        },
        {
          path: "/admin/subcat3/view/:id",
          element: <Subcat3View />,
        },
        {
          path: "/admin/subcat3/add",
          element: <SubCat3FormComponent />,
        },
        {
          path: "/admin/subcat3/edit/:id",
          element: <SubCat3FormComponent />,
        },
      ],
    },

    // {
    //   path: "/admin/users",
    //   label: "Users",
    //   element: <Outlet />,
    //   icon: UsersIcon,
    //   nested: false,
    //   children: [
    //     {
    //       path: "/admin/users/",
    //       element: <Users />,
    //     },
    //     {
    //       path: "/admin/users/view/:id",
    //       element: <UserView />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/vendors",
    //   label: "Vendors",
    //   element: <Outlet />,
    //   icon: ContactRound,
    //   nested: false,
    //   children: [
    //     {
    //       path: "/admin/vendors/",
    //       element: <Vendors />,
    //     },
    //     {
    //       path: "/admin/vendors/view/:id",
    //       element: <VendorView />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/products",
    //   label: "Products",
    //   element: <Outlet />,
    //   icon: ShoppingCart,
    //   nested: false,
    //   children: [
    //     {
    //       path: "/admin/products/",
    //       element: <Product />,
    //     },
    //     {
    //       path: "/admin/products/view/:id",
    //       element: <ProductView />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/admin-users",
    //   label: "Admin Users",
    //   element: <Outlet />,
    //   icon: ShieldUser,
    //   nested: true,
    //   children: [
    //     // {
    //     //   path: "/admin/admin-users/locations",
    //     //   label: "Locations",
    //     //   element: <Outlet />,
    //     //   icon: MapPin,
    //     //   nested: false,
    //     //   children: [
    //     //     {
    //     //       path: "/admin/admin-users/locations/",
    //     //       element: <Location />,
    //     //     },
    //     //     {
    //     //       path: "/admin/admin-users/locations/view/:id",
    //     //       element: <LocationView />,
    //     //     },
    //     //   ],
    //     // },

    //     {
    //       path: "/admin/admin-users/product-types",
    //       label: "Product Types",
    //       element: <ProductType />,
    //       icon: ShoppingBag,
    //     },

    //     {
    //       path: "/admin/admin-users/product-categories",
    //       label: "Product Categories",
    //       element: <ProductCategory />,
    //       icon: ShoppingBasket,
    //     },
    //   ],
    // },
  ],
}
