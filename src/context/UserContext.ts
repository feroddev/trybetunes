import { createContext } from 'react';
import { UserType } from '../types';

type UserContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
