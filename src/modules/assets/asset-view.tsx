import { useParams } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Contact } from "lucide-react"
import moment from "moment"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { fetchAssetById } from "@/redux/slice/assetSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import AssetHistoryTable from "./asset-history-table"

const AssetView = () => {
  useDocumentTitle("Asset View - AMS")

  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const asset = useSelector((state: RootState) => state.asset.assetById)
  const loading = useSelector((state: RootState) => state.asset.loading)

  useEffect(() => {
    if (id) {
      dispatch(fetchAssetById(Number(id)))
    }
  }, [dispatch, id])

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Assets</h1>
        <Breadcrumb menu="Master" title="Assets" active="View" />
      </div>

      <BackButton />

      <div className="col-12">
        <div className="card info-card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center">
              <span className="card-icon">
                <Contact
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "10px",
                  }}
                />
              </span>
              Asset Details
            </h5>

            {loading ? (
              <p className="text-muted p-4">Loading asset data...</p>
            ) : asset ? (
              <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4 flex-wrap">
                {/* Column 1 */}
                <div className="d-flex align-items-start gap-5 p-4">
                  <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                    <span>Asset ID:</span>
                    <span>Fixed Asset No.:</span>
                    <span>Work Center:</span>
                    <span>Major Category:</span>
                    <span>Sub Categories:</span>
                    <span>Description:</span>
                    <span>Location:</span>
                    <span>Sub Location:</span>
                    <span>Asset Type:</span>
                    <span>Custodian:</span>
                    <span>Manufacturer:</span>
                    <span>Model:</span>
                    <span>Serial No:</span>
                    <span>Status:</span>
                    <span>Operating System:</span>
                    <span>Service Tag:</span>
                    <span>MAC ID 1:</span>
                    <span>MAC ID 2:</span>
                    <span>RFID:</span>
                    <span>Physical RFID:</span>
                    <span>RAM:</span>
                    <span>HDD:</span>
                    <span>CPU Speed:</span>
                    <span>Host:</span>
                  </div>

                  <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                    <span>{asset.assetId || "--"}</span>
                    <span>{asset.fixedAssetNo || "--"}</span>
                    <span>{asset.workCenter || "--"}</span>
                    <span>{asset.majorCategory || "--"}</span>
                    <span>
                      {[asset.subCat1, asset.subCat2, asset.subCat3]
                        .filter(Boolean)
                        .join(" / ")}
                    </span>
                    <span>{asset.descr || "--"}</span>
                    <span>{asset.location || "--"}</span>
                    <span>{asset.subLocation || "--"}</span>
                    <span>{asset.assetType || "--"}</span>
                    <span>{asset.custodian || "--"}</span>
                    <span>{asset.manufacturer || "--"}</span>
                    <span>{asset.model || "--"}</span>
                    <span>{asset.sr || "--"}</span>
                    <span>{asset.status || "--"}</span>
                    <span>{asset.OS || "--"}</span>
                    <span>{asset.serviceTag || "--"}</span>
                    <span>{asset.macId || "--"}</span>
                    <span>{asset.macId2 || "--"}</span>
                    <span>{asset.rfid || "--"}</span>
                    <span>{asset.physicalRfid || "--"}</span>
                    <span>{asset.ram || "--"}</span>
                    <span>{asset.hdd || "--"}</span>
                    <span>{asset.cpuSpeed || "--"}</span>
                    <span>{asset.host || "--"}</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="d-flex align-items-start gap-5 p-4">
                  <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                    <span>Purchase Date:</span>
                    <span>Warranty Start:</span>
                    <span>Warranty End:</span>
                    <span>AMC Start:</span>
                    <span>AMC End:</span>
                    <span>Assign Type:</span>
                    <span>Assign Basis:</span>
                    <span>Received Date:</span>
                    <span>Given Date:</span>
                    <span>Return Date:</span>
                    <span>To Be Returned:</span>
                    <span>Original Custodian:</span>
                    <span>Verified by Custodian:</span>
                    <span>Verification Date:</span>
                    <span>Maintenance Required:</span>
                    <span>Battery Make:</span>
                    <span>Battery Type:</span>
                    <span>Battery Volt:</span>
                    <span>Battery Quantity:</span>
                    <span>Battery Install Date:</span>
                    <span>Login ID:</span>
                    <span>Using Smart Device:</span>
                    <span>IMEI No. 1:</span>
                    <span>IMEI No. 2:</span>
                  </div>

                  <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                    <span>{moment(asset.aDate).format("lll") || "--"}</span>
                    <span>
                      {moment(asset.warrantyStart).format("lll") || "--"}
                    </span>
                    <span>
                      {moment(asset.warrantyEnd).format("lll") || "--"}
                    </span>
                    <span>{moment(asset.AMCStart).format("lll") || "--"}</span>
                    <span>{moment(asset.AMCEnd).format("lll") || "--"}</span>
                    <span>{asset.assignType || "--"}</span>
                    <span>{asset.assignBasis || "--"}</span>
                    <span>
                      {moment(asset.receivedDate).format("lll") || "--"}
                    </span>
                    <span>{moment(asset.givenDate).format("lll") || "--"}</span>
                    <span>
                      {moment(asset.returnDate).format("lll") || "--"}
                    </span>
                    <span>{asset.toBeReturned ? "Yes" : "No"}</span>
                    <span>{asset.originalCustodian || "--"}</span>
                    <span>{asset.verifiedByCustodian || "--"}</span>
                    <span>
                      {moment(asset.verifiedByCustodianOn).format("lll") ||
                        "--"}
                    </span>
                    <span>{asset.pMaintenance ? "Yes" : "No"}</span>
                    <span>{asset.batteryMake || "--"}</span>
                    <span>{asset.batteryType || "--"}</span>
                    <span>{asset.batteryVolt || "--"}</span>
                    <span>{asset.batteryQty || "--"}</span>
                    <span>
                      {moment(asset.lastBatteryInstDate).format("lll") || "--"}
                    </span>
                    <span>{asset.loginId || "--"}</span>
                    <span>{asset.usingSmartDevice ? "Yes" : "No"}</span>
                    <span>{asset.IMEINo1 || "--"}</span>
                    <span>{asset.IMEINo2 || "--"}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-danger p-4">Asset not found</p>
            )}
          </div>
        </div>
        {asset?.assetLogs && asset.assetLogs.length > 0 && (
          <div className="col-12">
            <AssetHistoryTable history={asset.assetLogs} />
          </div>
        )}
      </div>
    </main>
  )
}

export default AssetView
