import { Link, NavLink } from 'react-router-dom'

/**
 * This is the header in the website.
 * @returns Header component
 */
const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        User Manager
      </Link>
      <nav>
        <NavLink
          to="/charts"
          className={({ isActive }) =>
            `mx-2 p-2 ${isActive ? 'text-blue-400' : 'text-white'}`
          }
        >
          Charts
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
