import { useEffect } from "react"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/admin")
  }, [navigate])

  return null
}
export default Home
