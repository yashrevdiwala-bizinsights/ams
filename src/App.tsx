import { createBrowserRouter, RouterProvider } from "react-router"

import { routes } from "./config/index.routes"
import useDocumentTitle from "./lib/useDocumentTitle"

const App = () => {
  useDocumentTitle("Asset Management System")

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default App

