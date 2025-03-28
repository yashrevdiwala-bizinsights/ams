import { useEffect, useState } from "react"
import { Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { FormButton } from "@/modules/components/form-field"
import { ProductTypeForm } from "./components/product-type-form"
import { productsTypeData } from "./components/product-type"

const ProductType = () => {
  useDocumentTitle("Product Types - AMS")

  const [productTypes, setProductTypes] = useState<ProductType[]>()
  const [modalVisible, setModalmodalVisible] = useState<boolean>(false)
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType | null>(null)

  useEffect(() => {
    setProductTypes(productsTypeData)
  }, [])

  const handleEditClick = (product: ProductType) => {
    setSelectedProductType(product)
    setModalmodalVisible(true)
  }

  const handleModalClose = () => {
    setModalmodalVisible(false)
    setSelectedProductType(null)
  }

  const handleDelete = (productTypeId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductTypes(
        productTypes && productTypes.filter((type) => type.id !== productTypeId)
      )
    }
  }

  const handleSaveUser = (product: ProductType) => {
    if (selectedProductType) {
      setProductTypes(
        (prevProductTypes) =>
          prevProductTypes &&
          prevProductTypes.map((u) => (u.id === product.id ? product : u))
      )
    } else {
      setProductTypes(
        (prevProductTypes) => prevProductTypes && [...prevProductTypes, product]
      )
    }
  }

  const columns: ColumnsType<ProductType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (_v, _r, i) => <p>{i + 1}</p>,
    },
    { title: "Product Type", dataIndex: "productType", key: "productType" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => <Switch defaultChecked={status} />,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, productType) => (
        <div style={{ display: "flex", gap: 8 }}>
          {/* <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/products/view/${productType.id}`)}
          /> */}
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEditClick(productType)}
          />
          <FormButton
            variant="text"
            color="danger"
            icon={<Trash />}
            onClick={() => handleDelete(productType.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Product Types</h1>
        <Breadcrumb menu="Master" active="Product Types" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setModalmodalVisible(true)}
        >
          Add Product Type
        </FormButton>
      </div>

      <Table
        columns={columns}
        dataSource={productTypes}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      <ProductTypeForm
        open={modalVisible}
        onClose={handleModalClose}
        onSave={handleSaveUser}
        editProductType={selectedProductType}
      />
    </main>
  )
}

export default ProductType
