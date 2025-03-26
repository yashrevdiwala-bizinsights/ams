import { createRoot } from "react-dom/client"
import { Toaster } from "sonner"
import "@ant-design/v5-patch-for-react-19"

import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <div>
    <Toaster />
    <App />
  </div>
)

