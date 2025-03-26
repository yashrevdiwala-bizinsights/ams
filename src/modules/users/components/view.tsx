import React from "react";
import { Modal, Descriptions } from "antd";
import { User } from "./form"; // Import the shared User interface

interface UserViewProps {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}

const UserView: React.FC<UserViewProps> = ({ visible, onClose, user }) => {
  return (
    <Modal
      title="View User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {user ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {user.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Profile Picture">
            <img src={user.profilePic} alt={user.fullName} width={80} />
          </Descriptions.Item>
          <Descriptions.Item label="Designation">
            {user.designation}
          </Descriptions.Item>
          <Descriptions.Item label="Access Level">
            {user.accessLevel}
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {user.lastLogin}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {user.isActive ? "Active" : "Inactive"}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        "No user details available."
      )}
    </Modal>
  );
};

export default UserView;
