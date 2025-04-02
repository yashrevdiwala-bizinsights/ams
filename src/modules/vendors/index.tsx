import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { ExcelDownload } from "@/modules//components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { vendorData } from "./components/vendor-data"
import { VendorForm } from "./components/vendor-form"
import { Search } from "../components/search"
import { DeleteModal } from "../components/delete-modal"

const Vendors = () => {
  useDocumentTitle("Vendors - AMS")

  const navigate = useNavigate()
  const [vendors, setVendors] = useState<VendorsType[]>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedVendor, setSelectedVendor] = useState<VendorsType | null>(null)

  useEffect(() => {
    setVendors(vendorData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && vendors) {
      const filteredVendors = vendors.filter(
        (vendor) =>
          vendor.vendorName?.toLowerCase().includes(value.toLowerCase()) ||
          vendor.email?.toLowerCase().includes(value.toLowerCase()) ||
          vendor.contactPerson?.toLowerCase().includes(value.toLowerCase())
      )

      setVendors(filteredVendors)
    } else {
      setVendors(vendorData)
    }
  }

  const handleEdit = (vendor: VendorsType) => {
    setSelectedVendor(vendor)
    setModalVisible(true)
  }

  const handleUpdate = (vendor: VendorsType) => {
    if (selectedVendor) {
      console.log("Updating vendor", vendor)

      setVendors((prevVendors) => {
        if (!prevVendors) return []

        return prevVendors.map((v) => (v.id === vendor.id ? vendor : v))
      })
    } else {
      setVendors((prevVendors) => (prevVendors ?? []).concat(vendor))
    }
  }

  const handleModalClose = () => {
    setSelectedVendor(null)
    setModalVisible(false)
  }

  const handleDelete = (vendorId: number) => {
    setVendors(vendors && vendors.filter((vendor) => vendor.id !== vendorId))
  }

  const columns: ColumnsType<VendorsType> = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    { title: "GSTIN No.", dataIndex: "gstNumber", key: "gstNumber" },
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
      render: (_, vendorData) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/vendors/view/${vendorData.id}`)}
          />

          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEdit(vendorData)}
          />

          <FormButton
            variant="text"
            icon={<Trash />}
            color="danger"
            onClick={() => {
              setSelectedVendor(vendorData)
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
        <h1>Vendors</h1>
        <Breadcrumb menu="Master" active="Vendors" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedVendor}
        handleDelete={handleDelete}
        onClose={() => setSelectedVendor(null)}
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
          Add Vendor
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {vendors && vendors.length > 0 && (
            <ExcelDownload data={vendors} sheetName="vendors" />
          )}
          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={vendors}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      <VendorForm
        open={modalVisible}
        editVendor={selectedVendor}
        onSave={handleUpdate}
        onClose={handleModalClose}
      />
    </main>
  )
}
export default Vendors
