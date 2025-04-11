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
import { deleteModels, fetchModels } from "@/redux/slice/modelsSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Models } from "@/types"

const ModelsPage = () => {
  useDocumentTitle("Models - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredModels, setFilteredModels] = useState<Models[] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedModels, setSelectedModels] = useState<Models | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.models
  )

  useEffect(() => {
    dispatch(fetchModels({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredModels(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter(
        (x: { models: string; category: string; make: string }) =>
          x.models?.toLowerCase().includes(value.toLowerCase()) ||
          x.category?.toLowerCase().includes(value.toLowerCase()) ||
          x.make?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredModels(filtered)
    } else {
      setFilteredModels(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteModels(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchModels({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredModels?.filter((x) => x.id !== id) || []
        setFilteredModels(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }

  const columns: ColumnsType<Models> = [
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
      title: "Models",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Major Category",
      dataIndex: "majorCategory",
      key: "majorCategory",
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
            onClick={() => navigate(`/admin/models/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/models/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedModels(item)
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
        <h1>Models</h1>
        <Breadcrumb menu="Master" active="Models" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedModels}
        handleDelete={() => {
          if (selectedModels?.id) {
            handleDelete(selectedModels.id)
            setShowDeleteModal(false)
            setFilteredModels(null)
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
          onClick={() => navigate("/admin/models/add")}
        >
          Add Models
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredModels && filteredModels.length > 0 && (
            <ExcelDownload data={filteredModels} sheetName="Models" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredModels || []}
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

export default ModelsPage
