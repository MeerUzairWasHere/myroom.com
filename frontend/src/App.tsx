import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>homeHome</p>
        </Layout> } />
        <Route path="/search" element={<Layout>
          <p>search</p>
        </Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
