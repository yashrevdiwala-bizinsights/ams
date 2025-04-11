import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Processor } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addProcessor,
  fetchProcessorByID,
  resetprocessorState,
  updateProcessor,
} from "@/redux/slice/processorSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"

export const ProcessorFormComponent = () => {
  useDocumentTitle("Processor Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, processorById } = useSelector(
    (state: RootState) => state.processor
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Processor>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchProcessorByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && processorById) {
      reset(processorById)
    }
  }, [processorById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetprocessorState())
      navigate("/admin/processor/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: Processor) => {
    if (isEditMode && id) {
      dispatch(updateProcessor(data))
    } else {
      dispatch(addProcessor(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Processor</h1>
        <Breadcrumb
          menu="Master"
          title="Processor"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Processor" : "Add Processor"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Processor</label>
                <input
                  className="form-control"
                  {...register("processor", { required: true })}
                  placeholder="processor"
                />
                {errors.processor && (
                  <div className="text-danger mt-1">Processor is required</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <FormButton
                onClick={() => history.back()}
                className="btn btn-secondary"
              >
                Cancel
              </FormButton>
              <FormButton
                htmlType="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Saving..." : isEditMode ? "Update" : "Add"}
              </FormButton>
            </div>
          </form>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </div>
      </div>
    </main>
  )
}

export default ProcessorFormComponent
