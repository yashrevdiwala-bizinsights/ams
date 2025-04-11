interface AdminChildRoute extends NonIndexRouteObject {
  path: string
  label?: string
  element: React.ReactElement
  icon?: LucideIcon
  nested?: boolean
  children?: AdminChildRoute[]
}
export interface Assets {
  id: number;
  assetId: string;
  fixedAssetNo: string;
  workCenter: string;
  majorCategory: string;
  subCat1: string;
  subCat2: string;
  subCat3: string;
  descr: string;
  location: string;
  custodian: string;
  assetType: string;
  physicalAssetLocation: string;
  manufacturer: string;
  model: string;
  aDate: moment.Moment;
  PONo: string;
  majorSpec: string;
  deptCode: string;
  status: string;
  phVerDoneBy: string;
  phVerDoneOn: moment.Moment;
  sr: string;
  seri: number;
  ram: string;
  hdd: string;
  rfid: string;
  physicalRfid: string;
  AMCStart: moment.Moment;
  AMCEnd: moment.Moment;
  warrantyStart: moment.Moment;
  warrantyEnd: moment.Moment;
  host: string;
  serviceTag: string;
  addedBy: string;
  productNo: string;
  OS: string;
  replaced: boolean;
  assignType: string;
  assignBasis: string;
  subLocation: string;
  returnDate: moment.Moment;
  cpuSpeed: string;
  poElement: string;
  transInvoice: string;
  IC: string;
  verifiedByCustodian: string;
  verifiedByCustodianOn: moment.Moment;
  custodyDenyRemarks: string;
  toBeReturned: boolean;
  toBeReturnedOn: moment.Moment;
  originalCustodian: string;
  originalDeptCode: string;
  lastRequestId: string;
  phVerRemarks: string;
  pMaintenance: boolean;
  pMaintenanceRemark: string;
  productionCenter: string;
  assetCatType: string;
  IP: string;
  batteryMake: string;
  batteryAh: number;
  batteryType: string;
  batteryVolt: number;
  batteryQty: number;
  lastBatteryInstDate: moment.Moment;
  macId: string;
  isDocumentUpload: boolean;
  macId2: string;
  partNo: string;
  stationName: string;
  stationCode: string;
  servicePack: string;
  IPCRemarksUpdate: string;
  loginId: string;
  receivedDate: moment.Moment;
  givenDate: Date;
  usingSmartDevice: boolean;
  IMEINo1: string;
  IMEINo2: string;
}

export interface AssetForm {
  id?: number;
  assetId: string;
  fixedAssetNo: string;
  workCenter: number | { id: number; locationCode: string };
  subCat1: number | { id: number; subCat1: string };
  descr: string;
  location: number | { id: number; location: string };
  manufacturer: number | { id: number; manfact: string };
  model: number | { id: number; model: string };
  PONo: string;
  status: string;
  sr: string;
  ram: string;
  hdd: string;
  rfid: string;
  physicalRfid?: string | null;
  AMCStart: string; // ISO string or date input value
  AMCEnd: string;
  warrantyStart: string;
  warrantyEnd: string;
  host: string;
  serviceTag: string;
  OS: string;
  assignType: string;
  subLocation: number | { id: number; subLocation: string };
  returnDate: string;
  cpuSpeed: string;
  phVerRemarks: string;
}

export interface LocationType {
  id: number
  location: string
  locationCode: string
  active: boolean
}
export interface SubLocation {
  id: number
  workCenter: number | { id: number; locationCode: string };
  location: number | { id: number; location: string };
  subLocation: string
}

export interface OSType {
  id: number
  OS: string
}

export interface Processor {
  id: number
  processor: string
}

export interface SubCat1 {
  id: number
  majorCat: number
  subCat1: string
  abbr: string
}

export interface SubCat2 {
  id: number
  subCat1: number | { id: number; subCat1: string };
  subCat2: string
}

export interface SubCat3 {
  id: number
  subCat1: number | { id: number; subCat1: string };
  subCat2: number | { id: number; subCat2: string };
  subCat3: string
}

export interface Manufacturer {
  id: number
  manfact: string
  majorCat: number
  subCat1: number | { id: number; subCat1: string };
}

export interface Models {
  id: number
  model: string
  category: number | { id: number; subCat1: string };
  make: number | { id: number; manfact: string };
  majorCategory: number
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