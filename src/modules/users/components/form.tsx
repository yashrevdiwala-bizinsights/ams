import React, { useEffect } from "react"
import { Modal, Switch } from "antd"
import { useForm, Controller } from "react-hook-form"
import {
  Label,
  InputField,
  InputDate,
  FormButton,
} from "@/modules/components/form-field"
import moment from "moment"
// Shared User interface (id is required)
export interface User {
  id: number
  profilePic?: string
  fullName?: string
  email?: string
  designation?: string
  accessLevel?: string
  lastLogin?: string
  isActive?: boolean
}

// Form values type for react-hook-form
interface FormValues {
  fullName: string
  email: string
  profilePic: string
  designation: string
  accessLevel: string
  lastLogin: moment.Moment | null
  isActive: boolean
}

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
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      profilePic: "",
      designation: "",
      accessLevel: "",
      lastLogin: "",
      isActive: false,
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
        isActive: editData.isActive || false,
      })
    } else {
      reset({
        fullName: "",
        email: "",
        profilePic: "",
        designation: "",
        accessLevel: "",
        lastLogin: "",
        isActive: false,
      })
    }
  }, [editData, reset])

  const onSubmit = (values: FormValues) => {
    const userToSave: User = {
      ...values,
      // Use the existing id if editing; otherwise generate one.
      id: editData?.id || Date.now(),
      // Convert the moment object from DatePicker back to an ISO string.
      lastLogin: values.lastLogin
        ? values.lastLogin.format("YYYY-MM-DD")
        : undefined,
    }
    onSave(userToSave)
    onClose()
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
        <div style={{ marginBottom: 16 }}>
          <Label>Active?</Label>
          <Controller
            control={control}
            name="isActive"
            defaultValue={false}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
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
