import { Button, DatePicker, Input, Select, Slider } from "antd"
import { Eye, EyeOff } from "lucide-react"
import { Controller } from "react-hook-form"

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

interface FormButtonProps {
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
  children: React.ReactNode
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
    render={({ field }) => <Input.TextArea {...field} {...props} autoSize />}
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
}: FormButtonProps) => {
  return (
    <Button
      htmlType={htmlType}
      color={color || "default"}
      variant={variant || "solid"}
    >
      {children}
    </Button>
  )
}
