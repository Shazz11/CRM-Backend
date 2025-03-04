import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardLayoutBasic from './pages/Home'
import Billing from './pages/Billing'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import InvoiceDetails from './pages/InvoiceDetails'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        {/* DashboardLayoutBasic hamesha render hoga */}
        <Route path='/' element={<DashboardLayoutBasic />}>
          {/* Yeh Outlet ke andar render hoga */}
          <Route path='billing' element={<Billing />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='customers' element={<Customers/>}/>
          <Route path='invoices' element={<Invoices/>}/>
          <Route path='invoice' element={<InvoiceDetails/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
