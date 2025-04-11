import { useParams } from "react-router"
import { Contact } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchProcessorByID } from "@/redux/slice/processorSlice"
import { useDispatch, useSelector } from "react-redux"

const ProcessorView = () => {
  useDocumentTitle("Processor View - AMS")

  const { id } = useParams<{ id: string }>()

  const dispatch = useDispatch<AppDispatch>()

  const processor = useSelector(
    (state: RootState) => state.processor.processorById
  )
  const loading = useSelector((state: RootState) => state.processor.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchProcessorByID(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Processor</h1>
        <Breadcrumb menu="Master" title="Processor" active="View" />
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
              Processor Details
            </h5>
            {loading ? (
              <p className="text-muted p-4">Loading processor data...</p>
            ) : processor ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Processor:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{processor?.processor || "--"}</span>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Processor not found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProcessorView
