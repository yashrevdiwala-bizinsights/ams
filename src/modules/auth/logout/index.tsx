import { useEffect } from "react"
import { useNavigate } from "react-router"

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/sign-in")
  }, [navigate])

  return null
}
export default Logout
