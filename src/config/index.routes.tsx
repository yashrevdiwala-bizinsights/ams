import { RouteObject } from "react-router"

import Home from "@/home"
import Logout from "@/modules/auth/logout"
import SignIn from "@/modules/auth/sign-in"
import SignUp from "@/modules/auth/sign-up"
import PageNotFound from "@/modules/pagenotfound"
import { adminRoutes } from "./admin.routes"

export const routes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  adminRoutes,
  {
    path: "*",
    element: <PageNotFound />,
  },
]
