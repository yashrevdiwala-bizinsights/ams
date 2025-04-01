import { Controller } from "react-hook-form"
import { Button, DatePicker, Input, Select, Slider } from "antd"
import { BaseButtonProps } from "antd/es/button/button"
import { Eye, EyeOff } from "lucide-react"

interface FormLabelProps {
  children: React.ReactNode
  [key: string]: unknown
}

interface FormInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  defaultValue?: string | boolean
  options?: { label: string; value: string }[]
  [key: string]: unknown
}

interface FormButtonProps extends BaseButtonProps {
  htmlType?: "submit" | "reset" | "button"
  color?:
    | "default"
    | "primary"
    | "danger"
    | "blue"
    | "purple"
    | "cyan"
    | "green"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "volcano"
    | "geekblue"
    | "lime"
    | "gold"
  variant?: "solid" | "dashed" | "link" | "text" | "outlined" | "filled"
  children?: React.ReactNode
  onClick?: () => void
  [key: string]: unknown
}

export const Label = ({ children, ...props }: FormLabelProps) => (
  <label {...props}>{children}</label>
)

export const InputField = ({
  control,
  name,
  defaultValue,
  ...props
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    {...props}
    defaultValue={defaultValue || ""}
    render={({ field }) => <Input size="large" {...field} {...props} />}
  />
)

export const Password = ({
  control,
  defaultValue,
  ...props
}: FormInputProps) => (
  <Controller
    control={control}
    {...props}
    defaultValue={defaultValue || ""}
    render={({ field }) => (
      <Input.Password
        size="large"
        iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
        {...field}
        {...props}
      />
    )}
  />
)

export const TextArea = ({
  control,
  defaultValue,
  ...props
}: FormInputProps) => (
  <Controller
    control={control}
    {...props}
    defaultValue={
      typeof defaultValue === "boolean" ? defaultValue.toString() : defaultValue
    }
    render={({ field }) => (
      <Input.TextArea
        autoSize={{
          minRows: 3,
        }}
        {...field}
        {...props}
      />
    )}
  />
)

export const InputDate = ({
  control,
  defaultValue,
  ...props
}: FormInputProps) => (
  <Controller
    control={control}
    {...props}
    defaultValue={defaultValue || ""}
    render={({ field }) => (
      <DatePicker
        size="large"
        style={{
          width: "100%",
        }}
        format={"DD-MM-YYYY"}
        {...field}
        {...props}
      />
    )}
  />
)

export const InputSlider = ({
  control,
  defaultValue,
  ...props
}: FormInputProps) => (
  <Controller
    control={control}
    {...props}
    defaultValue={defaultValue || ""}
    render={({ field }) => {
      const { value, ...rest } = field
      return (
        <Slider
          range
          {...rest}
          value={Array.isArray(value) ? value : [0, 0]}
          {...props}
        />
      )
    }}
  />
)

export const InputSelect = ({
  control,
  defaultValue,
  options,
  ...props
}: FormInputProps) => (
  <Controller
    control={control}
    {...props}
    render={({ field }) => (
      <Select
        defaultValue={defaultValue || ""}
        size="large"
        style={{
          width: "100%",
        }}
        options={options}
        {...field}
        {...props}
      />
    )}
  />
)

export const FormButton = ({
  htmlType,
  color,
  variant,
  children,
  onClick,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      htmlType={htmlType}
      onClick={onClick}
      color={color || "primary"}
      variant={variant || "solid"}
      {...props}
    >
      {children}
    </Button>
  )
}
