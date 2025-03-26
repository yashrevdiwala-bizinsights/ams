import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { FormButton } from "@/modules/components/form-field"
import { vendorData } from "./components/vendor-data"
import { VendorForm } from "./components/vendor-form"

const Vendors = () => {
  useDocumentTitle("Vendors - AMS")

  const navigate = useNavigate()
  const [vendors, setVendors] = useState<VendorsType[]>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedVendor, setSelectedVendor] = useState<VendorsType | null>(null)

  useEffect(() => {
    setVendors(vendorData)
  }, [])

  const handleEdit = (vendor: VendorsType) => {
    setSelectedVendor(vendor)
    setModalVisible(true)
  }

  const handleUpdate = (vendor: VendorsType) => {
    if (selectedVendor) {
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

  const handleRemove = (vendorId: number) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors(
        (prevVendors) =>
          prevVendors && prevVendors.filter((v) => v.id !== vendorId)
      )
    }
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
            onClick={() => handleRemove(vendorData.id)}
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

      <div style={{ marginBottom: 16 }}>
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setModalVisible(true)}
        >
          Add Vendor
        </FormButton>
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
