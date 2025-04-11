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
import { deleteSubcat2, fetchSubcat2 } from "@/redux/slice/subcat2Slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { SubCat2 } from "@/types"

const Subcat2Page = () => {
  useDocumentTitle("Subcat2 - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredSubcat2, setFilteredSubcat2] = useState<SubCat2[] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedSubcat2, setSelectedSubcat2] = useState<SubCat2 | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.subcat2
  )

  useEffect(() => {
    dispatch(fetchSubcat2({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredSubcat2(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter(
        (x: { subCat1: string; subCat2: string }) =>
          x.subCat2?.toLowerCase().includes(value.toLowerCase()) ||
          x.subCat1?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSubcat2(filtered)
    } else {
      setFilteredSubcat2(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteSubcat2(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchSubcat2({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredSubcat2?.filter((x) => x.id !== id) || []
        setFilteredSubcat2(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }
  const columns: ColumnsType<SubCat2> = [
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
      title: "SubCat1",
      dataIndex: "subCat1",
      key: "subCat1",
    },
    {
      title: "SubCat2",
      dataIndex: "subCat2",
      key: "subCat2",
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
            onClick={() => navigate(`/admin/subcat2/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/subcat2/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedSubcat2(item)
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
        <h1>Subcat2</h1>
        <Breadcrumb menu="Master" active="Subcat2" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedSubcat2}
        handleDelete={() => {
          if (selectedSubcat2?.id) {
            handleDelete(selectedSubcat2.id)
            setShowDeleteModal(false)
            setSelectedSubcat2(null)
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
          onClick={() => navigate("/admin/subcat2/add")}
        >
          Add Subcat2
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredSubcat2 && filteredSubcat2.length > 0 && (
            <ExcelDownload data={filteredSubcat2} sheetName="Subcat2" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredSubcat2 || []}
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

export default Subcat2Page
