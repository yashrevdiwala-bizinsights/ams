import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { LocationType } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addLocation,
  fetchLocationById,
  resetLocationState,
  updateLocation,
} from "@/redux/slice/locationSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"

export const LocationComponent = () => {
  useDocumentTitle("Location Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, locationById } = useSelector(
    (state: RootState) => state.location
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationType>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchLocationById(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && locationById) {
      reset(locationById)
    }
  }, [locationById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetLocationState())
      navigate("/admin/locations/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: LocationType) => {
    if (isEditMode && id) {
      dispatch(updateLocation(data))
    } else {
      dispatch(addLocation(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Location</h1>
        <Breadcrumb
          menu="Master"
          title="Locations"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Location" : "Add Location"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  className="form-control"
                  {...register("location", { required: true })}
                  placeholder="Location"
                />
                {errors.location && (
                  <div className="text-danger mt-1">Location is required</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Location Code</label>
                <input
                  className="form-control"
                  {...register("locationCode", { required: true })}
                  placeholder="Location Code"
                />
                {errors.locationCode && (
                  <div className="text-danger mt-1">
                    Location Code is required
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("active")}
                    defaultChecked={locationById?.active}
                  />
                  <label className="form-check-label">Active / Inactive</label>
                </div>
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

export default LocationComponent
