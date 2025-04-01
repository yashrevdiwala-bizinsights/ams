import { useEffect, useState } from "react"
import { Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { FormButton } from "@/modules/components/form-field"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ProductCategoryForm } from "./components/product-category-form"
import { productsCategoryData } from "./components/product-category"
import { Search } from "@/modules/components/search"

const ProductCategory = () => {
  useDocumentTitle("Product Categories - AMS")

  const [productCategory, setProductCategory] = useState<ProductCategory[]>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedProductCat, setSelectedProductCat] =
    useState<ProductCategory | null>(null)

  useEffect(() => {
    setProductCategory(productsCategoryData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && productCategory) {
      const filteredUsers = productCategory.filter((productsCategory) =>
        productsCategory.productCategory
          ?.toLowerCase()
          .includes(value.toLowerCase())
      )

      setProductCategory(filteredUsers)
    } else {
      setProductCategory(productsCategoryData)
    }
  }

  const handleEdit = (productCat: ProductCategory) => {
    setSelectedProductCat(productCat)
    setModalVisible(true)
  }

  const handleUpdate = (productCat: ProductCategory) => {
    if (selectedProductCat) {
      setProductCategory((prevProductCat) => {
        if (!prevProductCat) return []

        return prevProductCat.map((p) =>
          p.id === productCat.id ? productCat : p
        )
      })
    } else {
      setProductCategory((prevProductCat) =>
        (prevProductCat ?? []).concat(productCat)
      )
    }
  }

  const handleModalClose = () => {
    setSelectedProductCat(null)
    setModalVisible(false)
  }

  const handleRemove = (locationId: number) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setProductCategory(
        (prevProductCat) =>
          prevProductCat && prevProductCat.filter((v) => v.id !== locationId)
      )
    }
  }

  const columns: ColumnsType<ProductCategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render(_value, _record, index) {
        return index + 1
      },
    },
    {
      title: "Category Name",
      dataIndex: "productCategory",
      key: "categoryName",
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
      render: (_, productsCategoryData) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEdit(productsCategoryData)}
          />

          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => handleRemove(productsCategoryData.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Product Categories</h1>
        <Breadcrumb menu="Master" active="Product Categories" />
      </div>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: 16 }}
      >
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setModalVisible(true)}
        >
          Add Product Category
        </FormButton>
        <div className="d-flex align-items-center gap-2">
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={productCategory}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      <ProductCategoryForm
        open={modalVisible}
        editProductCategory={selectedProductCat}
        onSave={handleUpdate}
        onClose={handleModalClose}
      />
    </main>
  )
}
export default ProductCategory
