import { useLocation } from "react-router"

import { adminRoutes } from "@/config/admin.routes"
import { NavItem, NestedNavItem } from "./nav-item"

const Navbar = () => {
  const activeTab = useLocation().pathname

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {adminRoutes.children?.map((route, i) => (
          <div key={i}>
            {route.icon &&
              route.label &&
              (!route.children ? (
                <NavItem
                  activeTab={activeTab}
                  icon={route.icon}
                  label={route.label}
                  path={route.path || "/admin"}
                />
              ) : (
                <NestedNavItem
                  parentLabel={route.label}
                  icon={route.icon}
                  childRoutes={route.children}
                />
              ))}
          </div>
        ))}
      </ul>
    </aside>
  )
}

export default Navbar
