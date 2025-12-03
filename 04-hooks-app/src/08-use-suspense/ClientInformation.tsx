import { use } from "react";
import { getUserAction } from "./api/get-user-action";

const userPromise = ( getUserAction(1));

export const ClientInformation = () => {
  
  const user = use( userPromise);

  return (
        <div className="bg-gradient flex flex-col gap-4 ">
            <h1 className="text-4xl font-bold text-white">Información del cliente</h1>
            <p className="text-white">Nombre: {user.name} </p>
            <p className="text-white">Ciudad: {user.loacation} </p>
            <p className="text-white">Decription : {user.role} </p>
        </div>
    );
};