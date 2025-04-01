import { Input } from "antd"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  handleSearch: (value: string) => void
}

export const Search = ({ handleSearch }: SearchProps) => {
  return (
    <div className="position-relative d-flex align-items-center">
      <Input
        placeholder="Search"
        size="middle"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="position-absolute top-50 end-0 translate-middle-y w-25 h-75 opacity-50" />
    </div>
  )
}
