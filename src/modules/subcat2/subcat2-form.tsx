import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { SubCat2 } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addSubcat2,
  fetchSubcat2ByID,
  resetSubcat2State,
  updateSubcat2,
} from "@/redux/slice/subcat2Slice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchSubcat1 } from "@/redux/slice/subcat1Slice"

export const SubCat2FormComponent = () => {
  useDocumentTitle("Subcat2 Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, subcat2ById } = useSelector(
    (state: RootState) => state.subcat2
  )

  // const fetchSubcat1List = useSelector(
  //   (state: RootState) => state.subcat1.data ?? []
  // )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCat2>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchSubcat2ByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && subcat2ById) {
      reset(subcat2ById)
    }
  }, [subcat2ById, reset, isEditMode])

  useEffect(() => {
    dispatch(fetchSubcat1({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  // useEffect(() => {
  //   if (isEditMode && subcat2ById) {
  //     reset({
  //       ...subcat2ById,
  //       subCat1:
  //         typeof subcat2ById.subCat1 === "object"
  //           ? subcat2ById.subCat1.id
  //           : subcat2ById.subCat1,
  //     })
  //   }
  // }, [subcat2ById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetSubcat2State())
      navigate("/admin/subcat2/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: SubCat2) => {
    if (isEditMode && id) {
      dispatch(updateSubcat2(data))
    } else {
      dispatch(addSubcat2(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Subcat2</h1>
        <Breadcrumb
          menu="Master"
          title="Subcat2"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Subcat2" : "Add Subcat2"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
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
                <label className="form-label">Subcat2</label>
                <input
                  className="form-control"
                  {...register("subCat2", { required: true })}
                  placeholder="subCat2"
                />
                {errors.subCat2 && (
                  <div className="text-danger mt-1">Subcat2 is required</div>
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

export default SubCat2FormComponent
