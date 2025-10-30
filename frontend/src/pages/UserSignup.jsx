import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [userData, setuserData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setuserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
        <form onSubmit={(e) => onSubmitHandler(e)} action="">
          <h3 className="text-xl mb-2">Whats's your name</h3>
          <div className="flex gap-4 ">
            <input
              onChange={(e) => setfirstName(e.target.value)}
              required
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
              value={firstName}
            />
            <input
              onChange={(e) => setlastName(e.target.value)}
              required
              className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-none w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
              value={lastName}
            />
          </div>

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
          Already have a account ?
          <Link to="/login" className="text-blue-600">
            {" "}
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceeding, you consent to get calls, WhatsApp or SMS messages ,
          including by automated means, form Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
