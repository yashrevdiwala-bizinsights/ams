import { useNavigate } from "react-router" // ADD THIS
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  AssetForm,
  SubCat1,
  LocationType,
  Manufacturer,
  Models,
  SubLocation,
} from "@/types"
import { Breadcrumb } from "../components/breadcrumb"
import { BackButton } from "../components/back-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import {
  addAsset,
  fetchAssetById,
  resetAssetState,
  updateAsset,
} from "@/redux/slice/assetSlice"
import { FormButton } from "../components/form-field"
import { useParams } from "react-router"
import moment from "moment"
import useDocumentTitle from "@/lib/useDocumentTitle"
import { Toaster } from "sonner"
import { fetchManufacturer } from "@/redux/slice/manufacturerSlice"
import { fetchSubcat1 } from "@/redux/slice/subcat1Slice"
import { fetchLocation } from "@/redux/slice/locationSlice"
import { fetchSubLocation } from "@/redux/slice/sublocationSlice"
import { fetchModels } from "@/redux/slice/modelsSlice"

// interface AssetFormProps {
//   open: boolean
//   onSave: (asset: AssetForm) => void
//   onClose: () => void
// }

export const AssetFormComponent = () => {
  useDocumentTitle("Asset Form - AMS")
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()
  const [formatted, setFormatted] = useState<AssetForm | null>(null)
  const { loading, success, error, assetById } = useSelector(
    (state: RootState) => state.asset
  )

  const fetchSubCat1List = useSelector(
    (state: RootState) => state.subcat1.data ?? []
  )

  const fetchLocationList = useSelector(
    (state: RootState) => state.location.data ?? []
  )

  const fetchSubLocationList = useSelector(
    (state: RootState) => state.sublocation.data ?? []
  )

  const fetchManufacturerList = useSelector(
    (state: RootState) => state.manufacturer.data ?? []
  )

  const fetchModelList = useSelector(
    (state: RootState) => state.models.data ?? []
  )

  useEffect(() => {
    dispatch(fetchSubcat1({ page: 1, limit: 100, search: "" }))
    dispatch(fetchLocation({ page: 1, limit: 100, search: "" }))
    dispatch(fetchSubLocation({ page: 1, limit: 100, search: "" }))
    dispatch(fetchManufacturer({ page: 1, limit: 100, search: "" }))
    dispatch(fetchModels({ page: 1, limit: 100, search: "" }))
  }, [dispatch])

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAssetById(Number(id)))
    }
  }, [dispatch, id, isEditMode])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetForm>()

  useEffect(() => {
    if (isEditMode && assetById) {
      const formatDate = (
        date?: string | Date | moment.Moment | null
      ): string => (date ? moment(date).format("YYYY-MM-DD") : "")
      const formattedAsset: AssetForm = {
        ...assetById,
        AMCStart: formatDate(assetById.AMCStart),
        AMCEnd: formatDate(assetById.AMCEnd),
        warrantyStart: formatDate(assetById.warrantyStart),
        warrantyEnd: formatDate(assetById.warrantyEnd),
        returnDate: formatDate(assetById.returnDate),
        workCenter:
          typeof assetById.workCenter === "object"
            ? assetById.workCenter.id
            : assetById.workCenter,
        subCat1:
          typeof assetById.subCat1 === "object" && assetById.subCat1 !== null
            ? assetById.subCat1.id
            : assetById.subCat1,
        location:
          typeof assetById.location === "object" && assetById.location !== null
            ? assetById.location.id
            : assetById.location,
        subLocation:
          typeof assetById.subLocation === "object" &&
          assetById.subLocation !== null
            ? assetById.subLocation.id
            : assetById.subLocation,
        manufacturer:
          typeof assetById.manufacturer === "object" &&
          assetById.manufacturer !== null
            ? assetById.manufacturer.id
            : assetById.manufacturer,
        model:
          typeof assetById.model === "object" && assetById.model !== null
            ? assetById.model.id
            : assetById.model,
      }
      console.log("assetid:", assetById)

      reset(formattedAsset)
      console.log(formattedAsset)

      setFormatted(formattedAsset)
    }
  }, [assetById, reset, isEditMode])

  useEffect(() => {
    if (success) {
      dispatch(resetAssetState())
      navigate("/admin/assets/")
    }
  }, [success, dispatch, navigate])

  const onSubmit = (data: AssetForm) => {
    const payload = {
      id: Number(id),
      newData: { ...data },
    }

    if (isEditMode && id) {
      dispatch(updateAsset(payload))
    } else {
      dispatch(addAsset(data))
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 className="h3">{isEditMode ? "Edit" : "Add New"} Asset</h1>
        <Breadcrumb
          menu="Master"
          title="Assets"
          active={isEditMode ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">
            {isEditMode ? "Edit Asset" : "Add Asset"}
          </h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section: Basic Information */}
            <section className="mb-4">
              <h4 className="mb-3">Basic Information</h4>
              <div className="row g-3">
                {[
                  { name: "assetId", label: "Asset ID", required: true },
                  {
                    name: "fixedAssetNo",
                    label: "Fixed Asset No",
                    required: true,
                  },
                  { name: "descr", label: "Description", required: true },
                  { name: "status", label: "Status", required: true },
                  { name: "assignType", label: "Assign Type" },
                ].map(({ name, label, required }) => (
                  <div className="col-md-6 col-lg-4" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      className="form-control"
                      {...register(name as keyof AssetForm, { required })}
                      placeholder={label}
                    />
                    {errors[name as keyof AssetForm] && (
                      <div className="text-danger mt-1">
                        {label} is required
                      </div>
                    )}
                  </div>
                ))}
                {/*WorkCenter*/}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">WorkCenter</label>
                  <select
                    className="form-control"
                    {...register("workCenter", { required: true })}
                  >
                    <option value="">Select WorkCenter</option>
                    {fetchLocationList.map((item: LocationType) => (
                      <option key={item.id} value={item.locationCode}>
                        {item.locationCode}
                      </option>
                    ))}
                  </select>
                  {errors.workCenter && (
                    <div className="text-danger mt-1">Location is required</div>
                  )}
                </div>

                {/* SubCat1 */}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">Sub Category 1</label>
                  <select
                    className="form-control"
                    {...register("subCat1", { required: true })}
                  >
                    <option value="">Select Sub Category</option>
                    {fetchSubCat1List.map((item: SubCat1) => (
                      <option key={item.id} value={item.subCat1}>
                        {item.subCat1}
                      </option>
                    ))}
                  </select>
                  {errors.subCat1 && (
                    <div className="text-danger mt-1">
                      Sub Category 1 is required
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">Location</label>
                  <select
                    className="form-control"
                    {...register("location", { required: true })}
                  >
                    <option value="">Select Location</option>
                    {fetchLocationList.map((item: LocationType) => (
                      <option key={item.id} value={item.location}>
                        {item.location}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <div className="text-danger mt-1">Location is required</div>
                  )}
                </div>

                {/* Sub Location */}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">Sub Location</label>
                  <select className="form-control" {...register("subLocation")}>
                    <option value="">Select Sub Location</option>
                    {fetchSubLocationList.map((item: SubLocation) => (
                      <option key={item.id} value={item.subLocation}>
                        {item.subLocation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Section: System Specifications */}
            <section className="mb-4">
              <h4 className="mb-3">System Specifications</h4>
              <div className="row g-3">
                {[
                  { name: "PONo", label: "PO No" },
                  { name: "sr", label: "Serial Number" },
                  { name: "ram", label: "RAM" },
                  { name: "hdd", label: "HDD" },
                  { name: "rfid", label: "RFID" },
                  { name: "physicalRfid", label: "Physical RFID" },
                  { name: "host", label: "Host" },
                  { name: "serviceTag", label: "Service Tag" },
                  { name: "OS", label: "Operating System" },
                  { name: "cpuSpeed", label: "CPU Speed" },
                ].map(({ name, label }) => (
                  <div className="col-md-6 col-lg-4" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      className="form-control"
                      {...register(name as keyof AssetForm)}
                      placeholder={label}
                    />
                    {errors[name as keyof AssetForm] && (
                      <div className="text-danger mt-1">
                        {label} is required
                      </div>
                    )}
                  </div>
                ))}

                {/* Manufacturer */}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">Manufacturer</label>
                  <select
                    className="form-control"
                    {...register("manufacturer", { required: true })}
                  >
                    <option value="">Select Manufacturer</option>
                    {fetchManufacturerList.map((item: Manufacturer) => (
                      <option key={item.id} value={item.manfact}>
                        {item.manfact}
                      </option>
                    ))}
                  </select>
                  {errors.manufacturer && (
                    <div className="text-danger mt-1">
                      Manufacturer is required
                    </div>
                  )}
                </div>

                {/* Model */}
                <div className="col-md-6 col-lg-4">
                  <label className="form-label">Model</label>
                  <select
                    className="form-control"
                    {...register("model", { required: true })}
                  >
                    <option value="">Select Model</option>
                    {fetchModelList.map((item: Models) => (
                      <option key={item.id} value={item.model}>
                        {item.model}
                      </option>
                    ))}
                  </select>
                  {errors.model && (
                    <div className="text-danger mt-1">Model is required</div>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Dates */}
            <section className="mb-4">
              <h4 className="mb-3">Important Dates</h4>
              <div className="row g-3">
                {[
                  { name: "AMCStart", label: "AMC Start" },
                  { name: "AMCEnd", label: "AMC End" },
                  { name: "warrantyStart", label: "Warranty Start" },
                  { name: "warrantyEnd", label: "Warranty End" },
                  { name: "returnDate", label: "Return Date" },
                ].map(({ name, label }) => (
                  <div className="col-md-6 col-lg-4" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type="date"
                      className="form-control"
                      {...register(name as keyof AssetForm)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Remarks */}
            <section className="mb-4">
              <h4 className="mb-3">Remarks</h4>
              <div className="mb-3">
                <label className="form-label">Verification Remarks</label>
                <input
                  className="form-control"
                  {...register("phVerRemarks")}
                  placeholder="Remarks"
                />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3">
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

export default AssetFormComponent
