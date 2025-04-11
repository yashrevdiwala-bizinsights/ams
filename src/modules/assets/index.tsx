import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { Search } from "../components/search"
import { DeleteModal } from "../components/delete-modal"

import { useDispatch, useSelector } from "react-redux"
import { deleteAsset, fetchAsset } from "@/redux/slice/assetSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Assets } from "@/types"

const AssetsPage = () => {
  useDocumentTitle("Assets - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredAssets, setFilteredAssets] = useState<Assets[] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedAsset, setSelectedAsset] = useState<Assets | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const {
    data: assets,
    loading,
    total,
  } = useSelector(
    (state: RootState) =>
      state.asset as {
        data: Assets[] | null
        loading: boolean
        total: number
      }
  )

  useEffect(() => {
    dispatch(fetchAsset({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredAssets(assets)
  }, [assets])

  const handleSearch = (value: string) => {
    if (value && assets) {
      const filtered = assets.filter(
        (asset) =>
          asset.assetId?.toLowerCase().includes(value.toLowerCase()) ||
          asset.manufacturer?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredAssets(filtered)
    } else {
      setFilteredAssets(assets)
    }
  }

  const handleDelete = (assetId: number) => {
    dispatch(deleteAsset(assetId))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchAsset({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated =
          filteredAssets?.filter((asset) => asset.id !== assetId) || []
        setFilteredAssets(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }

  const columns: ColumnsType<Assets> = [
    { title: "Asset ID", dataIndex: "assetId", key: "assetId" },
    {
      title: "Fixed Asset No.",
      dataIndex: "fixedAssetNo",
      key: "fixedAssetNo",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) =>
        [record.subCat1, record.subCat2, record.subCat3]
          .filter(Boolean)
          .join(" / "),
    },
    {
      title: "Description",
      key: "description",
      render: (_, record) =>
        [record.descr, record.model, record.OS].filter(Boolean).join(", "),
    },
    { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
    {
      title: "Status / Serial No",
      key: "statusSerial",
      render: (_, record) =>
        [record.status, record.sr].filter(Boolean).join(", "),
    },
    {
      title: "Physical RFID",
      dataIndex: "physicalRfid",
      key: "physicalRfid",
    },
    {
      title: "Assign Info",
      key: "assignInfo",
      render: (_, record) =>
        [record.assignType, record.assignBasis].filter(Boolean).join(", "),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) =>
        [record.location, record.subLocation].filter(Boolean).join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, asset) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/assets/view/${asset.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/assets/edit/${asset.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedAsset(asset)
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
        <h1>Assets</h1>
        <Breadcrumb menu="Master" active="Assets" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedAsset}
        handleDelete={() => {
          if (selectedAsset?.id) {
            handleDelete(selectedAsset.id)
            setShowDeleteModal(false)
            setSelectedAsset(null)
          }
        }}
        onClose={() => setShowDeleteModal(false)}
      />

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
          {filteredAssets && filteredAssets.length > 0 && (
            <ExcelDownload data={filteredAssets} sheetName="Assets" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredAssets || []}
        rowKey="assetID"
        pagination={{
          current: page,
          pageSize: limit,
          total: total || 0,
          showSizeChanger: true,
          onChange: (newPage, newPageSize) => {
            setPage(newPage)
            setLimit(newPageSize)
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
        scroll={{ x: 1500 }}
      />
    </main>
  )
}

export default AssetsPage
