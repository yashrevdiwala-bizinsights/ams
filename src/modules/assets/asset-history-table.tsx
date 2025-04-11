// components/AssetHistoryTable.tsx
import { Assets } from "@/types"
import { Table } from "antd"

const AssetHistoryTable = ({ history }: { history: Assets[] }) => {
  const columns = [
    { title: "Asset ID", dataIndex: "assetId", key: "assetId" },
    {
      title: "Fixed Asset No.",
      dataIndex: "fixedAssetNo",
      key: "fixedAssetNo",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record: Assets) =>
        [record.subCat1, record.subCat2, record.subCat3]
          .filter(Boolean)
          .join(" / "),
    },
    {
      title: "Description",
      key: "description",
      render: (_, record: Assets) =>
        [record.descr, record.model, record.OS].filter(Boolean).join(", "),
    },
    { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
    {
      title: "Status / Serial No",
      key: "statusSerial",
      render: (_, record: Assets) =>
        [record.status, record.sr].filter(Boolean).join(", "),
    },
    {
      title: "Physical RFID",
      dataIndex: "physicalRfid",
      key: "physicalRfid",
    },
    {
      title: "Assign Info",
      key: "assignInfo",
      render: (_, record: Assets) =>
        [record.assignType, record.assignBasis].filter(Boolean).join(", "),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record: Assets) =>
        [record.location, record.subLocation].filter(Boolean).join(", "),
    },
  ]

  return (
    <div className="card info-card">
      <div className="card-body">
        <h5 className="card-title">Asset History</h5>
        <Table
          columns={columns}
          dataSource={history}
          rowKey="assetr_log_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  )
}

export default AssetHistoryTable
