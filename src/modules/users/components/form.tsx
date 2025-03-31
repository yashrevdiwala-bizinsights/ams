import { useEffect } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import moment from "moment";

import { Label, InputField, InputDate } from "@/modules/components/form-field";

export interface UserFormProps {
  open: boolean;
  editUser: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
}

export const UserForm = ({
  open,
  editUser,
  onSave,
  onClose,
}: UserFormProps) => {
  const { control, setValue, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      fullName: "",
      email: "",
      profilePic: "",
      designation: "",
      accessLevel: "",
      lastLogin: "",
    },
  });

  // When editUser is provided, pre-fill the form.
  useEffect(() => {
    if (editUser) {
      setValue("fullName", editUser.fullName);
      setValue("email", editUser.email);
      setValue("profilePic", editUser.profilePic);
      setValue("designation", editUser.designation);
      setValue("accessLevel", editUser.accessLevel);
      setValue(
        "lastLogin",
        editUser.lastLogin ? moment(editUser.lastLogin) : undefined
      );
    } else {
      reset();
    }
  }, [editUser, setValue, reset]);

  const onSubmit = (data: User) => {
    if (editUser) {
      onSave({ ...editUser, ...data });
      onClose();
    } else {
      onSave(data);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      okText={editUser ? "Update" : "Add"}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
    >
      <h2 className="fs-6 text-center fw-bold text-muted mb-2">
        {editUser ? "Edit User" : "Add User"}
      </h2>

      <form>
        <div style={{ marginBottom: 16 }}>
          <Label>Full Name</Label>
          <InputField control={control} name="fullName" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Email</Label>
          <InputField control={control} name="email" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Profile Picture URL</Label>
          <InputField control={control} name="profilePic" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Designation</Label>
          <InputField control={control} name="designation" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Access Level</Label>
          <InputField control={control} name="accessLevel" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>Last Login</Label>
          <InputDate control={control} name="lastLogin" />
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
