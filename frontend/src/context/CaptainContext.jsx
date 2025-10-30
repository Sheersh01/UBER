import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    },
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      <div>{children}</div>
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
