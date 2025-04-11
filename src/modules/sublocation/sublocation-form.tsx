import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { LocationType, SubLocation } from "@/types"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { BackButton } from "@/modules/components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addSubLocation,
  fetchSubLocationById,
  resetSubLocationState,
  updateSubLocation,
} from "@/redux/slice/sublocationSlice"
import { FormButton } from "@/modules/components/form-field"
import { useParams } from "react-router"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchLocation } from "@/redux/slice/locationSlice"

export const SubLocationComponent = () => {
  useDocumentTitle("SubLocation Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)
  const { loading, success, error, sublocationById } = useSelector(
    (state: RootState) => state.sublocation
  )

  const fetchLocationList = useSelector(
    (state: RootState) => state.location.data ?? []
  )
  console.log("hello")

  console.log(fetchLocationList)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubLocation>()

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchSubLocationById(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  // useEffect(() => {
  //   if (isEditMode && sublocationById) {
  //     reset(sublocationById)
  //   }
  // }, [sublocationById, reset, isEditMode])

  useEffect(() => {
    dispatch(fetchLocation({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    if (isEditMode && sublocationById) {
      reset({
        ...sublocationById,
        location:
          typeof sublocationById.location === "object"
            ? sublocationById.location.id
            : sublocationById.location,
        workCenter:
          typeof sublocationById.workCenter === "object"
            ? sublocationById.workCenter.id
            : sublocationById.workCenter,
      })
    }
  }, [sublocationById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetSubLocationState())
      navigate("/admin/sublocations/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: SubLocation) => {
    if (isEditMode && id) {
      dispatch(updateSubLocation(data))
    } else {
      dispatch(addSubLocation(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} SubLocation</h1>
        <Breadcrumb
          menu="Master"
          title="SubLocations"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit SubLocation" : "Add SubLocation"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">WorkCenter</label>
                <select
                  className="form-select"
                  {...register("workCenter", { required: true })}
                >
                  <option value="">Select WorkCenter</option>
                  {fetchLocationList?.map((item: LocationType) => (
                    <option key={item.id} value={item.locationCode}>
                      {item.locationCode}
                    </option>
                  ))}
                </select>
                {errors.workCenter && (
                  <div className="text-danger mt-1">WorkCenter is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <select
                  className="form-select"
                  {...register("location", { required: true })}
                >
                  <option value="">Select Location</option>
                  {fetchLocationList?.map((item: LocationType) => (
                    <option key={item.id} value={item.location}>
                      {item.location}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <div className="text-danger mt-1">Location is required</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">SubLocation</label>
                <input
                  className="form-control"
                  {...register("subLocation", { required: true })}
                  placeholder="Sub Location"
                />
                {errors.subLocation && (
                  <div className="text-danger mt-1">
                    SubLocation is required
                  </div>
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

export default SubLocationComponent
