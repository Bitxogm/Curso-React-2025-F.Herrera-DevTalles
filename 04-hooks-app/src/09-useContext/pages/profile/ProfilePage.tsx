import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { UserContext } from "../../context/UserContext"

export const ProfilePage: React.FC = () => {

  const { user, logout } = useContext(UserContext);

  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

    <h1>Perfil de usuario</h1>
    <hr />

    <pre className="my-4">{ JSON.stringify( user, null, 2 ) }</pre>

    <Button variant="destructive" onClick={logout}>Cerrar sesión</Button>
    </div>
  );
}
