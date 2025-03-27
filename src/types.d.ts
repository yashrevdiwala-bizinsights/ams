interface AdminChildRoute extends NonIndexRouteObject {
  path: string
  label?: string
  element: React.ReactElement
  icon?: LucideIcon
  nested?: boolean
  children?: AdminChildRoute[]
}

interface User {
  id: number
  profilePic?: string
  fullName?: string
  email?: string
  designation?: string
  accessLevel?: string
  lastLogin?: moment.Moment
  status?: boolean
}

interface VendorsType {
  id: number
  vendorName: string
  email: string
  contactNumber: string
  contactPerson?: string
  gstNumber?: string
  designation?: string
  add1?: string
  add2?: string
  country?: string
  state?: string
  city?: string
  zipCode?: string
  desc?: string
  status: boolean
}

interface Products {
  id: number
  productImage?: string
  productName?: string
  productType?: string
  productCategory?: string
  manufacturer?: string
  description?: string
  status?: boolean
}

interface AssetType {
  id: number
  productId: string
  vendorId: string
  officeLocation: string
  assetName: string
  serialNumber: string
  price: string
  purchaseType: "Owned" | "Rented"
  purchaseDate: moment.Moment
  warrantyExpires: moment.Moment
  description: string
  status: boolean
}

interface ProductType {
  id: number
  productType: string
  status: boolean
}

interface ProductCategory {
  id: number
  productCategory: string
  status: boolean
}

interface LocationType {
  id: number
  gateNumber: string
  address1: string
  address2: string
  country: string
  state: string
  city: string
  zipCode: string
  status: boolean
}
