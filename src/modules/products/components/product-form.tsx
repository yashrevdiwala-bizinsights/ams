import { useEffect } from "react"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import { Label, InputField, TextArea } from "@/modules/components/form-field"

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
      //   status: false,
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
      //   setValue("status", editProduct.status)
    } else {
      reset()
    }
  }, [editProduct, setValue, reset])

  const onSubmit = (data: Products) => {
    onSave(data)
    onClose()
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
        {editProduct ? "Update Product" : "Add New Product"}
      </h2>

      <form>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Name</Label>
          <InputField control={control} name="productName" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Type</Label>
          {/* <InputSelect
            placeholder="Select Product Type"
            options={vendorData.map((product) => ({
              label: product.vendorName,
              value: product.id.toString(),
            }))}
            name="vendorId"
            control={control}
          /> */}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Product Category</Label>
          <InputField control={control} name="productCategory" />
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
        {/* <div style={{ marginBottom: 16 }}>
          <Label>Active?</Label>
          <Controller
            control={control}
            name="status"
            defaultValue={false}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        </div> */}
      </form>
    </Modal>
  )
}

export default ProductForm
