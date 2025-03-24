import { useLocation } from "react-router"

import { adminRoutes } from "@/config/admin.routes"
import { NavItem } from "./nav-item"

const Navbar = () => {
  const activeTab = useLocation().pathname

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {adminRoutes.children?.map((route) => (
          <NavItem
            key={route.path}
            activeTab={activeTab}
            icon={route.icon}
            label={route.label}
            path={route.path || "/admin"}
          />
        ))}
      </ul>
    </aside>
  )
}

export default Navbar
