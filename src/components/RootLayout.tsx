import { Outlet } from 'react-router-dom'
import Header from './Header'

/**
 * This is the application root layout
 * @returns Root Layout.
 */
const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
