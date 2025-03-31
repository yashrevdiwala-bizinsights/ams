import { useEffect } from "react"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import {
  Label,
  InputField,
  TextArea,
  InputSelect,
} from "@/modules/components/form-field"
import { productsTypeData } from "@/modules/admin/product-type/components/product-type"
import { productsCategoryData } from "@/modules/admin/product-category/components/product-category"

export interface ProductFormProps {
  open: boolean
  editProduct: Products | null
  onSave: (product: Products) => void
  onClose: () => void
}

export const ProductForm = ({
  open,
  editProduct,
  onSave,
  onClose,
}: ProductFormProps) => {
  const { control, setValue, reset, handleSubmit } = useForm<Products>({
    defaultValues: {
      productName: "",
      productType: "",
      productImage: "",
      productCategory: "",
      manufacturer: "",
      description: "",
    },
  })

  useEffect(() => {
    if (editProduct) {
      setValue("productName", editProduct.productName)
      setValue("productType", editProduct.productType)
      setValue("productImage", editProduct.productImage)
      setValue("productCategory", editProduct.productCategory)
      setValue("manufacturer", editProduct.manufacturer)
      setValue("description", editProduct.description)
    } else {
      reset()
    }
  }, [editProduct, setValue, reset])

  const onSubmit = (data: Products) => {
    if (editProduct) {
      onSave({ ...editProduct, ...data })
      onClose()
    } else {
      onSave(data)
      onClose()
    }
  }

  return (
    <Modal
      open={open}
      okText={editProduct ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Name</Label>
          <InputField control={control} name="productName" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Type</Label>
          <InputSelect
            placeholder="Select Product Type"
            options={productsTypeData.map((product) => ({
              label: product.productType,
              value: product.id.toString(),
            }))}
            name="productType"
            control={control}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Category</Label>
          <InputSelect
            placeholder="Select Product Type"
            options={productsCategoryData.map((product) => ({
              label: product.productCategory,
              value: product.id.toString(),
            }))}
            name="productCategory"
            control={control}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Manufacturer</Label>
          <InputField control={control} name="manufacturer" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Description</Label>
          <TextArea control={control} name="description" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Image</Label>
          <InputField control={control} name="productImage" />
        </div>
      </form>
    </Modal>
  )
}

export default ProductForm
