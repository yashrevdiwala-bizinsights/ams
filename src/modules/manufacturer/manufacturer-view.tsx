import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchManufacturerByID } from "@/redux/slice/manufacturerSlice"
import { useDispatch, useSelector } from "react-redux"

const ManufacturerView = () => {
  useDocumentTitle("Manufacturer View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const manufacturer = useSelector(
    (state: RootState) => state.manufacturer.manufacturerById
  )
  const loading = useSelector((state: RootState) => state.manufacturer.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchManufacturerByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manufacturer</h1>
        <Breadcrumb menu="Master" title="Manufacturer" active="View" />
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
              Manufacturer Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading manufacturer data...</p>
            ) : manufacturer ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>MajorCat:</span>
                  <span>Subcat1:</span>
                  <span>Abbr:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{manufacturer?.manfact || "--"}</span>
                  <span>{manufacturer?.majorCat || "--"}</span>
                  <span>
                    {typeof manufacturer.subCat1 === "object"
                      ? manufacturer.subCat1.subCat1
                      : manufacturer.subCat1 || "--"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Manufacturer not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManufacturerView
