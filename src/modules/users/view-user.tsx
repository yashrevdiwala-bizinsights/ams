import { useParams } from "react-router"
import { User } from "lucide-react"

import { BackButton } from "@/modules/components/back-button"
import { Breadcrumb } from "@/modules/components/breadcrumb"
import { usersData } from "./components/users"

const UserView = () => {
  const { id } = useParams<{ id: string }>()

  const user = usersData.find((user) => user.id === Number(id))

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Users</h1>
        <Breadcrumb menu="Master" title="Users" active="View" />
      </div>

      <BackButton />

      <div className="col-12">
        <div className="card info-card">
          <div className="card-body">
            <h5 className="card-title d-flex align-items-center">
              <span className="card-icon">
                <User
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "10",
                  }}
                />
              </span>
              User Details
            </h5>

            <div className="d-flex align-items-center fw-bold fs-6 text-muted gap-5 p-4">
              <div className="ms-5 me-5">
                <img
                  src={user?.profilePic}
                  alt={user?.fullName}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3 ms-5">
                <span className="">Name:</span>
                <span className="">Email:</span>
                <span className="">Designation:</span>
                <span className="">Access Level:</span>
                <span className="">Last Login:</span>
              </div>

              <div className="d-flex flex-column align-items-start justify-content-center gap-3">
                <span className="">{user?.fullName}</span>
                <span className="">{user?.email}</span>
                <span className="">{user?.designation}</span>
                <span className="">{user?.accessLevel}</span>
                <span className="">{user?.lastLogin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserView
