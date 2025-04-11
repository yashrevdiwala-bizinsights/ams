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
import { deleteProcessor, fetchProcessor } from "@/redux/slice/processorSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Processor } from "@/types"

const ProcessorPage = () => {
  useDocumentTitle("Processor - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredProcessor, setFilteredProcessor] = useState<
    Processor[] | null
  >(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedProcessor, setSelectedProcessor] = useState<Processor | null>(
    null
  )
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.processor
  )

  useEffect(() => {
    dispatch(fetchProcessor({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredProcessor(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter((x: { processor: string }) =>
        x.processor?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredProcessor(filtered)
    } else {
      setFilteredProcessor(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteProcessor(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchProcessor({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredProcessor?.filter((x) => x.id !== id) || []
        setFilteredProcessor(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }
  const columns: ColumnsType<Processor> = [
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
      title: "Processor",
      dataIndex: "processor",
      key: "processor",
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
            onClick={() => navigate(`/admin/processor/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/processor/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedProcessor(item)
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
        <h1>Processor</h1>
        <Breadcrumb menu="Master" active="Processor" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedProcessor}
        handleDelete={() => {
          if (selectedProcessor?.id) {
            handleDelete(selectedProcessor.id)
            setShowDeleteModal(false)
            setFilteredProcessor(null)
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
          onClick={() => navigate("/admin/processor/add")}
        >
          Add Processor
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredProcessor && filteredProcessor.length > 0 && (
            <ExcelDownload data={filteredProcessor} sheetName="Processor" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredProcessor || []}
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

export default ProcessorPage
