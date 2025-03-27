import { LucideIcon } from "lucide-react"
import { Link } from "react-router"

interface NavItemProps {
  activeTab: string
  path: string
  icon: LucideIcon
  label: string
}

interface NestedNavItemProps {
  icon: LucideIcon
  parentPath: string
  parentLabel: string
  activeTab: string
  childRoutes: AdminChildRoute[]
}

export const NavItem = ({
  activeTab,
  icon: Icon,
  label,
  path,
}: NavItemProps) => {
  return (
    <li className="nav-item">
      <Link
        className={activeTab === path ? "nav-link" : "nav-link collapsed"}
        to={path}
      >
        <Icon
          style={{ width: "1.25rem", height: "1.25rem", marginRight: "10" }}
        />
        <span>{label}</span>
      </Link>
    </li>
  )
}

export const NestedNavItem = ({
  icon: Icon,
  parentPath,
  parentLabel,
  activeTab,
  childRoutes,
}: NestedNavItemProps) => {
  return (
    <li className="nav-item" style={{ cursor: "pointer" }}>
      <p
        className={
          activeTab.includes(parentPath) ? "nav-link" : "nav-link collapsed"
        }
        data-bs-target={`#${parentLabel.replace(" ", "-").toLowerCase()}-nav`}
        data-bs-toggle="collapse"
      >
        <Icon
          style={{ width: "1.25rem", height: "1.25rem", marginRight: "10" }}
        />
        <span>{parentLabel}</span>

        <i className="bi bi-chevron-down ms-auto" />
      </p>

      <ul
        id={`${parentLabel.replace(" ", "-").toLowerCase()}-nav`}
        className={`nav-content collapse ${
          activeTab.includes(parentPath) ? "show" : ""
        }`}
        data-bs-parent="#sidebar-nav"
      >
        {childRoutes.map((route, i) => (
          <li className="nav-item" key={i}>
            <Link
              to={route.path || "/admin"}
              className={
                activeTab === route.path ? "nav-link" : "nav-link collapsed"
              }
              style={activeTab === route.path ? { color: "#4e46eb" } : {}}
            >
              <route.icon
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  marginRight: "10",
                }}
              />
              <span>{route.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}
