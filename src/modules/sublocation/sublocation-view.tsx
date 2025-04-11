import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchSubLocationById } from "@/redux/slice/sublocationSlice"
import { useDispatch, useSelector } from "react-redux"

const SubLocationView = () => {
  useDocumentTitle("SubLocation View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const sublocation = useSelector(
    (state: RootState) => state.sublocation.sublocationById
  )
  const loading = useSelector((state: RootState) => state.sublocation.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchSubLocationById(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>SubLocations</h1>
        <Breadcrumb menu="Master" title="SubLocations" active="View" />
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
              SubLocation Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading sublocation data...</p>
            ) : sublocation ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Work Center:</span>
                  <span>Location:</span>
                  <span>Sub Location:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>
                    {typeof sublocation.workCenter === "object"
                      ? sublocation.workCenter.locationCode
                      : sublocation.workCenter || "--"}
                  </span>
                  <span>
                    {typeof sublocation.location === "object"
                      ? sublocation.location.location
                      : sublocation.location || "--"}
                  </span>
                  <span>{sublocation?.subLocation || "--"}</span>
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

export default SubLocationView
