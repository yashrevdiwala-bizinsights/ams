import React, { useEffect } from "react"
import { Modal } from "antd"
import { useForm } from "react-hook-form"
import moment from "moment"

import {
  Label,
  InputField,
  InputDate,
  FormButton,
} from "@/modules/components/form-field"

export interface UserFormProps {
  visible: boolean
  onClose: () => void
  onSave: (user: User) => void
  editData?: User | null
}

const UserForm: React.FC<UserFormProps> = ({
  visible,
  onClose,
  onSave,
  editData,
}) => {
  const { control, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      fullName: "",
      email: "",
      profilePic: "",
      designation: "",
      accessLevel: "",
      lastLogin: "",
    },
  })

  // When editData is provided, pre-fill the form.
  useEffect(() => {
    if (editData) {
      reset({
        fullName: editData.fullName || "",
        email: editData.email || "",
        profilePic: editData.profilePic || "",
        designation: editData.designation || "",
        accessLevel: editData.accessLevel || "",
        lastLogin: editData.lastLogin ? moment(editData.lastLogin) : undefined,
      })
    } else {
      reset({
        fullName: "",
        email: "",
        profilePic: "",
        designation: "",
        accessLevel: "",
        lastLogin: "",
      })
    }
  }, [editData, reset])

  const onSubmit = (values: User) => {
    if (editData) {
      onSave({ ...editData, ...values })
      onClose()
    } else {
      onSave(values)
      onClose()
    }
  }

  return (
    <Modal
      title={editData ? "Update User" : "Add New User"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div style={{ display: "flex", gap: 10 }}>
          <FormButton htmlType="button" onClick={onClose}>
            Cancel
          </FormButton>
          <FormButton htmlType="submit" color="primary" variant="solid">
            {editData ? "Update" : "Add"}
          </FormButton>
        </div>
      </form>
    </Modal>
  )
}

export default UserForm
