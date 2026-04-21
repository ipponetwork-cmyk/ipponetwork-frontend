import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar'

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout