import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Avatar, Switch, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import moment from "moment"
import { Eye, Pencil, Plus, Trash } from "lucide-react"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { DeleteModal } from "@/modules/components/delete-modal"
import { ExcelDownload } from "@/modules/components/excel-download"
import { FormButton } from "@/modules/components/form-field"
import { Search } from "@/modules/components/search"
import UserForm from "./components/form"
import { usersData } from "./components/users"

const User = () => {
  useDocumentTitle("Users - AMS")

  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    setUsers(usersData)
  }, [])

  const handleSearch = (value: string) => {
    if (value && users) {
      const filteredUsers = users.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(value.toLowerCase()) ||
          user.email?.toLowerCase().includes(value.toLowerCase())
      )

      setUsers(filteredUsers)
    } else {
      setUsers(usersData)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDelete = (userId: number) => {
    setUsers(users && users.filter((user) => user.id !== userId))
  }

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      setUsers(
        (prevUsers) =>
          prevUsers && prevUsers.map((u) => (u.id === user.id ? user : u))
      )
    } else {
      setUsers((prevUsers) => prevUsers && [...prevUsers, user])
    }
  }

  const columns: ColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left" },
    {
      title: "Image",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (profilePic: string) => <Avatar src={profilePic} />,
    },
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Access Level", dataIndex: "accessLevel", key: "accessLevel" },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (lastLogin: string) => moment(lastLogin).format("lll"),
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
      render: (_, user: User) => (
        <div style={{ display: "flex", gap: 8 }}>
          <FormButton
            variant="text"
            icon={<Eye />}
            onClick={() => navigate(`/admin/users/view/${user.id}`)}
          />
          <FormButton
            variant="text"
            icon={<Pencil />}
            onClick={() => handleEditClick(user)}
          />
          <FormButton
            variant="text"
            color="danger"
            icon={<Trash />}
            onClick={() => {
              setSelectedUser(user)
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
        <h1>Users</h1>
        <Breadcrumb menu="Master" active="Users" />
      </div>

      <DeleteModal
        open={showDeleteModal}
        data={selectedUser}
        handleDelete={handleDelete}
        onClose={() => setSelectedUser(null)}
      />

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: 16 }}
      >
        <FormButton
          color="primary"
          icon={<Plus />}
          onClick={() => setShowModal(true)}
        >
          Add User
        </FormButton>

        <div className="d-flex align-items-center gap-2">
          {users && users.length > 0 && (
            <ExcelDownload data={users} sheetName="users" />
          )}

          <Search handleSearch={handleSearch} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} entries`,
        }}
      />

      <UserForm
        key={selectedUser ? selectedUser.id : "new"}
        open={showModal}
        onClose={handleModalClose}
        onSave={handleSaveUser}
        editUser={selectedUser}
      />
    </main>
  )
}

export default User
