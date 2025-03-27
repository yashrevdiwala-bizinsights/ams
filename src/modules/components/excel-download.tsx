import { Workbook } from "exceljs"
import { Download } from "lucide-react"

import { FormButton } from "./form-field"

interface ExcelDownloadProps<T> {
  data: T[]
  sheetName?: string
}

export const ExcelDownload = <T,>({
  data,
  sheetName,
}: ExcelDownloadProps<T>) => {
  const handleDownload = async () => {
    const filename = (sheetName || "download") + ".xlsx"
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet(sheetName || "Sheet1")

    worksheet.columns = Object.keys(data[0] || {}).map((key) => ({
      header: key,
      key,
      width: 20,
    }))

    data.forEach((item) => {
      worksheet.addRow(item)
    })

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <FormButton icon={<Download />} variant="outlined" onClick={handleDownload}>
      Download {sheetName}
    </FormButton>
  )
}
