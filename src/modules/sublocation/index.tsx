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
  deleteSubLocation,
  fetchSubLocation,
} from "@/redux/slice/sublocationSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { SubLocation } from "@/types"

const SubLocationPage = () => {
  useDocumentTitle("SubLocations - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredSubLocations, setFilteredSubLocations] = useState<
    SubLocation[] | null
  >(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedSubLocation, setSelectedSubLocation] =
    useState<SubLocation | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.sublocation
  )

  useEffect(() => {
    dispatch(fetchSubLocation({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredSubLocations(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter(
        (x: { workCenter: string; location: string; subLocation: string }) =>
          x.subLocation?.toLowerCase().includes(value.toLowerCase()) ||
          x.workCenter?.toLowerCase().includes(value.toLowerCase()) ||
          x.location?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSubLocations(filtered)
    } else {
      setFilteredSubLocations(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteSubLocation(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchSubLocation({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredSubLocations?.filter((x) => x.id !== id) || []
        setFilteredSubLocations(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }

  const columns: ColumnsType<SubLocation> = [
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
      title: "WorkCneter",
      dataIndex: "workCenter",
      key: "workCenter",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "SubLocation",
      dataIndex: "subLocation",
      key: "subLocation",
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
            onClick={() => navigate(`/admin/sublocations/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/sublocations/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedSubLocation(item)
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
        <h1>SubLocations</h1>
        <Breadcrumb menu="Master" active="SubLocations" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedSubLocation}
        handleDelete={() => {
          if (selectedSubLocation?.id) {
            handleDelete(selectedSubLocation.id)
            setShowDeleteModal(false)
            setSelectedSubLocation(null)
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
          onClick={() => navigate("/admin/sublocations/add")}
        >
          Add SubLocation
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredSubLocations && filteredSubLocations.length > 0 && (
            <ExcelDownload
              data={filteredSubLocations}
              sheetName="SubLocation"
            />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredSubLocations || []}
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

export default SubLocationPage
