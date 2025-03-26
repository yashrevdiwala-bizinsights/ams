import { ChevronLeft } from "lucide-react"

export const BackButton = () => {
  return (
    <div
      className="d-flex align-items-center fw-bold"
      style={{ cursor: "pointer" }}
      onClick={() => history.back()}
    >
      <p className="me-1">
        <ChevronLeft />
      </p>
      <p>Back</p>
    </div>
  )
}
