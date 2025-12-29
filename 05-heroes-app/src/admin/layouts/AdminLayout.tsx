import { Outlet } from "react-router"

export const AdminLayout: React.FC = () => {
  return (
    <div className="bg-yellow-400" 
    ><Outlet /></div>
  )
}
