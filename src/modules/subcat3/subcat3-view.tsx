import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchSubcat3ByID } from "@/redux/slice/subcat3Slice"
import { useDispatch, useSelector } from "react-redux"

const Subcat3View = () => {
  useDocumentTitle("Subcat3 View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const subcat3 = useSelector((state: RootState) => state.subcat3.subcat3ById)
  const loading = useSelector((state: RootState) => state.subcat3.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchSubcat3ByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Subcat3</h1>
        <Breadcrumb menu="Master" title="Subcat3" active="View" />
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
              Subcat3 Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading subcat3 data...</p>
            ) : subcat3 ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Subcat1:</span>
                  <span>Subcat2:</span>
                  <span>Subcat3:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>
                    {typeof subcat3.subCat1 === "object"
                      ? subcat3.subCat1.subCat1
                      : subcat3.subCat1 || "--"}
                  </span>
                  <span>
                    {typeof subcat3.subCat2 === "object"
                      ? subcat3.subCat2.subCat2
                      : subcat3.subCat2 || "--"}
                  </span>
                  <span>{subcat3?.subCat3 || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Subcat3 not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Subcat3View
