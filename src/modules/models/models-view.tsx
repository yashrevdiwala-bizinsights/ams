import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchModelsByID } from "@/redux/slice/modelsSlice"
import { useDispatch, useSelector } from "react-redux"

const ModelView = () => {
  useDocumentTitle("Models View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const models = useSelector((state: RootState) => state.models.modelsById)
  const loading = useSelector((state: RootState) => state.models.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchModelsByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Models</h1>
        <Breadcrumb menu="Master" title="Models" active="View" />
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
              Models Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading models data...</p>
            ) : models ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Model:</span>
                  <span>Category:</span>
                  <span>Make:</span>
                  <span>MajorCat:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{models?.model || "--"}</span>
                  <span>
                    {typeof models.category === "object"
                      ? models.category.subCat1
                      : models.category || "--"}
                  </span>
                  <span>
                    {typeof models.make === "object"
                      ? models.make.manfact
                      : models.make || "--"}
                  </span>
                  <span>{models?.majorCategory || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Models not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ModelView
