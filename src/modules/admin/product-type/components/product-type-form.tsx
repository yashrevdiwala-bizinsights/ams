import { useEffect } from "react"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import { Label, InputField } from "@/modules/components/form-field"

export interface ProductTypeFormProps {
  open: boolean
  editProductType: ProductType | null
  onSave: (product: ProductType) => void
  onClose: () => void
}

export const ProductTypeForm = ({
  open,
  editProductType,
  onSave,
  onClose,
}: ProductTypeFormProps) => {
  const { control, setValue, reset, handleSubmit } = useForm<ProductType>({
    defaultValues: {
      productType: "",
    },
  })

  useEffect(() => {
    if (editProductType) {
      setValue("productType", editProductType.productType)
    } else {
      reset()
    }
  }, [editProductType, setValue, reset])

  const onSubmit = (data: ProductType) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal
      open={open}
      okText={editProductType ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editProductType ? "Update Product Type" : "Add Product Type"}
      </h2>

      <form>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Type</Label>
          <InputField control={control} name="productType" />
        </div>
      </form>
    </Modal>
  )
}

export default ProductTypeForm
