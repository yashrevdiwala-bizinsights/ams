import { useParams } from "react-router"
import { Contact } from "lucide-react"
import moment from "moment"

import useDocumentTitle from "@/lib/useDocumentTitle"
import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { productsData } from "@/modules/products/components/products"
import { vendorData } from "@/modules/vendors/components/vendor-data"
import { assetData } from "./components/asset-data"

const AssetView = () => {
  useDocumentTitle("Asset View - AMS")

  const { id } = useParams<{ id: string }>()

  const asset = assetData.find((asset) => asset.id === Number(id))

  const product = productsData.find(
    (product) => product.id === Number(asset?.productId)
  )
  const vendor = vendorData.find(
    (vendor) => vendor.id === Number(asset?.vendorId)
  )

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
                    marginRight: "10",
                  }}
                />
              </span>
              Asset Details
            </h5>

            <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
              <div className="d-flex align-items-center gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Asset Name:</span>
                  <span>Product:</span>
                  <span>Product Category:</span>
                  <span>Price:</span>
                  <span>Purchase Date:</span>
                  <span>Description:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{asset?.assetName}</span>
                  <span>{product?.productName || "--"}</span>
                  <span>{product?.productCategory || "--"}</span>
                  <span>{asset?.price || "--"}</span>
                  <span>
                    {moment(asset?.purchaseDate).format("lll") || "--"}
                  </span>
                  <span>{asset?.description || "--"}</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-5 p-4">
                <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                  <span>Vendor:</span>
                  <span>Product Type:</span>
                  <span>Serial No. :</span>
                  <span>Office Location:</span>
                  <span>Warranty Expire Date:</span>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                  <span>{vendor?.vendorName}</span>
                  <span>{product?.productType || "--"}</span>
                  <span>{asset?.serialNumber || "--"}</span>
                  <span>{asset?.officeLocation || "--"}</span>
                  <span>
                    {moment(asset?.warrantyExpires).format("lll") || "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AssetView
