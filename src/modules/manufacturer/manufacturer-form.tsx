import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Manufacturer, SubCat1 } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addManufacturer,
  fetchManufacturerByID,
  resetManufacturerState,
  updateManufacturer,
} from "@/redux/slice/manufacturerSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchSubcat1 } from "@/redux/slice/subcat1Slice"

export const ManufacturerFormComponent = () => {
  useDocumentTitle("Manufacturer Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, manufacturerById } = useSelector(
    (state: RootState) => state.manufacturer
  )

  const fetchSubcat1List = useSelector(
    (state: RootState) => state.subcat1.data ?? []
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Manufacturer>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchManufacturerByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  //   useEffect(() => {
  //     if (isEditMode && manufacturerById) {
  //       reset(manufacturerById)
  //     }
  //   }, [manufacturerById, reset, isEditMode])

  useEffect(() => {
    dispatch(fetchSubcat1({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    if (isEditMode && manufacturerById) {
      reset({
        ...manufacturerById,
        subCat1:
          typeof manufacturerById.subCat1 === "object"
            ? manufacturerById.subCat1.id
            : manufacturerById.subCat1,
      })
    }
  }, [manufacturerById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetManufacturerState())
      navigate("/admin/manufacturer/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: Manufacturer) => {
    if (isEditMode && id) {
      dispatch(updateManufacturer(data))
    } else {
      dispatch(addManufacturer(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Manufacturer</h1>
        <Breadcrumb
          menu="Master"
          title="Manufacturer"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Manufacturer" : "Add Manufacturer"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Manufacturer</label>
                <input
                  className="form-control"
                  {...register("manfact", { required: true })}
                  placeholder="manfact"
                />
                {errors.manfact && (
                  <div className="text-danger mt-1">
                    Manufacturer is required
                  </div>
                )}
              </div>
            </div>

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
                <label className="form-label">SubCat1</label>
                <select
                  className="form-select"
                  {...register("subCat1", { required: true })}
                >
                  <option value="">Select SubCat1</option>
                  {fetchSubcat1List?.map((item: SubCat1) => (
                    <option key={item.id} value={item.subCat1}>
                      {item.subCat1}
                    </option>
                  ))}
                </select>
                {errors.subCat1 && (
                  <div className="text-danger mt-1">SubCat1 is required</div>
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

export default ManufacturerFormComponent
