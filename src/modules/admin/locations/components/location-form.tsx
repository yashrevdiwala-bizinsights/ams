import { useEffect } from "react"
import { Modal } from "antd"

import { InputField, Label, TextArea } from "@/modules/components/form-field"
import { useForm } from "react-hook-form"

interface LocationFormProps {
  open: boolean
  editLocation: LocationType | null
  onSave: (product: LocationType) => void
  onClose: () => void
}

export const LocationForm = ({
  open,
  editLocation,
  onClose,
  onSave,
}: LocationFormProps) => {
  const { control, setValue, reset, handleSubmit } = useForm<LocationType>({
    defaultValues: {
      gateNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      status: false,
    },
  })

  useEffect(() => {
    if (editLocation) {
      setValue("gateNumber", editLocation.gateNumber)
      setValue("address1", editLocation.address1)
      setValue("address2", editLocation.address2)
      setValue("city", editLocation.city)
      setValue("state", editLocation.state)
      setValue("country", editLocation.country)
      setValue("zipCode", editLocation.zipCode)
      setValue("status", editLocation.status)
    } else {
      reset()
    }
  }, [editLocation, setValue, reset])

  const onSubmit = (data: LocationType) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal
      centered
      open={open}
      okText={editLocation ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editLocation ? "Update Product Category" : "Add Product Category"}
      </h2>

      <form>
        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Gate No.</Label>
            <InputField
              control={control}
              name="gateNumber"
              placeholder="Gate No."
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Address Line 1</Label>
            <TextArea
              control={control}
              name="address1"
              placeholder="Address Line 1"
            />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Address Line 2</Label>
            <TextArea
              control={control}
              name="address2"
              placeholder="Address Line 2"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>City</Label>
            <InputField control={control} name="city" placeholder="City" />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>State</Label>
            <InputField control={control} name="state" placeholder="State" />
          </div>
        </div>

        <div className="row">
          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Country</Label>
            <InputField
              control={control}
              name="country"
              placeholder="Country"
            />
          </div>

          <div className="col-6" style={{ marginBottom: 16 }}>
            <Label>Zip Code</Label>
            <InputField
              control={control}
              name="zipCode"
              placeholder="Zip Code"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
