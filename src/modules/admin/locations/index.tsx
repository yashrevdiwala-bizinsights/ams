import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { Search } from "@/modules/components/search"
import { DeleteModal } from "@/modules/components/delete-modal"

import { useDispatch, useSelector } from "react-redux"
import { deleteLocation, fetchLocation } from "@/redux/slice/locationSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { LocationType } from "@/types"

const LocationPage = () => {
  useDocumentTitle("Locations - AMS")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredLocations, setFilteredLocations] = useState<
    LocationType[] | null
  >(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  )
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, loading, total } = useSelector(
    (state: RootState) => state.location
  )

  useEffect(() => {
    dispatch(fetchLocation({ page, limit, search: "" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    setFilteredLocations(data)
  }, [data])

  const handleSearch = (value: string) => {
    if (value && data) {
      const filtered = data.filter((x: { location: string }) =>
        x.location?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(data)
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteLocation(id))
      .unwrap()
      .then(() => {
        // Option 1: Just refetch everything to be safe
        dispatch(fetchLocation({ page, limit, search: "" }))

        // Option 2: Or manually remove it from local state if you prefer
        const updated = filteredLocations?.filter((x) => x.id !== id) || []
        setFilteredLocations(updated)
      })
      .catch((err) => {
        console.error("Delete failed:", err)
      })
  }
  const columns: ColumnsType<LocationType> = [
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
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Location Code",
      dataIndex: "locationCode",
      key: "locationCode",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => <Switch defaultChecked={active} />,
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
            onClick={() => navigate(`/admin/locations/view/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => navigate(`/admin/locations/edit/${item.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedLocation(item)
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
        <h1>Locations</h1>
        <Breadcrumb menu="Master" active="Locations" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedLocation}
        handleDelete={() => {
          if (selectedLocation?.id) {
            handleDelete(selectedLocation.id)
            setShowDeleteModal(false)
            setSelectedLocation(null)
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
          onClick={() => navigate("/admin/locations/add")}
        >
          Add Location
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {filteredLocations && filteredLocations.length > 0 && (
            <ExcelDownload data={filteredLocations} sheetName="Location" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={filteredLocations || []}
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

export default LocationPage
