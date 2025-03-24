import { LucideIcon } from "lucide-react"
import { Link } from "react-router"

interface NavItemProps {
  activeTab: string
  path: string
  icon: LucideIcon
  label: string
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
