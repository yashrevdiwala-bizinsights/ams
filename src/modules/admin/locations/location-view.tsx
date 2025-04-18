import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchLocationById } from "@/redux/slice/locationSlice"
import { useDispatch, useSelector } from "react-redux"

const LocationView = () => {
  useDocumentTitle("Location View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const location = useSelector(
    (state: RootState) => state.location.locationById
  )
  const loading = useSelector((state: RootState) => state.location.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(Number(id)))
    }
  }, [dispatch, id])

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
            {loading ? (
              <p className="text-muted p-4">Loading location data...</p>
            ) : location ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Location:</span>
                  <span>Location Code:</span>
                  <span>Status:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{location?.location || "--"}</span>
                  <span>{location?.locationCode || "--"}</span>
                  <span>{location?.active || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Location not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default LocationView
