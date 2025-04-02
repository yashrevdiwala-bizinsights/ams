import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Avatar, Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { ProductForm } from "./components/product-form"
import { productsData } from "./components/products"
import { Search } from "../components/search"
import { DeleteModal } from "../components/delete-modal"

const Product = () => {
  useDocumentTitle("Products - AMS")

  const navigate = useNavigate()
  const [products, setProducts] = useState<Products[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null)

  useEffect(() => {
    setProducts(productsData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && products) {
      const filteredProducts = products.filter(
        (product) =>
          product.productName?.toLowerCase().includes(value.toLowerCase()) ||
          product.productType?.toLowerCase().includes(value.toLowerCase()) ||
          product.productCategory?.toLowerCase().includes(value.toLowerCase())
      )

      setProducts(filteredProducts)
    } else {
      setProducts(productsData)
    }
  }

  const handleEditClick = (product: Products) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleDelete = (productId: number) => {
    setProducts(
      products && products.filter((product) => product.id !== productId)
    )
  }

  const handleSaveUser = (product: Products) => {
    if (selectedProduct) {
      setProducts(
        (prevproducts) =>
          prevproducts &&
          prevproducts.map((p) => (p.id === product.id ? product : p))
      )
    } else {
      setProducts((prevproducts) => prevproducts && [...prevproducts, product])
    }
  }

  const columns: ColumnsType<Products> = [
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
      render: (_, product) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/products/view/${product.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEditClick(product)}
          />
          <FormButton
            variant="text"
            color="danger"
            icon={<Trash />}
            onClick={() => {
              setSelectedProduct(product)
              setShowDeleteModal(true)
            }}
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

      <DeleteModal
        open={showDeleteModal}
        data={selectedProduct}
        handleDelete={handleDelete}
        onClose={() => setSelectedProduct(null)}
      />

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: 16 }}
      >
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setShowModal(true)}
        >
          Add Product
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {products && products.length > 0 && (
            <ExcelDownload data={products} sheetName="products" />
          )}

          <Search handleSearch={handleSearch} />
        </div>
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
        <ProductForm
          key={selectedProduct ? selectedProduct.id : "new"}
          open={showModal}
          onClose={handleModalClose}
          onSave={handleSaveUser}
          editProduct={selectedProduct}
        />
      )}
    </main>
  )
}

export default Product
