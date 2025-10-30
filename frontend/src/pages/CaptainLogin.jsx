import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [captainData, setcaptainData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      email: email,
      password: password,
    });
    setemail("");
    setpassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
      <img
        className="w-16 mb-10"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
        alt=""
      />
        <form onSubmit={(e) => onSubmitHandler(e)} action="">
          <h3 className="text-xl mb-2">Whats's your email</h3>
          <input
            onChange={(e) => setemail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@gmail.com"
            value={email}
          />

          <h3 className="text-xl mb-2">Enter password</h3>
          <input
            onChange={(e) => setpassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
          />

          <button className="bg-[#111] text-white font-medium mb-1 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="">
          Join a fleet ?
          <Link to="/captain-signup" className="text-blue-600">
            {" "}
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex justify-center items-center text-white font-medium mb-7 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
