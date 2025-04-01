import { Modal } from "antd"

interface Identifiable {
  id: number
}

interface DeleteModalProps<T> {
  data: (T & Identifiable) | null
  open: boolean
  onClose: () => void
  handleDelete: (id: number) => void
}

export const DeleteModal = <T,>({
  open,
  data,
  onClose,
  handleDelete,
}: DeleteModalProps<T>) => {
  if (!data) {
    onClose()
    return null
  }

  const onDelete = () => {
    handleDelete(data.id)
    onClose()
  }

  return (
    <Modal
      open={open}
      centered
      title="Delete"
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
      onCancel={onClose}
      onClose={onClose}
      onOk={onDelete}
    >
      <p>Are you sure you want to delete current selection?</p>
    </Modal>
  )
}
