import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
const [email, setemail] = useState('')
const [password, setpassword] = useState("");
const [userData, setuserData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setuserData({
      email: email,
      password:password
    })
    setemail('')
    setpassword('')
  } 
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
        <form onSubmit={(e)=>onSubmitHandler(e)}  action="">
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
          New here ?
          <Link to="/signup" className="text-blue-600">
            {" "}
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex justify-center items-center text-white font-medium mb-7 rounded px-4 py-2 border-none w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
