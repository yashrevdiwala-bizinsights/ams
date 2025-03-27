import moment from "moment"

export const usersData: User[] = [
  {
    id: 1,
    profilePic: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    fullName: "John Doe",
    email: "johndoe@example.com",
    designation: "Project Manager",
    accessLevel: "Full",
    lastLogin: moment("2024-02-28"),
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
    lastLogin: moment("2022-12-08"),
    status: false,
  },
]
