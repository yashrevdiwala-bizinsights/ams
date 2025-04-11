import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { SubCat1 } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addSubcat1,
  fetchSubcat1ByID,
  resetSubcat1State,
  updateSubcat1,
} from "@/redux/slice/subcat1Slice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"

export const SubCat1FormComponent = () => {
  useDocumentTitle("Subcat1 Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, subcat1ById } = useSelector(
    (state: RootState) => state.subcat1
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCat1>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchSubcat1ByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && subcat1ById) {
      reset(subcat1ById)
    }
  }, [subcat1ById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetSubcat1State())
      navigate("/admin/subcat1/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: SubCat1) => {
    if (isEditMode && id) {
      dispatch(updateSubcat1(data))
    } else {
      dispatch(addSubcat1(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Subcat1</h1>
        <Breadcrumb
          menu="Master"
          title="Subcat1"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Subcat1" : "Add Subcat1"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">MajorCat</label>
                <input
                  className="form-control"
                  {...register("majorCat", { required: true })}
                  placeholder="majorCat"
                />
                {errors.majorCat && (
                  <div className="text-danger mt-1">MajorCat is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Subcat1</label>
                <input
                  className="form-control"
                  {...register("subCat1", { required: true })}
                  placeholder="subCat1"
                />
                {errors.subCat1 && (
                  <div className="text-danger mt-1">Subcat1 is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Abbr</label>
                <input
                  className="form-control"
                  {...register("abbr", { required: true })}
                  placeholder="abbr"
                />
                {errors.abbr && (
                  <div className="text-danger mt-1">Abbr is required</div>
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

export default SubCat1FormComponent
