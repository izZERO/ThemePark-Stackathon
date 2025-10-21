import { Route, Routes } from "react-router"

import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import AddItem from "./pages/AddItem"
import "./App.css"

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
      </main>
    </>
  )
}

export default App
