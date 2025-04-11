import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { SubCat2, SubCat3 } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addSubcat3,
  fetchSubcat3ByID,
  resetSubcat3State,
  updateSubcat3,
} from "@/redux/slice/subcat3Slice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchSubcat2 } from "@/redux/slice/subcat2Slice"

export const SubCat3FormComponent = () => {
  useDocumentTitle("Subcat3 Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, subcat3ById } = useSelector(
    (state: RootState) => state.subcat3
  )

  // const fetchSubcat1List = useSelector(
  //   (state: RootState) => state.subcat1.data ?? []
  // )

  const fetchSubcat2List = useSelector(
    (state: RootState) => state.subcat2.data ?? []
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCat3>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchSubcat3ByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

    // useEffect(() => {
    //   if (isEditMode && subcat3ById) {
    //     reset(subcat3ById)
    //   }
    // }, [subcat3ById, reset, isEditMode])

  useEffect(() => {
    dispatch(fetchSubcat2({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    if (isEditMode && subcat3ById) {
      reset({
        ...subcat3ById,
        subCat2:
          typeof subcat3ById.subCat2 === "object"
            ? subcat3ById.subCat2.id
            : subcat3ById.subCat2,
      })
    }
  }, [subcat3ById, reset, isEditMode])  

  useEffect(() => {
    if (success) {
      dispatch(resetSubcat3State())
      navigate("/admin/subcat3/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: SubCat3) => {
    if (isEditMode && id) {
      dispatch(updateSubcat3(data))
    } else {
      dispatch(addSubcat3(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Subcat3</h1>
        <Breadcrumb
          menu="Master"
          title="Subcat3"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Subcat3" : "Add Subcat3"}
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
                <label className="form-label">SubCat2</label>
                <select
                  className="form-select"
                  {...register("subCat2", { required: true })}
                >
                  <option value="">Select SubCat2</option>
                  {fetchSubcat2List?.map((item: SubCat2) => (
                    <option key={item.id} value={item.subCat2}>
                      {item.subCat2}
                    </option>
                  ))}
                </select>
                {errors.subCat2 && (
                  <div className="text-danger mt-1">SubCat2 is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Subcat3</label>
                <input
                  className="form-control"
                  {...register("subCat3", { required: true })}
                  placeholder="subCat3"
                />
                {errors.subCat3 && (
                  <div className="text-danger mt-1">Subcat3 is required</div>
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

export default SubCat3FormComponent
