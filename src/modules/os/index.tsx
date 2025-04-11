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
import { deleteOS, fetchOS } from "@/redux/slice/osSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { OSType } from "@/types"

const OSPage = () => {
  useDocumentTitle("OS - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredOS, setFilteredOS] = useState<OSType[] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedOS, setSelectedOS] = useState<OSType | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector((state: RootState) => state.os)

  useEffect(() => {
    dispatch(fetchOS({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredOS(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter((x: { OS: string }) =>
        x.OS?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredOS(filtered)
    } else {
      setFilteredOS(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteOS(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchOS({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredOS?.filter((x) => x.id !== id) || []
        setFilteredOS(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }
  const columns: ColumnsType<OSType> = [
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
      title: "OS",
      dataIndex: "OS",
      key: "OS",
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
            onClick={() => navigate(`/admin/os/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/os/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedOS(item)
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
        <h1>OS</h1>
        <Breadcrumb menu="Master" active="OS" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedOS}
        handleDelete={() => {
          if (selectedOS?.id) {
            handleDelete(selectedOS.id)
            setShowDeleteModal(false)
            setSelectedOS(null)
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
          onClick={() => navigate("/admin/os/add")}
        >
          Add OS
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredOS && filteredOS.length > 0 && (
            <ExcelDownload data={filteredOS} sheetName="OS" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredOS || []}
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

export default OSPage
