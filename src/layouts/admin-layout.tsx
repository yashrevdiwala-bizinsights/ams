import { useState } from "react"
import { Outlet } from "react-router"

import Hero from "@/modules/components/hero"
import Navbar from "@/modules/components/navbar"

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={isSidebarOpen ? "" : "toggle-sidebar"}>
      <Hero toggleSidebar={toggleSidebar} />
      <Navbar />

      <Outlet />
    </div>
  )
}

export default AdminLayout
