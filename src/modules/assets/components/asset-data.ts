import moment from "moment"

export const assetData: AssetType[] = [
  {
    id: 1,
    productId: "1",
    vendorId: "1",
    officeLocation: "1",
    assetName: "Macbook Air 3",
    serialNumber: "SN123",
    price: "50000",
    purchaseType: "Owned",
    purchaseDate: moment(),
    warrantyExpires: moment(),
    description: "Mac",
    status: false,
  },
  {
    id: 2,
    productId: "4",
    vendorId: "2",
    officeLocation: "2",
    assetName: "HP Laptop",
    serialNumber: "SN124",
    price: "60000",
    purchaseType: "Rented",
    purchaseDate: moment(),
    warrantyExpires: moment(),
    description: "HP Laptop",
    status: true,
  },
]
