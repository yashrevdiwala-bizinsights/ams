import { useEffect } from "react"
import { Modal } from "antd"

import { InputField, Label } from "@/modules/components/form-field"
import { useForm } from "react-hook-form"

interface ProductCategoryFormProps {
  open: boolean
  editProductCategory: ProductCategory | null
  onSave: (product: ProductCategory) => void
  onClose: () => void
}

export const ProductCategoryForm = ({
  open,
  editProductCategory,
  onClose,
  onSave,
}: ProductCategoryFormProps) => {
  const { control, setValue, reset, handleSubmit } = useForm<ProductCategory>({
    defaultValues: {
      productCategory: "",
    },
  })

  useEffect(() => {
    if (editProductCategory) {
      setValue("productCategory", editProductCategory.productCategory)
    } else {
      reset()
    }
  }, [editProductCategory, setValue, reset])

  const onSubmit = (data: ProductCategory) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal
      centered
      open={open}
      okText={editProductCategory ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editProductCategory
          ? "Update Product Category"
          : "Add Product Category"}
      </h2>

      <form>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Category</Label>
          <InputField
            control={control}
            name="productCategory"
            placeholder="Product Category"
          />
        </div>
      </form>
    </Modal>
  )
}
