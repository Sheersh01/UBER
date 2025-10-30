import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName:'',
    },
  });

  return (
    <UserDataContext.Provider value={user}>
      <div>{children}</div>
    </UserDataContext.Provider>
  );
};

export default UserContext;
