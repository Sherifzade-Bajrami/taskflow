import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'


function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <div className="p-8">
          <Outlet />  
        </div>
      </div>
    </div>
  )
}

export default AppLayout