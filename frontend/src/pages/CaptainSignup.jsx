import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [captainData, setcaptainData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    captainData({
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
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
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
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Policy </span>
          and <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
