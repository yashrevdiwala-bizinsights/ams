import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import { Breadcrumb } from "@/modules/components/breadcrumb"
import { FormButton } from "@/modules/components/form-field"
import { productsData } from "@/modules/products/components/products"
import { vendorData } from "@/modules/vendors/components/vendor-data"
import { assetData } from "./components/asset-data"

const Assets = () => {
  const navigate = useNavigate()
  const [assets, setAssets] = useState<AssetType[]>()

  useEffect(() => {
    setAssets(assetData)
  }, [])

  const columns: ColumnsType<AssetType> = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left" },
    { title: "Asset Name", dataIndex: "assetName", key: "assetName" },
    { title: "Serial No.", dataIndex: "serialNumber", key: "serialNumber" },
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (productId: string) => {
        const product = productsData.find((p) => p.id === Number(productId))
        return product?.productName
      },
    },
    {
      title: "Product Type",
      dataIndex: "productId",
      key: "productId",
      render: (productId: string) => {
        const product = productsData.find((p) => p.id === Number(productId))
        return product?.productType
      },
    },
    {
      title: "Product Category",
      dataIndex: "productId",
      key: "productId",
      render: (productId: string) => {
        const product = productsData.find((p) => p.id === Number(productId))
        return product?.productCategory
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendorId",
      key: "vendorId",
      render: (vendorId: string) => {
        const product = vendorData.find((p) => p.id === Number(vendorId))
        return product?.vendorName
      },
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
      render: (_, vendorData) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/assets/view/${vendorData.id}`)}
          />

          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/assets/edit/${vendorData.id}`)}
          />

          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            //   onClick={() => handleRemove(vendorData.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Assets</h1>
        <Breadcrumb menu="Master" active="Assets" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => navigate("/admin/assets/add")}
        >
          Add Asset
        </FormButton>
      </div>

      <Table
        columns={columns}
        dataSource={assets}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />
    </main>
  )
}
export default Assets
