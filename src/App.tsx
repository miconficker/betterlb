import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/layout/Navbar'
import Ticker from './components/ui/Ticker'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import DesignGuide from './pages/DesignGuide'
import Services from './pages/Services'
import AboutPhilippines from './pages/philippines/about'
import PhilippinesHistory from './pages/philippines/history'
import PhilippinesCulture from './pages/philippines/culture'
import PhilippinesRegions from './pages/philippines/regions'
import PublicHolidays from './pages/philippines/holidays'
import PhilippinesMap from './pages/philippines/map'
import ExecutiveDirectory from './pages/government/executive'
import ExecutiveOffice from './pages/government/executive/[office]'
import ExecutiveLayout from './pages/government/executive/layout'
import DepartmentsIndex from './pages/government/departments'
import DepartmentDetail from './pages/government/departments/[department]'
import DepartmentsLayout from './pages/government/departments/layout'
import GovernmentLayout from './pages/government/layout'
import ConstitutionalLayout from './pages/government/constitutional/layout'
import ConstitutionalIndex from './pages/government/constitutional/index'
import ConstitutionalOffice from './pages/government/constitutional/[office]'
import GOCCsPage from './pages/government/constitutional/goccs'
import SUCsPage from './pages/government/constitutional/sucs'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Ticker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/design" element={<DesignGuide />} />
            <Route path="/services" element={<Services />} />
            <Route path="/philippines/about" element={<AboutPhilippines />} />
            <Route
              path="/philippines/history"
              element={<PhilippinesHistory />}
            />
            <Route
              path="/philippines/culture"
              element={<PhilippinesCulture />}
            />
            <Route
              path="/philippines/regions"
              element={<PhilippinesRegions />}
            />
            <Route path="/philippines/map" element={<PhilippinesMap />} />
            <Route path="/philippines/holidays" element={<PublicHolidays />} />

            {/* Government Routes */}
            <Route
              path="/government"
              element={<GovernmentLayout title="Government" />}
            >
              <Route index element={<Navigate to="departments" replace />} />

              <Route path="executive" element={<ExecutiveLayout />}>
                <Route index element={<ExecutiveDirectory />} />
                <Route path=":office" element={<ExecutiveOffice />} />
              </Route>

              <Route path="departments" element={<DepartmentsLayout />}>
                <Route index element={<DepartmentsIndex />} />
                <Route path=":department" element={<DepartmentDetail />} />
              </Route>

              <Route path="constitutional" element={<ConstitutionalLayout />}>
                <Route index element={<ConstitutionalIndex />} />
                <Route path=":office" element={<ConstitutionalOffice />} />
                <Route path="goccs" element={<GOCCsPage />} />
                <Route path="sucs" element={<SUCsPage />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
