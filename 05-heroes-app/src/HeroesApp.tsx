import {  RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

export const HeroesApp: React.FC = () => {
  return (
    <>
    <RouterProvider router={ appRouter }/>
    </>
  )
}
