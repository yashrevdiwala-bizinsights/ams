import { useParams } from "react-router"
import { Contact } from "lucide-react"

import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { vendorData } from "./components/vendor-data"

const VendorView = () => {
  const { id } = useParams<{ id: string }>()

  const vendor = vendorData.find((vendor) => vendor.id === Number(id))

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Vendors</h1>
        <Breadcrumb menu="Master" title="Vendors" active="View" />
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
              Vendor Details
            </h5>

            <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
              <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                <span>Vendor Name:</span>
                <span>Email:</span>
                <span>Contact Number:</span>
                <span>Contact Person:</span>
                <span>Designation:</span>
                <span>Address:</span>
                <span>GSTIN No. :</span>
                <span>Description:</span>
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                <span>{vendor?.vendorName}</span>
                <span>{vendor?.email || "--"}</span>
                <span>{vendor?.contactNumber || "--"}</span>
                <span>{vendor?.contactPerson || "--"}</span>
                <span>{vendor?.designation || "--"}</span>
                <span>
                  {(vendor?.add1 &&
                    vendor.add2 &&
                    vendor?.add1 + vendor?.add2) ||
                    "--"}
                </span>
                <span>{vendor?.gstNumber || "--"}</span>
                <span>{vendor?.desc || "--"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default VendorView
