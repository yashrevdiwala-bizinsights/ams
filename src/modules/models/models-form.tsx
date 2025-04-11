import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Models, Manufacturer, SubCat1 } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addModels,
  fetchModelsByID,
  resetModelsState,
  updateModels,
} from "@/redux/slice/modelsSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchSubcat1 } from "@/redux/slice/subcat1Slice"
import { fetchManufacturer } from "@/redux/slice/manufacturerSlice"

export const ModelsFormComponent = () => {
  useDocumentTitle("Models Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, modelsById } = useSelector(
    (state: RootState) => state.models
  )

  const fetchSubcat1List = useSelector(
    (state: RootState) => state.subcat1.data ?? []
  )

  const fetchManufacturerList = useSelector(
    (state: RootState) => state.manufacturer.data ?? []
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Models>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchModelsByID(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  //   useEffect(() => {
  //     if (isEditMode && modelsById) {
  //       reset(modelsById)
  //     }
  //   }, [modelsById, reset, isEditMode])

  useEffect(() => {
    dispatch(fetchSubcat1({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchManufacturer({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    if (isEditMode && modelsById) {
      reset({
        ...modelsById,
        category:
          typeof modelsById.category === "object"
            ? modelsById.category.id
            : modelsById.category,
        make:
          typeof modelsById.make === "object"
            ? modelsById.make.id
            : modelsById.make,
      })
    }
  }, [modelsById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetModelsState())
      navigate("/admin/models/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: Models) => {
    if (isEditMode && id) {
      dispatch(updateModels(data))
    } else {
      dispatch(addModels(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Models</h1>
        <Breadcrumb
          menu="Master"
          title="Models"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Models" : "Add Models"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Models</label>
                <input
                  className="form-control"
                  {...register("model", { required: true })}
                  placeholder="model"
                />
                {errors.model && (
                  <div className="text-danger mt-1">Model is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  {...register("category", { required: true })}
                >
                  <option value="">Select SubCat1</option>
                  {fetchSubcat1List?.map((item: SubCat1) => (
                    <option key={item.id} value={item.subCat1}>
                      {item.subCat1}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="text-danger mt-1">SubCat1 is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Make</label>
                <select
                  className="form-select"
                  {...register("make", { required: true })}
                >
                  <option value="">Select Make</option>
                  {fetchManufacturerList?.map((item: Manufacturer) => (
                    <option key={item.id} value={item.manfact}>
                      {item.manfact}
                    </option>
                  ))}
                </select>
                {errors.make && (
                  <div className="text-danger mt-1">Make is required</div>
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

export default ModelsFormComponent
