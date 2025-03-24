interface BreadcrumbProps {
  menu: string
  title?: string
  active: string
}

export const Breadcrumb = ({ menu, title, active }: BreadcrumbProps) => {
  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">{menu}</li>
        {title && <li className="breadcrumb-item">{title}</li>}
        <li className="breadcrumb-item active">{active}</li>
      </ol>
    </nav>
  )
}
