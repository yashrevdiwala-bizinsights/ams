import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { OSType } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addOS,
  fetchOSByID,
  resetOsState,
  updateOS,
} from "@/redux/slice/osSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"

export const OSFormComponent = () => {
  useDocumentTitle("OS Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, osById } = useSelector(
    (state: RootState) => state.os
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OSType>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchOSByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && osById) {
      reset(osById)
    }
  }, [osById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetOsState())
      navigate("/admin/os/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: OSType) => {
    if (isEditMode && id) {
      dispatch(updateOS(data))
    } else {
      dispatch(addOS(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} OS</h1>
        <Breadcrumb
          menu="Master"
          title="OS"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{isEditMode ? "Edit OS" : "Add OS"}</h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">OS</label>
                <input
                  className="form-control"
                  {...register("OS", { required: true })}
                  placeholder="OS"
                />
                {errors.OS && (
                  <div className="text-danger mt-1">OS is required</div>
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

export default OSFormComponent
