import { useParams } from "react-router"
import { ShoppingCart } from "lucide-react"

import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { productsData } from "./components/products"

const ProductView = () => {
  const { id } = useParams<{ id: string }>()

  const product = productsData.find((product) => product.id === Number(id))

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Products</h1>
        <Breadcrumb menu="Master" title="Products" active="View" />
      </div>

      <BackButton />

      <div className="col-12">
        <div className="card info-card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center">
              <span className="card-icon">
                <ShoppingCart
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "10",
                  }}
                />
              </span>
              Product Details
            </h5>

            <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
              <div className="ms-5 me-5">
                <img
                  src={product?.productImage}
                  alt={product?.productName}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                <span className="">Product Name:</span>
                <span className="">Product Type:</span>
                <span className="">Product Category:</span>
                <span className="">Manufacturer:</span>
                <span className="">Description:</span>
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                <span className="">{product?.productName}</span>
                <span className="">{product?.productType}</span>
                <span className="">{product?.productCategory}</span>
                <span className="">{product?.manufacturer}</span>
                <span className="">{product?.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductView
