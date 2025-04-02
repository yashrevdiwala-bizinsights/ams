import { useEffect, useState } from "react"
import { Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { FormButton } from "@/modules/components/form-field"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { LocationForm } from "./components/location-form"
import { locationData } from "./components/location"
import { useNavigate } from "react-router"
import { Search } from "@/modules/components/search"
import { DeleteModal } from "@/modules/components/delete-modal"

const Location = () => {
  useDocumentTitle("Locations - AMS")

  const navigate = useNavigate()
  const [location, setLocation] = useState<LocationType[]>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  )

  useEffect(() => {
    setLocation(locationData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && location) {
      const filteredUsers = location.filter(
        (location) =>
          location.address1?.toLowerCase().includes(value.toLowerCase()) ||
          location.address2?.toLowerCase().includes(value.toLowerCase())
      )

      setLocation(filteredUsers)
    } else {
      setLocation(locationData)
    }
  }

  const handleEdit = (location: LocationType) => {
    setSelectedLocation(location)
    setModalVisible(true)
  }

  const handleUpdate = (location: LocationType) => {
    if (selectedLocation) {
      setLocation((prevLocation) => {
        if (!prevLocation) return []

        return prevLocation.map((l) => (l.id === location.id ? location : l))
      })
    } else {
      setLocation((prevLocation) => (prevLocation ?? []).concat(location))
    }
  }

  const handleModalClose = () => {
    setSelectedLocation(null)
    setModalVisible(false)
  }

  const handleDelete = (locationId: number) => {
    setLocation(
      location &&
        location.filter((location: LocationType) => location.id !== locationId)
    )
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
      title: "Gate No.",
      dataIndex: "gateNumber",
      key: "gateNumber",
    },
    {
      title: "Address",
      dataIndex: "address1",
      key: "address1",
      render: (_address1, locationData) => (
        <p>{locationData.address1 + ", " + locationData.address2}</p>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
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
      render: (_, locationData) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() =>
              navigate(`/admin/admin-users/locations/view/${locationData.id}`)
            }
          />

          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEdit(locationData)}
          />

          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedLocation(locationData)
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
        handleDelete={handleDelete}
        onClose={() => setSelectedLocation(null)}
      />

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: 16 }}
      >
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setModalVisible(true)}
        >
          Add Location
        </FormButton>
        <div className="d-flex align-items-center gap-2">
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={location}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      <LocationForm
        open={modalVisible}
        editLocation={selectedLocation}
        onSave={handleUpdate}
        onClose={handleModalClose}
      />
    </main>
  )
}
export default Location
