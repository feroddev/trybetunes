import { useState } from "react";
import { UserType } from "../types";
import UserContext from "./UserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

const emptyUser = {
  name: "",
  email: "",
  image: "",
  description: "",
};

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType >(emptyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
