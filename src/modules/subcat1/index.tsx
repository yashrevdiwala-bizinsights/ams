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
import { deleteSubcat1, fetchSubcat1 } from "@/redux/slice/subcat1Slice"
import type { RootState, AppDispatch } from "@/redux/store"
import { SubCat1 } from "@/types"

const Subcat1Page = () => {
  useDocumentTitle("Subcat1 - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredSubcat1, setFilteredSubcat1] = useState<SubCat1[] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedSubcat1, setSelectedSubcat1] = useState<SubCat1 | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.subcat1
  )

  useEffect(() => {
    dispatch(fetchSubcat1({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredSubcat1(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter(
        (x: { subCat1: string; abbr: string }) =>
          x.subCat1?.toLowerCase().includes(value.toLowerCase()) ||
          x.abbr?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSubcat1(filtered)
    } else {
      setFilteredSubcat1(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteSubcat1(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchSubcat1({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredSubcat1?.filter((x) => x.id !== id) || []
        setFilteredSubcat1(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }
  const columns: ColumnsType<SubCat1> = [
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
      title: "Abbr",
      dataIndex: "abbr",
      key: "abbr",
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
            onClick={() => navigate(`/admin/subcat1/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/subcat1/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedSubcat1(item)
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
        <h1>Subcat1</h1>
        <Breadcrumb menu="Master" active="Subcat1" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedSubcat1}
        handleDelete={() => {
          if (selectedSubcat1?.id) {
            handleDelete(selectedSubcat1.id)
            setShowDeleteModal(false)
            setSelectedSubcat1(null)
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
          onClick={() => navigate("/admin/subcat1/add")}
        >
          Add Subcat1
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredSubcat1 && filteredSubcat1.length > 0 && (
            <ExcelDownload data={filteredSubcat1} sheetName="Subcat1" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredSubcat1 || []}
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

export default Subcat1Page
