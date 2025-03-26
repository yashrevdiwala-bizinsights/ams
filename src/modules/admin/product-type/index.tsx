import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Avatar, Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { FormButton } from "@/modules/components/form-field"
import { ProductTypeForm } from "./components/product-type-form"
import { productsTypeData } from "./components/product-type"

const Product = () => {
  useDocumentTitle("Products - AMS")

  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductType[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  )

  useEffect(() => {
    setProducts(productsTypeData)
  }, [])

  const handleEditClick = (product: ProductType) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleDelete = (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(
        products && products.filter((product) => product.id !== productId)
      )
    }
  }

  const handleSaveUser = (product: ProductType) => {
    if (selectedProduct) {
      setProducts(
        (prevproducts) =>
          prevproducts &&
          prevproducts.map((u) => (u.id === product.id ? product : u))
      )
    } else {
      setProducts((prevproducts) => prevproducts && [...prevproducts, product])
    }
  }

  const columns: ColumnsType<ProductType> = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left" },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (productImage: string) => <Avatar src={productImage} />,
    },
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Product Type", dataIndex: "productType", key: "productType" },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
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
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/products/view/${productType.id}`)}
          />
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
        <h1>Products</h1>
        <Breadcrumb menu="Master" active="Products" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setShowModal(true)}
        >
          Add Product
        </FormButton>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      {showModal && (
        <ProductTypeForm
          key={selectedProduct ? selectedProduct.id : "new"}
          open={showModal}
          onClose={handleModalClose}
          onSave={handleSaveUser}
          editProductType={selectedProduct}
        />
      )}
    </main>
  )
}

export default Product
