import { useForm } from "react-hook-form"
import { Modal } from "antd"

import { InputField, Label, TextArea } from "@/modules/components/form-field"
import { useEffect } from "react"

interface VendorFormProps {
  open: boolean
  editVendor: VendorsType | null
  onSave: (vendor: VendorsType) => void
  onClose: () => void
}

export const VendorForm = ({
  open,
  editVendor,
  onSave,
  onClose,
}: VendorFormProps) => {
  const { control, setValue, reset, handleSubmit } = useForm<VendorsType>({
    defaultValues: {
      vendorName: "",
      email: "",
      contactNumber: "",
      contactPerson: "",
      designation: "",
      gstNumber: "",
      add1: "",
      add2: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      desc: "",
    },
  })

  useEffect(() => {
    if (editVendor) {
      setValue("vendorName", editVendor.vendorName)
      setValue("email", editVendor.email)
      setValue("contactNumber", editVendor.contactNumber)
      setValue("contactPerson", editVendor.contactPerson)
      setValue("gstNumber", editVendor.gstNumber)
      setValue("designation", editVendor.designation)
      setValue("add1", editVendor.add1)
      setValue("add2", editVendor.add2)
      setValue("country", editVendor.country)
      setValue("state", editVendor.state)
      setValue("city", editVendor.city)
      setValue("zipCode", editVendor.zipCode)
      setValue("desc", editVendor.desc)
    } else {
      reset()
    }
  }, [editVendor, setValue, reset])

  const onSubmit = (data: VendorsType) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal
      open={open}
      okText={editVendor ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editVendor ? "Edit Vendor" : "Add Vendor"}
      </h2>

      <form>
        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Vendor Name</Label>
            <InputField name="vendorName" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Email</Label>
            <InputField name="email" control={control} />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Contact Number</Label>
            <InputField name="contactNumber" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Contact Person</Label>
            <InputField name="contactPerson" control={control} />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Designation</Label>
            <InputField name="designation" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>GSTIN No.</Label>
            <InputField name="gstNumber" control={control} />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Address Line 1</Label>
            <TextArea name="add1" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Address Line 2</Label>
            <TextArea name="add2" control={control} />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Country</Label>
            <InputField name="country" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>State</Label>
            <InputField name="state" control={control} />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>City</Label>
            <InputField name="city" control={control} />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Zip code</Label>
            <InputField name="zipCode" control={control} />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label>Description</Label>
          <TextArea name="desc" control={control} />
        </div>
      </form>
    </Modal>
  )
}
