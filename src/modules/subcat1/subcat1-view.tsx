import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchSubcat1ByID } from "@/redux/slice/subcat1Slice"
import { useDispatch, useSelector } from "react-redux"

const Subcat1View = () => {
  useDocumentTitle("Subcat1 View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const subcat1 = useSelector((state: RootState) => state.subcat1.subcat1ById)
  const loading = useSelector((state: RootState) => state.subcat1.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchSubcat1ByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Subcat1</h1>
        <Breadcrumb menu="Master" title="Subcat1" active="View" />
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
              Subcat1 Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading subcat1 data...</p>
            ) : subcat1 ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>MajorCat:</span>
                  <span>Subcat1:</span>
                  <span>Abbr:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{subcat1?.majorCat || "--"}</span>
                  <span>{subcat1?.subCat1 || "--"}</span>
                  <span>{subcat1?.abbr || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Subcat1 not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Subcat1View
