import moment from "moment"

export const usersData: User[] = [
  {
    id: 1,
    profilePic: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    fullName: "John Doe",
    email: "johndoe@example.com",
    designation: "Project Manager",
    accessLevel: "Full",
    lastLogin: moment("02-21-2024"),
    status: true,
  },
  {
    id: 2,
    profilePic:
      "https://robohash.org/voluptateiustonihil.png?size=50x50&set=set1",
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    designation: "User",
    accessLevel: "Limited",
    lastLogin: moment("08-12-2024"),
    status: false,
  },
]
