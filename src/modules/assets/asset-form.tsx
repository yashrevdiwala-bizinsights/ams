import { useEffect } from "react"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import moment from "moment"

import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import {
  InputDate,
  InputField,
  InputSelect,
  Label,
  TextArea,
} from "@/modules/components/form-field"
import { productsData } from "@/modules/products/components/products"
import { vendorData } from "@/modules/vendors/components/vendor-data"
import { assetData } from "./components/asset-data"

const AssetForm = () => {
  const { id } = useParams()

  const editAsset = id ? assetData.find((a) => a.id === Number(id)) : null

  const { control, setValue, reset, handleSubmit } = useForm<AssetType>({
    defaultValues: {
      productId: "",
      vendorId: "",
      officeLocation: "",
      assetName: "",
      serialNumber: "",
      price: "",
      purchaseType: "Owned",
      purchaseDate: moment(),
      warrantyExpires: moment(),
      description: "",
    },
  })

  useEffect(() => {
    if (editAsset) {
      setValue("productId", editAsset.productId)
      setValue("vendorId", editAsset.vendorId)
      setValue("officeLocation", editAsset.officeLocation)
      setValue("assetName", editAsset.assetName)
      setValue("serialNumber", editAsset.serialNumber)
      setValue("price", editAsset.price)
      setValue("purchaseType", editAsset.purchaseType)
      setValue("purchaseDate", editAsset.purchaseDate)
      setValue("warrantyExpires", editAsset.warrantyExpires)
      setValue("description", editAsset.description)
    } else {
      reset()
    }
  }, [editAsset, setValue, reset])

  const onSubmit = (data: AssetType) => {
    console.log(data)
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>{editAsset ? "Edit" : "Add new"} Asset</h1>
        <Breadcrumb
          menu="Master"
          title="Assets"
          active={editAsset ? "Edit" : "Add"}
        />
      </div>

      <BackButton />

      <div className="card info-card">
        <div className="card-body">
          <h5 className="card-title">
            {editAsset ? "Edit Asset" : "Add Asset"}
          </h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Product</Label>
                <InputSelect
                  placeholder="Select Product"
                  options={productsData.map((product) => ({
                    label: product.productName,
                    value: product.id.toString(),
                  }))}
                  name="productId"
                  control={control}
                />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Vendor</Label>
                <InputSelect
                  placeholder="Select Vendor"
                  options={vendorData.map((product) => ({
                    label: product.vendorName,
                    value: product.id.toString(),
                  }))}
                  name="vendorId"
                  control={control}
                />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Office Location</Label>
                <InputSelect
                  placeholder="Select Office Location"
                  options={[
                    { label: "Banglore", value: "1" },
                    { label: "Surat", value: "2" },
                  ]}
                  name="officeLocation"
                  control={control}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Asset Name</Label>
                <InputField name="assetName" control={control} />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Serial No.</Label>
                <InputField name="serialNumber" control={control} />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Price</Label>
                <InputField name="price" control={control} />
              </div>
            </div>

            <div className="row">
              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Purchase Type</Label>
                <InputSelect
                  placeholder="Purchase Type"
                  options={[
                    { label: "Owned", value: "Owned" },
                    { label: "Rented", value: "Rented" },
                  ]}
                  name="purchaseType"
                  control={control}
                />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Purchase Date</Label>
                <InputDate name="purchaseDate" control={control} />
              </div>

              <div className="col-4" style={{ marginBottom: 16 }}>
                <Label>Warranty Expiry Date</Label>
                <InputDate name="warrantyExpires" control={control} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Label>Description</Label>
              <TextArea name="description" control={control} />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AssetForm
