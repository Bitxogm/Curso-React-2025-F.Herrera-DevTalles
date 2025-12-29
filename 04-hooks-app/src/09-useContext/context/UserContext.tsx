import {  type PropsWithChildren, createContext, useEffect, useState } from "react"
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'ckecking' | 'authenticated' | 'not-authenticated';


interface UserContextProps {
  // state variables
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  // Methods to manipulate the state
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider  = ({children}: PropsWithChildren) => {

  const [authStatus, setAuthStatus] = useState<AuthStatus>('ckecking');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number): boolean => {
    
    const user = users.find( user => user.id === userId );
    if (!user) {
      console.log(`Usuario no enconcontrado con id : ${userId}`)
      setAuthStatus('not-authenticated');
      setUser(null);
      return false;
    }

    setAuthStatus('authenticated');
    localStorage.setItem('userId', userId.toString());
    setUser(user);
    return true;
  }

  const handleLogout = () => {
    console.log('logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  };

useEffect(() => {
    const storeUserId = localStorage.getItem('userId');
    if(storeUserId) {
      handleLogin( Number(storeUserId) );
      return
    }
    handleLogout();
}, [])


  return (
    <UserContext value={{
      authStatus: authStatus,
      isAuthenticated: authStatus === 'authenticated',
      user: user,
      login: handleLogin,
      logout: handleLogout,
    }} >{children}</UserContext>
  )
}
