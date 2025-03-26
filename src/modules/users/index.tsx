import React, { useState } from "react";
import { Plus, Eye, Pencil, Trash } from "lucide-react";
import { Avatar, Switch, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import useDocumentTitle from "@/lib/useDocumentTitle";
import { Breadcrumb } from "@/modules/components/breadcrumb";
import UserForm, { User } from "./components/form"; // Shared User interface is exported from here
import UserView from "./components/view"; // For viewing user details

const UserPage: React.FC = () => {
  useDocumentTitle("Users - AMS");

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      profilePic: "https://via.placeholder.com/40",
      fullName: "John Doe",
      email: "johndoe@example.com",
      designation: "Project Manager",
      accessLevel: "Full",
      lastLogin: "2024-03-01",
      isActive: true,
    },
    {
      id: 2,
      profilePic: "https://via.placeholder.com/40",
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      designation: "User",
      accessLevel: "Limited",
      lastLogin: "2024-02-28",
      isActive: false,
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleViewClose = () => {
    setViewModalVisible(false);
    setViewUser(null);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleView = (user: User) => {
    setViewUser(user);
    setViewModalVisible(true);
  };

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      // Update existing user.
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
    } else {
      // Add new user.
      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };

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
    { title: "Last Login", dataIndex: "lastLogin", key: "lastLogin" },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => <Switch checked={isActive} />,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, user: User) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button icon={<Eye />} onClick={() => handleView(user)} />
          <Button icon={<Pencil />} onClick={() => handleEditClick(user)} />
          <Button
            icon={<Trash />}
            danger
            onClick={() => handleDelete(user.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Users</h1>
        <Breadcrumb menu="Master" active="Users" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<Plus />}
          onClick={() => setShowModal(true)}
        >
          Add User
        </Button>
      </div>

      <Table columns={columns} dataSource={users} rowKey="id" />

      {/* Modal for Add/Edit */}
      {showModal && (
        // Using key forces remounting when switching between add and edit mode.
        <UserForm
          key={selectedUser ? selectedUser.id : "new"}
          visible={showModal}
          onClose={handleModalClose}
          onSave={handleSaveUser}
          editData={selectedUser}
        />
      )}

      {/* Modal for Viewing User Details */}
      {viewModalVisible && (
        <UserView
          visible={viewModalVisible}
          onClose={handleViewClose}
          user={viewUser}
        />
      )}
    </main>
  );
};

export default UserPage;
