import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchSubcat2ByID } from "@/redux/slice/subcat2Slice"
import { useDispatch, useSelector } from "react-redux"

const Subcat2View = () => {
  useDocumentTitle("Subcat2 View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const subcat2 = useSelector((state: RootState) => state.subcat2.subcat2ById)
  const loading = useSelector((state: RootState) => state.subcat2.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchSubcat2ByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Subcat2</h1>
        <Breadcrumb menu="Master" title="Subcat2" active="View" />
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
              Subcat2 Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading subcat2 data...</p>
            ) : subcat2 ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Subcat1:</span>
                  <span>Subcat2:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>
                    {typeof subcat2.subCat1 === "object"
                      ? subcat2.subCat1.subCat1
                      : subcat2.subCat1 || "--"}
                  </span>
                  <span>{subcat2?.subCat2 || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Subcat2 not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Subcat2View
