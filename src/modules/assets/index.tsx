import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { productsData } from "@/modules/products/components/products"
import { vendorData } from "@/modules/vendors/components/vendor-data"
import { assetData } from "./components/asset-data"
import { Search } from "../components/search"

const Assets = () => {
  useDocumentTitle("Assets - AMS")

  const navigate = useNavigate()
  const [assets, setAssets] = useState<AssetType[]>()

  useEffect(() => {
    setAssets(assetData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && assets) {
      const filteredAssets = assets.filter(
        (asset) =>
          asset.assetName?.toLowerCase().includes(value.toLowerCase()) ||
          asset.vendorId?.toLowerCase().includes(value.toLowerCase())
      )

      setAssets(filteredAssets)
    } else {
      setAssets(assetData)
    }
  }

  const handleRemove = (id: number) => {
    const newAssets = assets?.filter((asset) => asset.id !== id)
    setAssets(newAssets)
  }

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
            onClick={() => handleRemove(vendorData.id)}
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

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: 16 }}
      >
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => navigate("/admin/assets/add")}
        >
          Add Asset
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {assets && assets.length > 0 && (
            <ExcelDownload data={assets} sheetName="assets" />
          )}

          <Search handleSearch={handleSearch} />
        </div>
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
