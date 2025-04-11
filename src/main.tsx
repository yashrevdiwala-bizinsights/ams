import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { Toaster } from "sonner"
import "@ant-design/v5-patch-for-react-19"

import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
)
