import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { Search } from "@/modules/components/search"
import { DeleteModal } from "@/modules/components/delete-modal"

import { useDispatch, useSelector } from "react-redux"
import {
  deleteManufacturer,
  fetchManufacturer,
} from "@/redux/slice/manufacturerSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Manufacturer } from "@/types"

const ManufacturerPage = () => {
  useDocumentTitle("Manufacturer - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredManufacturer, setFilteredManufacturer] = useState<
    Manufacturer[] | null
  >(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.manufacturer
  )

  useEffect(() => {
    dispatch(fetchManufacturer({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredManufacturer(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter(
        (x: { manfact: string; subCat1: string }) =>
          x.manfact?.toLowerCase().includes(value.toLowerCase()) ||
          x.subCat1?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredManufacturer(filtered)
    } else {
      setFilteredManufacturer(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteManufacturer(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchManufacturer({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredManufacturer?.filter((x) => x.id !== id) || []
        setFilteredManufacturer(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }

  const columns: ColumnsType<Manufacturer> = [
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
      title: "Manufacturer",
      dataIndex: "manfact",
      key: "manfact",
    },
    {
      title: "MajorCat",
      dataIndex: "majorCat",
      key: "majorCat",
    },
    {
      title: "SubCat1",
      dataIndex: "subCat1",
      key: "subCat1",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, item) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/manufacturer/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/manufacturer/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedManufacturer(item)
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
        <h1>Manufacturer</h1>
        <Breadcrumb menu="Master" active="Manufacturer" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedManufacturer}
        handleDelete={() => {
          if (selectedManufacturer?.id) {
            handleDelete(selectedManufacturer.id)
            setShowDeleteModal(false)
            setSelectedManufacturer(null)
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
          onClick={() => navigate("/admin/manufacturer/add")}
        >
          Add Manufacturer
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredManufacturer && filteredManufacturer.length > 0 && (
            <ExcelDownload
              data={filteredManufacturer}
              sheetName="Manufacturer"
            />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredManufacturer || []}
        rowKey="id"
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

export default ManufacturerPage
