import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { locationData } from "./components/location"

const LocationView = () => {
  useDocumentTitle("Location View - AMS")

  const { id } = useParams<{ id: string }>()

  const location = locationData.find((location) => location.id === Number(id))

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Locations</h1>
        <Breadcrumb menu="Master" title="Locations" active="View" />
      </div>

      <BackButton />

      <div className="col-12">
        <div className="card info-card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center">
              <span className="card-icon">
                <Contact
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "10",
                  }}
                />
              </span>
              Location Details
            </h5>

            <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
              <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                <span>Gate No. :</span>
                <span>Address:</span>
                <span>City:</span>
                <span>State:</span>
                <span>Country:</span>
                <span>Zip Code:</span>
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                <span>{location?.gateNumber || "--"}</span>
                <span>
                  {(location?.address1 &&
                    location.address2 &&
                    location?.address1 + ", " + location?.address2) ||
                    "--"}
                </span>
                <span>{location?.city || "--"}</span>
                <span>{location?.state || "--"}</span>
                <span>{location?.country || "--"}</span>
                <span>{location?.zipCode || "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LocationView
