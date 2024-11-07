import { Route, Routes } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import ChartPage from './pages/ChartPage'
import RootLayout from './components/RootLayout'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className="mb-10">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<UsersPage />} />
          <Route path="charts" element={<ChartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
