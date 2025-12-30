import { CustomMenu } from "@/components/ui/custom/CustomMenu"
import {  Outlet } from "react-router"



export const HeroesLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <CustomMenu />   
        
        <Outlet />
      </div>
    </div>


  )
}
